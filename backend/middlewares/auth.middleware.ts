import { Request, Response, NextFunction } from "express";
import validateAuthRequest from "../Utils/validator";

const ResgisterValidate = async ( req: Request, res: Response, next: NextFunction) => {
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

const LoginValidate = async ( req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!validateAuthRequest.ValidateLogin(req)) {
    res.status(400).json({ error: "Invalid registration data" });
    return;
  }

  if (!await validateAuthRequest.isUserAlreadyRegistered(email)) {
    res .status(400) .json({ message: "user does not exists please check you email " });
    return;
  }

  next();
};



// check if the user is  oging useing invite code and if the invite code is valid and redirect them to the dashboard and set thier role to user or admin or super admin

export default { ResgisterValidate, LoginValidate };
