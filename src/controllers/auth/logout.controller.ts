import { Request, Response } from "express";
import Token from "../../models/auth/Token.model";

export const logout = async(req:Request, res:Response): Promise<any> => {
    try {
        console.log('logout')
        const token = req.cookies.authlearnertoken;

        if(!token){
            return res.status(404).json({message: 'Token not found!'})
        }

        const isValidToken = await Token.findOne({
            token,
            tokenType: 'auth',
            expriedAt: { $gt: Date.now()}
        })
        
        if(!isValidToken){
            return res.status(404).json({message: 'Invalid Token'})
        }

        await Token.findByIdAndUpdate(isValidToken._id, {expriedAt: Date.now()})

        return res.clearCookie('temptoken',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        }).status(200).json({message: "Successfully Logout!"});

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}