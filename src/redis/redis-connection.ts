// This module will handle the Redis client connection and error handling.

import { RedisClientType } from "redis";

export interface RedisClient {
    connect: () => Promise<void>,
    disconnect: () => Promise<void>,
    onError: (callback: (err: Error) => void) => void;
}

export class RedisClientImpl implements RedisClient {

    private client: RedisClientType

    constructor(client: RedisClientType) {
        this.client = client;
    }

    async connect(): Promise<void> {
        await this.client.connect();
    }

    async set(key: string, value: string): Promise<void> {
        await this.client.set(key, value);
    }

    async get(key: string): Promise<string | null> {
        return await this.client.get(key);
    }

    async disconnect(): Promise<void> {
        await this.client.disconnect();
    }

    onError (callback: (err: Error) => void): void {
        this.client.on('error', callback);
    }
}