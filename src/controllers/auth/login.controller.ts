import { Request, Response } from "express";
import Token from "../../models/auth/Token.model";
import User from "../../models/auth/User.model";
import { getGeoLocationFromIP } from "../../services/locationFinder/GeoLoacation.service";
import { sendLoginAttemptMail } from "../../services/mail/Templates/auth/LoginAttempt.template";
import { LoginCredentials } from "../../types/auth/auth";
import { comparePasswrod } from "../../utils/HashPasswrod/hash.util";
import { generateToken } from "../../utils/Token/Token.util";

export const login = async (req: Request, res: Response): Promise<any> =>{
    try {
        const {email, password}:LoginCredentials = req.body;
        console.log(email, password);
        const ip = req.headers['x-forwarded-for']?.toString().split(',')[0]  || "127.0.0.1";
        console.log(ip);
        const location = await getGeoLocationFromIP(ip);
        console.log(location);
        const useragent = req.get('User-Agent') || 'Unknown' ;
        console.log(useragent);

        if(!email && !password){
            return res.status(400).json({message: 'Email and Password not found!'})
        }

        const isValidUser = await User.findOne({
            email,
            isVerfied: true
        })
        console.log(isValidUser);
        if(!isValidUser){
            return res.status(400).json({message: 'Invalid Credentials'})
        }

        const hashedPassword = isValidUser?.password;

        const isValidPasswrod = await comparePasswrod(password, hashedPassword);

        if(isValidPasswrod === false){
            return res.status(400).json({message: 'Invalid Credentials'});
        }

        await sendLoginAttemptMail(isValidUser.email, isValidUser.username, ip as string, useragent, location)

        const authtoken = generateToken(isValidUser.email);

        await Token.create({
            token: authtoken,
            tokenType: 'auth',
            expriedAt: Date.now() + 120 * 3600 * 1000,
            userId: isValidUser._id
        })

        return res.cookie('authlearnertoken', authtoken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 120 * 3600 * 1000
        }).status(200).json({message: 'Logged Successfully!'})

    } catch (error) {
        console.error('Logging Failed', error);
        return res.status(500).json({message: 'Logging Server Failed'})
    }

}