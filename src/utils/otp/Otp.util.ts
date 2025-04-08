import crypto from 'crypto';
import { findOtp } from '../redis/redis.util';

export const generateOTP = () =>{
    const otp = crypto.randomBytes(3).toString('hex');
    return otp.toUpperCase()
}

export const compareOTP = async(email:string, otp:string) =>{
    const savedOtp = await findOtp(email);
    if(savedOtp === otp){
        return true
    }
    return false
}