import passport from "passport";
import axios from "axios"
import Tokens from "../Utils/token";
import { Request, Response, NextFunction, Router } from "express"
const OAuthRouter = Router()
interface OauthType {
    userName: string,
    email: string,
    photo: string,
}

OAuthRouter.get("/google", (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next)
})



OAuthRouter.get("/google/callback",
    passport.authenticate("google", { failureRedirect: process.env.ORIGIN_FRONTEND_URL + "/Auth" }),
    async (req: Request, res: Response) => {
        const user = (req.user as OauthType).email
        const role = "Owner"

        const token = Tokens.SignUser_JWT_Token(user, role, process.env.JWT_SECRET_KEY!)

        const isProduction = process.env.NODE_ENV === 'production';
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
            partitioned: true,
            // domain: isProduction ? '.yourdomain.com' : undefined,
            signed: false,
        });



        await axios.post(process.env.BACKEND_URL + "/api/auth/sendOtp", { email: user });
        const userEmail = encodeURIComponent(user)
        res.redirect(process.env.ORIGIN_FRONTEND_URL + `/verifyOtp?email=${userEmail}`)
    })


OAuthRouter.get("/github", (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("github", { scope: ["profile", "user:email"] })(req, res, next)
})



OAuthRouter.get("/github/callback", passport.authenticate("github", { failureRedirect: process.env.ORIGIN_FRONTEND_URL + "/Auth" })
    , async (req: Request, res: Response) => {
        const user = (req.user as OauthType).email
        const role = "Owner"
        const token = Tokens.SignUser_JWT_Token(user, role, process.env.JWT_SECRET_KEY!)

        const isProduction = process.env.NODE_ENV === 'production';
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
            partitioned: true,
            // domain: isProduction ? '.yourdomain.com' : undefined,
            signed: false,
        });

        await axios.post(process.env.BACKEND_URL + "/api/auth/sendOtp", { email: user });

        const userEmail = encodeURIComponent(user)
        res.redirect(process.env.ORIGIN_FRONTEND_URL + `/verifyOtp?email=${userEmail}`)

    })

export default OAuthRouter
