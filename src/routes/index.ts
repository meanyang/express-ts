import { Router } from 'express';
import redisRouter from './redis.route';
import authRouter from './auth.route';
import { verifyToken } from '../services/auth.service';

const router = Router();

// Root route
router.get('/', (req, res) => {
    res.send('Hello Express.js and TypeScript!');
});

// Use authentication routes
router.use('/auth', authRouter);
// Assume /redis routes require token verification
router.use('/redis', verifyToken, redisRouter); 

export default router;
