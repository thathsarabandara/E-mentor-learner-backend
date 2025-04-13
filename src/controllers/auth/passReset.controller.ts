import { Request, Response } from 'express';
import PassResetToken from '../../models/auth/PassRestToken';
import User from '../../models/auth/User.model';
import crypto from 'crypto';
import { sendResetPasswordMail } from '../../services/mail/Templates/auth/PasswordReset.template';
import { PasswordReset, ResetPasswordRequest, VerifyToken } from 'types/auth/auth';
import { hashPassword } from '../../utils/HashPasswrod/hash.util';

export const passwordResetRequest = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email }: ResetPasswordRequest = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ 
        email,
        isVerfied: true,
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found or not verified' });
    }

    const token = crypto.randomBytes(32).toString('hex');

    await PassResetToken.create({
      token,
      userId: user._id,
    });

    const resetLink = `${process.env.FRONTEND_URL}/resetpassword?token=${token}`;
    
    await sendResetPasswordMail(user.email, user.username, resetLink)

    res.cookie('resettoken', token,  {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 60 * 1000,
    })

    return res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    console.error('Password reset request error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const verifyResetToken = async (req:Request, res:Response):Promise<any> => {
    try {
        const { token } = req.query;
    
        if (!token) {
          return res.status(400).json({ message: 'Token is required.' });
        }
    
        const storedToken = await PassResetToken.findOne({
            token,
            expiredAt: { $gt : Date.now() }
        });
    
        if (!storedToken) {
            return res.status(400).json({ message: 'Invalid or expired token.' });
        }
    
        res.status(200).json({ message: 'Token is valid.' });
      } catch (error) {
        console.error('Error verifying token:', error);
        res.status(500).json({ message: 'Server error.' });
      }
};

export const resetPassword = async (req:Request, res:Response):Promise<any> => {
    try {
        const { token, password }: PasswordReset = req.body;

        if (!token || !password) {
          return res.status(400).json({ message: 'Token and new password are required.' });
        }

        const storedToken = await PassResetToken.findOne({
            token,
            expiredAt: { $gt : Date.now() }
        });

        if (!storedToken) {
            return res.status(400).json({ message: 'Invalid or expired token.' });
        }

        const user = await User.findOne({
            _id: storedToken.userId
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const hashedPassword = await hashPassword(password);

        await User.findByIdAndUpdate(storedToken.userId,{password: hashedPassword})

        res.status(200).json({ message: 'Password has been reset successfully.' });

    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};