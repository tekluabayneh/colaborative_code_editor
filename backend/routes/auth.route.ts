import express from "express";
import authController from "../controllers/auth.controller";
import AuthMiddleware from "../middlewares/auth.middleware";
const { Login, Register, ResetPassword, verifyOtp, SendOTP, sendResetLink } =
  authController;
const { ResgisterValidate, LoginValidate, ResetPasswordValidate } =
  AuthMiddleware;
const AuthRouter = express.Router();

AuthRouter.post("/auth/login", LoginValidate, Login);

AuthRouter.post("/auth/register", ResgisterValidate, Register);

AuthRouter.post("/auth/sendOtp", SendOTP);

AuthRouter.post("/auth/verifyOtp", verifyOtp);

AuthRouter.post("/auth/sendRestLink", sendResetLink);

AuthRouter.post("/auth/ResetPassword", ResetPasswordValidate, ResetPassword);

export default AuthRouter;
