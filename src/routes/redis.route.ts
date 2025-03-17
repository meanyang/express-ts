import { Router } from 'express';
import { getFromRedis, setInRedis, deleteFromRedis } from '../controllers/redis.controller';

const router = Router();

// Get data from Redis by key
router.get('/:key', getFromRedis);
// Set data in Redis
router.post('/', setInRedis);
// Delete data from Redis by key
router.delete('/:key', deleteFromRedis);

export default router;