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
import { warn } from "console";
import { find } from "cypress/types/lodash";
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


passport.deserializeUser(async (id, done) => {
  try {
const findUser = await Owners.findOne({id:id})	

 if(!findUser) return  done(null, false)
      return done(null, findUser) 
  } catch (err) {
    return done(err);
  }
});


// Middleware to set security-related HTTP headers
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
const RateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, 
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


export default app;
