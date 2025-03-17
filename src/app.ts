import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import morgan from 'morgan';
import config from './configs/config';
import routes from './routes'; // Import unified route file

const app = express();
const port = config.port;

// Parse incoming JSON requests
app.use(express.json());
// Log HTTP requests
app.use(morgan('dev')); 

// Use unified routes
app.use(routes);

// Global error handling middleware
app.use(errorHandler); 

// Start the server and handle errors
const startServer = async () => {
    try {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error(`Failed to start server on port ${port}:`, error);
    }
};

startServer();