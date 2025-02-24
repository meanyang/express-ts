import express from 'express';
import { createClient } from 'redis';

const app = express();
const port = process.env.PORT || 3000;

const client = createClient();
client.on('error', err => console.log('Redis Client Error', err));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello Express.js and TypeScript!');
});

// Middleware to check if data is in the cache
const checkCache = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const cachedData = await client.get('cachedData');

    if (cachedData) {
        res.send(JSON.parse(cachedData));
    } else {
        next(); // Continue to the route handler if data is not in the cache
    }
};

// Use the checkCache middleware before the route handler
app.get('/cache', checkCache, async (req, res) => {
    const dataToCache = { message: 'Data to be cached' };
    await client.set('cachedData', JSON.stringify(dataToCache)); 
    res.send(dataToCache);
});

app.listen(port, async () => {
    await client.connect();
    console.log(`Server is running on port ${port}`);
})