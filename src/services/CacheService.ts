import * as Redis from "redis";
import { config } from "../config/config";
import boom from "@hapi/boom";

export class CacheService {
    private redis: any;

    constructor() {
        this.redis = Redis.createClient({
            socket: {
                host: config.REDIS.HOST,
                port: config.REDIS.PORT
            },
            password: config.REDIS.PASSWORD
        });

        this.redis.on("error", (error: any) => {
            console.error("error connecting to redis", error);
        });

        this.redis.on("connect", () => {
            console.log("connected to redis");
        });
    }

    async set(key: string, value: string): Promise<any> {
        try {
            await this.redis.connect();
            await this.redis.set(key, value);
            return true;
        } catch (error) {
            console.error("error setting cache", error);    
            throw boom.badImplementation("Error setting cache");
        } finally {
            await this.redis.disconnect();
        }
    }

    async get(key: string): Promise<any> {
        try {
            await this.redis.connect();
            const value = await this.redis.get(key);
            return value;
        } catch (error) {
            console.error("error getting cache", error);
            throw boom.badImplementation("Error getting cache");
        } finally {
            await this.redis.disconnect();
        }
    }

}