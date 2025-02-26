import express from 'express';
import redisClient from './utilites/redisClient';
import redisRouter from './routes/redis';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello Express.js and TypeScript!');
});

app.use('/', redisRouter);

app.listen(port, async () => {
    await redisClient.connect();
    console.log(`Server is running on port ${port}`);
})