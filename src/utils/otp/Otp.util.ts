import crypto from 'crypto';

export const generateOTP = () =>{
    const otp = crypto.randomBytes(3).toString('hex');
    return otp.toUpperCase()
}