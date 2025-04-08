import { redisClient } from "../../config/redis.config";

export const storeOTP = async(email:string ,otp:string) =>{
    const otpExpiryTime = 10 * 60;
    await redisClient.setEx(email, otpExpiryTime, otp);
}

export const findOtp = async(email: string) =>{
    try {
        const otp = redisClient.get(email)
        return otp;
    } catch (error) {
        return null
    }
}