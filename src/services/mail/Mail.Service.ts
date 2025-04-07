import { mailConfig, } from 'config/Mail.Config';
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: mailConfig.smtp.service,
    auth:{
        user: mailConfig.smtp.user,
        pass: mailConfig.smtp.password,
    },
});

