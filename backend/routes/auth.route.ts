import express from "express";
import authController from "../controllers/auth.controller";
import AuthMiddleware from "../middlewares/auth.middleware";
const { Login, Register , verifyOtp, SendOTP} = authController;
const { ResgisterValidate, LoginValidate } = AuthMiddleware;
const AuthRouter = express.Router();

AuthRouter.post("/auth/login", LoginValidate, Login);

AuthRouter.post("/auth/register", ResgisterValidate, Register);

AuthRouter.post("/auth/sendOtp", SendOTP )

AuthRouter.post("/auth/verifyOtp", verifyOtp)

export default AuthRouter;
