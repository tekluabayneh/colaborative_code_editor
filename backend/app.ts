import express, { Request, Response } from 'express';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Example route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello from TypeScript + Express!');
});

export default app;
