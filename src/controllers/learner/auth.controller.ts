import { Request, Response } from "express";

export const profileDetails = async(req:Request, res:Response):Promise<any> =>{
    const user = req.user;
    return res.status(200).json({user: user})
}