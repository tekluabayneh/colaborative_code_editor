import { Request, Response, NextFunction } from "express";
import validateAuthRequest from "../Utils/validator";
import Users from "../models/user";
import Owners from "../models/Owners";
import Jwt, { JwtPayload } from "jsonwebtoken";

interface UserPayload extends JwtPayload {
  email: string;
  role: string;
}

const ResgisterValidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.email || !req.body.password || !req.body.userName) {
    res.status(400).json({ message: "all input are mandatory" });
    return;
  }

  const { email, password, userName } = req.body;

  if (!validateAuthRequest.ValidateRegister(req).isValid) {
    res
      .status(400)
      .json({ message: validateAuthRequest.ValidateRegister(req).message });
    return;
  }
  if (await validateAuthRequest.isUserAlreadyRegistered(email)) {
    res
      .status(400)
      .json({ message: "user already exist please check you email " });
    return;
  }

  next();
};

const LoginValidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ message: "all input are mandatory" });
    return;
  }

  const { email, password } = req.body;

  if (!validateAuthRequest.ValidateLogin(req)) {
    res.status(400).json({ error: "Invalid registration data" });
    return;
  }

  next();
};

const ResetPasswordValidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body || {};
  if (!body.newPassword || !req.query.token || !req.query.email) {
    res.status(400).json({ message: "all input are mandatory" });
    return;
  }

  const { email } = req.query;

  const checkUserExistFromUsers = await Users.findOne({ email: email });
  const checkUserExistFromOwners = await Owners.findOne({ email: email });

  if (!checkUserExistFromUsers && !checkUserExistFromOwners) {
    res
      .status(400)
      .json({ message: `user is not found with the email of ${email} ` });
    return;
  }
  next();
};

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;

  if (!token || Array.isArray(token)) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  try {
    const decoded = Jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as UserPayload;
    if (typeof decoded == "object" && decoded.email && decoded.role) {
      req.token = { email: decoded.email, role: decoded.role };
      next();
    }
  } catch (error) {
    res.clearCookie("accessToken");
    res.status(403).json({ message: "Invalid or expired token", error });
  }
};

// check if the user is  oging useing invite code and if the invite code is valid and redirect them to the dashboard and set thier role to user or admin or super admin

export default {
  ResgisterValidate,
  LoginValidate,
  authenticate,
  ResetPasswordValidate,
};
