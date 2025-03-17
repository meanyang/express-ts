import { Request, Response } from 'express';
import redisService from '../services/redis.service';

// Get data from Redis by key
export const getFromRedis = async (req: Request, res: Response) => {
    const key = req.params.key;
    const data = await redisService.get(key);
    if (data) {
        res.send(data);
    } else {
        res.status(404).send('Data not found');
    }
};

// Set data in Redis
export const setInRedis = async (req: Request, res: Response) => {
    const { key, value, expiration } = req.body;
    await redisService.set(key, value, expiration);
    res.send('Data set successfully');
};

// Delete data from Redis by key
export const deleteFromRedis = async (req: Request, res: Response) => {
    const key = req.params.key;
    await redisService.del(key);
    res.send('Data deleted successfully');
};