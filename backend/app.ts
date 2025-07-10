import dotenv from "dotenv"
dotenv.config();
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from "cors"
import AuthRouter from "./routes/auth.route.js"
import mongoSntisize from 'express-mongo-sanitize';
const app = express();

// Middleware to enable cors
app.use(cors({
    origin: '*', // Allow all origins, adjust as necessary for your use case
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));


// Middleware to set security-related HTTP headers
app.use(helmet())
app.use(express.urlencoded({ extended: true }));
const RateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.'
});
app.use(RateLimit);
// Middleware to parse JSON
app.use(express.json());
// app.use(mongoSntisize());
// Example route
app.get('/', (req: Request, res: Response) => {
    const header = req.headers.authorization
    console.log('Authorization Header:', header);
    res.send('Hello from TypeScript + Express!');
});
app.use("/api", AuthRouter)
export default app;
