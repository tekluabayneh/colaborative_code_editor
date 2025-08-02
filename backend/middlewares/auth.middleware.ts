import { Request, Response, NextFunction } from "express";
import validateAuthRequest from "../Utils/validator";

// give them role if they are admin or user
// check if the user is already registered
const ResgisterValidate = async ( req: Request, res: Response, next: NextFunction) => {
  const { email, password, userName } = req.body;

  // validate the request body for registration
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

const LoginValidate = async ( req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  // validate the request body for registration
  if (!validateAuthRequest.ValidateLogin(req)) {
    res.status(400).json({ error: "Invalid registration data" });
    return;
  }

  if (!await validateAuthRequest.isUserAlreadyRegistered(email)) {
    res .status(400) .json({ message: "user does not exit please check you email " });
    return;
  }

  next();
};



/// check the role // we have function for that in the midleware
// check JWT token if it is valid
// check if the user is  oging useing invite code and if the invite code is valid and redirect them to the dashboard and set thier role to user or admin or super admin

export default { ResgisterValidate, LoginValidate };
