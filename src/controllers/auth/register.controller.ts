import { Request, Response } from "express";
import { RegisterCredentials } from "types/auth/auth";

export const register = async (req: Request ,res: Response) =>{
    const {username , email, password}: RegisterCredentials = req.body;

    console.log(username, email, password);
}