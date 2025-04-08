import { Request, Response } from "express";
import Token from "../../models/auth/Token.model";
import User from "../../models/auth/User.model";
import { sendWelcomeMail } from "../../services/mail/Templates/auth/Welcome.template";
import { compareOTP } from "../../utils/otp/Otp.util";
import { generateToken } from "../../utils/Token/Token.util";

export const verifyOTP = async (req: Request, res: Response) =>{
    try {
        const token  = req.cookies.temptoken;

        if(!token){
            return res.status(404).json({message: 'Token not found!'})
        }

        const otp = req.body;

        if(!otp){
            return res.status(404).json({message: 'Otp not found'})
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

        const otpverify = await compareOTP(user?.email, otp);

        if(otpverify===false){
            return res.status(404).json({message: 'Invalid Otp'})
        }

        await User.findByIdAndUpdate(user._id, {
            isVerfied: true
        })

        const authtoken = generateToken(user.email);

        await Token.create({
            token: authtoken,
            tokenType: 'auth',
            userId: user._id
        })

        await sendWelcomeMail(user.email, user.username);

        res.clearCookie('temptoken',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict"
        })

        return res.cookie('authlearnertoken', authtoken ,{
            httpOnly: true,
            secure: process.env.NODE_ENV ==='production',
            sameSite: 'strict',
            maxAge: 120 * 3600 * 1000
        });

    } catch (error) {
        console.error('Verification Failed', error);
        return res.status(500).json({message: 'Verfification failed!'})
    }
}