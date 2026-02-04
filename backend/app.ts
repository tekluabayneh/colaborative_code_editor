import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import AuthRouter from "./routes/auth.route";
import OAuthRouter from "./routes/OAuth.route";
import passport from "passport"
import session from "express-session"
import inviteRouter from "./routes/invite.route";
import { configuregoogleAuth, configuregithubstrateg } from "./controllers/outh.controller";
import DocumentRouter from "./routes/document.route";
import Owners from "./models/Owners";
import GloblaError from "./middlewares/error.middleware"
import cookieParser from "cookie-parser";
import UserRouter from "./routes/user.route";
import AICodeCompletionRouter from "./routes/codeCompletion.route";
import { GetAzureToken } from "./Utils/GetAzuerCode"


const app = express();

type user = {
    _id?: number
}

// app.use(cors({
//     origin: true,
//     credentials: true
// }));
//

app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (origin && origin === process.env.ORIGIN_FRONTEND_URL) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Vary", "Origin");
    }

    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );

    if (req.method === "OPTIONS") {
        res.sendStatus(204);
        return
    }

    next();
});


app.set("trust proxy", 1);

const isProd = process.env.NODE_ENV === 'production';
app.use(session({
    secret: process.env.SESSION_SECRET || "my-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? 'lax' : 'lax',
        maxAge: 24 * 60 * 60 * 1000,
        domain: isProd ? process.env.COOKIE_DOMAIN : undefined,
    },
}));

app.use(passport.initialize());
app.use(passport.session());


// // Github auth
configuregithubstrateg(passport);

// // Google auth
configuregoogleAuth(passport);


passport.serializeUser((user: user, done) => {
    done(null, user._id ?? "1")
});


passport.deserializeUser(async (id, done) => {
    try {
        const findUser = await Owners.findOne({ id: id })

        if (!findUser) return done(null, false)
        return done(null, findUser)
    } catch (err) {
        return done(err);
    }
});


app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const RateLimit = rateLimit({
    windowMs: 3 * 60 * 1000,
    max: 1000,
    message: "Too many requests, please try again later.",
});

app.use(RateLimit);
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    const header = req.headers.authorization;
    console.log("Authorization Header:", header);
    res.send("Hello from TypeScript + Express!");
});



// local auth 
app.use("/api", AuthRouter);

// OAuth 
app.use("/api", OAuthRouter);

// invite user 
app.use("/api", inviteRouter);


// document route 
app.use("/api", DocumentRouter)

// User Route
app.use("/api", UserRouter)

// get the ai code completion
app.use("/api", AICodeCompletionRouter);


// call the fuction and get the token
app.get("/api/getAzureToken", (req, res) => {
    GetAzureToken();
    res.send("Token fetch triggered");
});

app.use(GloblaError)

export default app;
