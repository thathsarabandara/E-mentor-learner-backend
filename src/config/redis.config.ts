import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

export const redisClient = createClient({
    url: process.env.REDIS_URL,
});

export const connectRedis = async () => {
    redisClient.on('connect', () => {
        console.log("Connected to Redis");
    });

    redisClient.on('error', (err) => {
        console.error('Redis Error:', err);
    });

    try {
        await redisClient.connect();
    } catch (error) {
        console.error("Failed to connect to Redis:", error);
    }
};
