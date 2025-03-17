import { Request, Response } from "express";
import { authenticateUser, generateToken, registerUser } from "../services/auth.service";

// User login
export const login = (req: Request, res: Response) => {
    const { name, password } = req.body;
    const user = authenticateUser(name, password);

    if (!user) {
        res.status(400).send("Invalid user name or password");
        return;
    }

    const token = generateToken(user);
    res.json({ token });
};

// User registration
export const register = (req: Request, res: Response) => {
    try {
        const { name, password } = req.body;
        const newUser = registerUser(name, password);
        res.json({
            id: newUser.id,
            name: newUser.name,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.status(400).send('An unknown error occurred');
        }
    }
};