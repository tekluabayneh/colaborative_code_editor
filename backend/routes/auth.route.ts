import express from "express"
import authController from "../controllers/auth.controller"
import AuthMiddleware from "../middlewares/auth.middleware"
const { Login, Register } = authController
const { ResgisterValidate, LoginValidate } = AuthMiddleware
const AuthRouter = express.Router()

AuthRouter.get("/auth/login", LoginValidate, Login)

AuthRouter.post("/auth/register", ResgisterValidate, Register)

export default AuthRouter;
