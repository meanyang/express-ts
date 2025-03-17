import { userData } from "../data";
import jwt from "jsonwebtoken";
import config from "../configs/config";
import { Request, Response, NextFunction } from 'express';

export const authenticateUser = (name: string, password: string) => {
    const user = userData.find((item) => item.name === name && item.password === password);
    return user;
};

export const generateToken = (user: any) => {
    return jwt.sign({ id: user?.id, name: user?.name }, config.jwt_secret, { expiresIn: 3600 });
};

export const registerUser = (name: string, password: string) => {
    const user = userData.find((item) => item.name === name);
    if (user) {
        throw new Error('User already exists');
    }

    const newUser = {
        id: Math.max(...userData.map((item) => item.id)) + 1,
        name,
        password
    };

    userData.push(newUser);
    return newUser;
};


export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        res.status(403).send({ message: 'No token provided!' });
        return;
    }

    jwt.verify(token, config.jwt_secret, (err, decoded) => {
        if (err) {
            res.status(401).send({ message: 'Unauthorized!' });
            return;
        }
        req.body.userId = (decoded as any).id; // 将用户 ID 存储在请求对象中
        next();
    });
};
