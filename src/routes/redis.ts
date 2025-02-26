import { Router } from "express";
import { cache, checkCache } from "../controllers/redis";

const router = Router();

// Use the checkCache middleware before the route handler
router.get('/cache', checkCache, cache);

export default router;