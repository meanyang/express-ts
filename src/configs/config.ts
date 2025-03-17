import dotenv from "dotenv";

dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    jwt_secret: process.env.JWT_SECRET || 'default_secret',
    redis_url: process.env.REDIS_URL || 'redis://localhost:6379'
};

export default config;