import redis from 'redis';
import dotenv from 'dotenv';
dotenv.config();;

const redisClient = redis.createClient({
    url: process.env.REDIS_URL,
});

redisClient.on('connect',()=>{
    console.log("Connected to Redis")
})