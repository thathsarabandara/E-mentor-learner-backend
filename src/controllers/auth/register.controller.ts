import { Request, Response } from "express";
import User from "../../models/auth/User.model";
import { RegisterCredentials } from "../../types/auth/auth";
import { hashPassword } from "../../utils/HashPasswrod/hash.util";

export const register = async (req: Request ,res: Response): Promise<any> =>{
    try {
        const {username , email , password}: RegisterCredentials = req.body;

        const isDuplicated = await User.findOne({email , isVerfied: true})

        if(isDuplicated){
            return res.status(400).json({message: 'User Already reagistered'});
        }
        const hasPassword = await hashPassword(password);
        console.log(hasPassword)
        const newUser = await User.create({
            username,
            email,
            password: hasPassword,
            isVerified: false
        })
        console.log('here1')
        return res.status(201).json({ message: 'New user created', user: newUser });

    } catch (error) {
        return res.status(500).json({message: 'Internel Server Error'});
    }
}