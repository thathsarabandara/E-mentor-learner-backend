import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string

if(!JWT_SECRET){
    console.log("Enviornment variable for JWT_ SECRET not found!")
}

export const generateToken = (email: string) =>{
    return jwt.sign({email: email}, JWT_SECRET);
}