// This module will use the configuration and Redis client modules to connect to Redis.

import { createRedisClient, getConfig } from "./redis-config";
import { RedisClient, RedisClientImpl } from "./redis-connection";

const config = getConfig();
export const redisClient = new RedisClientImpl(createRedisClient(config));

redisClient.onError((err) => {
    console.error('[Nox API] Redis Client Error:', err);
});

export const connectRedis = async (client: RedisClient) => {
    try {
        await client.connect();
        console.log('[Nox API] connected to Redis'.green);
    } catch (error) {
        console.error('[Nox API] Error connecting to Redis:', error);
    }
}