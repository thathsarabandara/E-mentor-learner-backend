import { Request, Response } from "express";
import Token from "models/auth/Token.model";
import User from "models/auth/User.model";
import { LoginCredentials } from "types/auth/auth";
import { comparePasswrod } from "utils/HashPasswrod/hash.util";
import { generateToken } from "utils/Token/Token.util";

export const login = async (req: Request, res: Response) =>{
    const {email, password}:LoginCredentials = req.body;

    if(!email && !password){
        return res.status(400).json({message: 'Email and Password not found!'})
    }

    const isValidUser = await User.findOne({
        email,
        isVerfied: true
    })

    if(!isValidUser){
        return res.status(400).json({message: 'Invalid Credentials'})
    }

    const hashedPassword = isValidUser?.password;

    const isValidPasswrod = await comparePasswrod(password, hashedPassword);

    if(isValidPasswrod === false){
        return res.status(400).json({message: 'Invalid Credentials'});
    }

    const authtoken = generateToken(isValidUser.email);

    await Token.create({
        token: authtoken,
        tokenType: 'auth',
        expriedAt: Date.now() + 120 * 3600 * 1000,
        userId: isValidUser._id
    })

}