import { Request, Response } from "express";
import User from "../../models/auth/User.model";
import { RegisterCredentials } from "../../types/auth/auth";
import { hashPassword } from "../../utils/HashPasswrod/hash.util";
import { generateOTP } from "../../utils/otp/Otp.util";
import { storeOTP } from "../../utils/redis/redis.util";
import { sendOTPMail } from "../../services/mail/Templates/auth/Otp.template";
import { generateToken } from "../../utils/Token/Token.util";
import Token from "../../models/auth/Token.model";
import dotenv from 'dotenv'
dotenv.config();

export const register = async (req: Request ,res: Response): Promise<any> =>{
    try {
        const { username, email, password }: RegisterCredentials = req.body;

        const isDuplicated = await User.findOne({ email, isVerfied: true });

        if (isDuplicated) {
            return res.status(400).json({ message: 'User Already registered' });
        }

        const hashedPassword = await hashPassword(password);
        
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            isVerified: false
        });

        const token = generateToken(email);

        const tempToken = await Token.create({
            token,
            tokenType: 'temp',
            expriedAt: Date.now() + 10 * 60 * 1000,
            userId: newUser._id
        });

        const otp = generateOTP();

        await storeOTP(email, otp);

        await sendOTPMail(email, otp, username);

        return res.cookie('temptoken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'lax',  
            maxAge: 10  * 60 * 1000 
        }).status(200).json({ message: 'New user saved!' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
