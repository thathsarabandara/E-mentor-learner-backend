import { Request, Response } from 'express';
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

    // Generate a secure random token
    const token = generateToken(user.email)

    

    // Store the token in DB (or Redis)
    const resetToken = new PasswordResetToken({
      userId: user._id,
      token,
      expiresAt,
    });
    await resetToken.save();

    // Send reset email
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      html: `
        <p>Hello ${user.name},</p>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>This link will expire in 15 minutes.</p>
      `,
    });

    return res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    console.error('Password reset request error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
