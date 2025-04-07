import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const createToken = (email: string, password: string) =>{
    return jwt.sign({email: email, password: password} , process.env.JWT_SECRET);
}