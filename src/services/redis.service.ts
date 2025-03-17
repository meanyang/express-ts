import { createClient, RedisClientType } from 'redis';
import config from '../configs/config';

class RedisService {
    private client: RedisClientType;

    constructor() {
        this.client = createClient({
            url: config.redis_url,
        });
        // Set up event listeners
        this.setupEventListeners();
        // Connect to Redis
        this.connect();
    }

    // Set up event listeners for Redis client
    private setupEventListeners() {
        this.client.on('error', (err) => {
            console.error('Redis Client Error', err);
            this.reconnect();
        });
        this.client.on('connect', () => {
            console.log('Redis Client Connected');
        });
    }

    // Connect to Redis
    private async connect() {
        try {
            await this.client.connect();
        } catch (error) {
            console.error('Failed to connect to Redis:', error);
            this.reconnect();
        }
    }

    // Reconnect to Redis after a delay
    private reconnect() {
        setTimeout(() => {
            this.connect();
        }, 5000);
    }

    // Get data from Redis by key
    async get(key: string) {
        try {
            return await this.client.get(key);
        } catch (error) {
            console.error('Error getting data from Redis:', error);
            return null;
        }
    }

    // Set data in Redis
    async set(key: string, value: string, expiration?: number) {
        try {
            const options = expiration ? { EX: expiration } : {};
            await this.client.set(key, value, options);
        } catch (error) {
            console.error('Error setting data in Redis:', error);
        }
    }

    // Delete data from Redis by key
    async del(key: string) {
        try {
            await this.client.del(key);
        } catch (error) {
            console.error('Error deleting data from Redis:', error);
        }
    }
}

const redisService = new RedisService();
export default redisService;
