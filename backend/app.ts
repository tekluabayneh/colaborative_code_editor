import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import AuthRouter from "./routes/auth.route";
import OAuthRouter from "./routes/OAuth.route";
import passport from "passport"
import session from "express-session"
import {configuregoogleAuth, configuregithubstrateg } from "./controllers/outh.controller";
import Owners from "./models/Owners";
const app = express();

type user ={
	_id?:number
}

// Middleware to enable cors
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// session
app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);


app.use(passport.initialize());
app.use(passport.session());


// // Github auth
configuregithubstrateg(passport);

// // Google auth
configuregoogleAuth(passport);


passport.serializeUser((user:user, done) => {
  done(null, user._id ?? "1")
});


passport.deserializeUser(async (user, done) => {
  try {
    let result = [0]
    if (result.length > 0) {
      return done(null, result[0]);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err);
  }
});


// Middleware to set security-related HTTP headers
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
const RateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
});
app.use(RateLimit);
app.use(express.json());
// app.use(mongoSntisize());
//
app.get("/", (req: Request, res: Response) => {
  const header = req.headers.authorization;
  console.log("Authorization Header:", header);
  res.send("Hello from TypeScript + Express!");
});


// local auth 
app.use("/api", AuthRouter);

// OAuth 
app.use("/api", OAuthRouter);


export default app;
