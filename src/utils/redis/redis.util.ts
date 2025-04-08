import { redisClient } from "../../config/redis.config";

export const storeOTP = async(otp:string, email:string) =>{
    const otpExpiryTime = 10 * 60;
    await redisClient.setEx(email, otpExpiryTime, otp);
}

export const findOtp = async(email: string) =>{
    try {
        redisClient.get
    } catch (error) {
        
    }
}