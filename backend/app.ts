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
import inviteRouter from "./routes/invite.route";
import {configuregoogleAuth, configuregithubstrateg } from "./controllers/outh.controller";
import DocumentRouter from "./routes/document.route";
import Owners from "./models/Owners";
import GloblaError from "./middlewares/error.middleware"
import cookieParser from "cookie-parser";
import UserRouter from "./routes/user.route";

 
  
const app = express();

type user ={
	_id?:number
}

app.use(
  cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials:true,
  })
);


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


app.use(helmet());
app.use(cookieParser()); 
app.use(express.urlencoded({ extended: true }));

const RateLimit = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 10, 
  message: "Too many requests, please try again later.",
});

// app.use(RateLimit);
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
app.use("/api",  inviteRouter);


// document route 
app.use("/api",DocumentRouter)

// User Route
app.use("/api",UserRouter)


app.use(GloblaError)

export default app;
