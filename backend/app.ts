import dotenv from "dotenv"
dotenv.config();
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from "cors"
import AuthRouter from "./routes/auth.route.js"
import User from "./models/user";
const app = express();

// Middleware to enable cors
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
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
app.use(express.json());
// app.use(mongoSntisize());
//
app.get('/', (req: Request, res: Response) => {
    const header = req.headers.authorization
    console.log('Authorization Header:', header);
    res.send('Hello from TypeScript + Express!');
});

app.get('/api/users', async (req: Request, res: Response) => {
    const userRepo = await User.find()
    res.status(200).json(userRepo)
    console.log(userRepo)
})

app.use("/api", AuthRouter)
export default app;
