import { Request, Response } from "express";

export const profileDetails = async(req:Request, res:Response):Promise<any> =>{
    const user = req.user;
    console.log(user)
}