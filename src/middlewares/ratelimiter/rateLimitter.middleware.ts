import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 50,
    message: 'Too Many request from this IP, Please try again later.',
})