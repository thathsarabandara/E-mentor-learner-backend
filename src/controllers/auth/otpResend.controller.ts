import { Request, Response } from "express";
import Token from "../../models/auth/Token.model";
import User from "../../models/auth/User.model";
import { sendOTPMail } from "../../services/mail/Templates/auth/Otp.template";
import { generateOTP } from "../../utils/otp/Otp.util";
import { storeOTP } from "../../utils/redis/redis.util";
import { generateToken } from "../../utils/Token/Token.util";

export const resendOtp = async(req:Request, res:Response): Promise<any> =>{
    try {
        const token = req.cookies.temptoken;

        if(!token){
            return res.status(404).json({message: 'Token not found!'})
        }

        const isValidToken = await Token.findOne({
            token,
            tokenType: 'temp',
            expriedAt: { $gt: Date.now()}
        })

        if(!isValidToken){
            return res.status(404).json({message: 'Invalid Token'})
        }

        const user = await User.findOne({
            _id: isValidToken.userId
        })

        if(!user){
            return res.status(404).json({message: 'User Not found'})
        }

        const otp = generateOTP();

        await storeOTP(user.email, otp)

        const temptoken = generateToken(user.email)

        await Token.create({
            token: temptoken,
            tokenType: 'temp',
            expriedAt: Date.now() + 10 * 60 * 1000,
            userId: user._id
        })
        
        await sendOTPMail(user.email, otp, user.username)

        return res.cookie('temptoken', temptoken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 10  * 60 * 1000 
        }).status(200).json({ message: 'OTP Resend!' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}