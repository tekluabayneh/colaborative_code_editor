import express, { Request, Response } from 'express';

const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());

// Example route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello from TypeScript + Express!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

