import { Request, Response } from "express";
import User from "../../models/auth/User.model";
import { RegisterCredentials } from "../../types/auth/auth";
import { hashPassword } from "../../utils/HashPasswrod/hash.util";
import { generateOTP } from "utils/otp/Otp.util";
import { storeOTP } from "utils/redis/redis.util";
import { sendOTPMail } from "services/mail/Templates/auth/Otp.template";

export const register = async (req: Request ,res: Response): Promise<any> =>{
    try {
        const {username , email , password}: RegisterCredentials = req.body;

        const isDuplicated = await User.findOne({email , isVerfied: true})

        if(isDuplicated){
            return res.status(400).json({message: 'User Already reagistered'});
        }

        const otp = await generateOTP();

        await storeOTP(email,otp);

        await sendOTPMail(email, );

        const hasPassword = await hashPassword(password);
        
        const newUser = await User.create({
            username,
            email,
            password: hasPassword,
            isVerified: false
        });

    } catch (error) {
        return res.status(500).json({message: 'Internel Server Error'});
    }
}