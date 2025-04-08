import crypto from 'crypto';
import { findOtp } from '../redis/redis.util';

export const generateOTP = () =>{
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
}

export const compareOTP = async(email:string, otp:string) =>{
    const savedOtp = await findOtp(email);
    if(savedOtp === otp){
        return true
    }
    return false
}