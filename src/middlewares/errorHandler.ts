import { Request, Response, NextFunction } from 'express';

// Global error handling middleware
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
};
