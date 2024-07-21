import { Server } from "./server/server";
import { redisClient, connectRedis } from "./redis/redis-client";

const server: Server = new Server();

// starts redis connection
connectRedis(redisClient);

// starts express server connection
server.setRoutes();
server.startServer();