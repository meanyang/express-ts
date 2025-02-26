import { Request, Response, NextFunction } from "express";
import redisClient from "../utilites/redisClient"

// Middleware to check if data is in the cache
export const checkCache = async (req: Request, res: Response, next: NextFunction) => {
    const cachedData = await redisClient.get('cachedData');

    if (cachedData) {
        res.send(JSON.parse(cachedData));
    } else {
        next(); // Continue to the route handler if data is not in the cache
    }
};

export const cache = async (req: Request, res: Response) => {
    const dataToCache = { message: 'Data to be cached' };
    await redisClient.set('cachedData', JSON.stringify(dataToCache), { EX: 3600 });
    res.send(dataToCache);
}