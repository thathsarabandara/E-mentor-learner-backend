import { Request, Response } from 'express';
import PassResetToken from 'models/auth/PassRestToken';
import User from 'models/auth/User.model';
import { generateToken } from 'utils/Token/Token.util';

export const passwordResetRequest = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email } = req.body;

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

    const token = generateToken(user.email)

    const resetToken = await PassResetToken.create({
      token,
      userId: user._id,
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    

    return res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    console.error('Password reset request error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
