import { Router } from "express";
import { login, register } from "../controllers/auth.controller";

const router = Router();

// User login route
router.post("/login", login);

// User registration route
router.post("/register", register);

export default router;