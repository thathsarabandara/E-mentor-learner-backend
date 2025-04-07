import dotenv from 'dotenv'
dotenv.config();

export const mailConfig = {
    provider: process.env.MAIL_PROVIDER || 'smtp' ,
    from: process.env.EMAIL_USER,
    smtp: {
        service: 'gmail',
        user: process.env.EMAIL_USER as string,
        password: process.env.EMAIL_PASSWORD as string,
    },
}