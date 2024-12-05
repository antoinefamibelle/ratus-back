import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import serverless from 'serverless-http';

import bankRoutes from './routes/bank.routes';
import userRoutes from './routes/user.routes';

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Health check endpoint (no auth required)
app.get('/ping', (req: Request, res: Response) => res.send('pong'));

// Routes
app.use('/bank', bankRoutes);
app.use('/users', userRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: err.message
    });
});

// Create the handler function
const serverlessHandler = serverless(app);

// Export the Lambda handler
export const handler = serverlessHandler;