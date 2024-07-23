import { redisClient } from "../../redis/redis-client";
import { Player } from "./login-model";

/**
 * @note manipulates player data
 * 
 * @description When a player logs in, we don't check if they've changed their name;
 * whenever a new player logs in, we store their uuid, and name (store rank if specified) in the Cache; when a player
 * leaves, we update their name & last login.
 */
export const savePlayer = async (name: string, uuid: string, rank?: string): Promise<Player | null> => {
    try {
        const player = await getPlayer(uuid);

        if (player === null) { // Player does not exist
            await redisClient.set(`player:${uuid}:uuid`, uuid);
            await redisClient.set(`player:${uuid}:name`, name);
            await redisClient.set(`player:${uuid}:lastLogin`, Date.now().toString());

            if (rank !== null) await redisClient.set(`player:${uuid}:primaryRank`, rank!);
        } else { // Player exists
            await redisClient.set(`player:${uuid}:name`, name);
            await redisClient.set(`player:${uuid}:lastLogin`, Date.now().toString());
            
            if (rank !== null) await redisClient.set(`player:${uuid}:primaryRank`, rank!);
        }

        return player;
    } catch (error) {
        console.error('Error saving player data to Redis:', error);
        throw error;
    }
};

// Function to check if a player exists in Redis
async function getPlayer(uuid: string): Promise<Player | null> {
    const name = await redisClient.get(`player:${uuid}:name`);
    const rank = await redisClient.get(`player:${uuid}:primaryRank`);

    if (name) {
        const lastLogin = await redisClient.get(`player:${uuid}:lastLogin`);
        return {
            uuid,
            name,
            primaryRank: rank || null, // if a rank exists, include it
            lastLogin: lastLogin ? parseInt(lastLogin) : 0,
        };

    }
    return null;
}