import crypto from 'crypto';

export const genrateToken = () =>{
    const otp = crypto.randomBytes(3).toString('hex');
    return otp.toUpperCase()
}