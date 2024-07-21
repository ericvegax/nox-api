// This module will handle reading environment variables and configuring the Redis client.

import { createClient, RedisClientType } from "redis";
import dotenv from 'dotenv';

dotenv.config();

interface RedisConfig {
    password: string,
    host: string,
    port: number
}

export const getConfig = (): RedisConfig => ({
    password: process.env.REDIS_PASSWORD || '',
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: parseInt(process.env.REDIS_PORT || '6379', 10)
});

export const createRedisClient = (config: RedisConfig): RedisClientType => {
    return createClient({
        password: config.password,
        socket: {
            host: config.host,
            port: config.port
        }
    });
}

// export const client = createClient({
//     password: process.env.REDIS_PASSWORD,
//     socket: {
//         host: process.env.REDIS_HOST,
//         port: parseInt(process.env.REDIS_PORT || '6379', 10)
//     }
// });

// client.on('error', (err) => {
//     console.error('Redis Client Error'.red, err);
// });

// export const connectRedis = async () => {
//     try {
//         await client.connect();
//     } catch (error) {
//         console.error("Error connecting to Redis".red, error);
//     }
// }