import jwt from "jsonwebtoken";
import { compareSync } from "bcryptjs";
import { Request } from "express";
import type { returnMessage } from "../types/user";
import Owners from "../models/Owners";
import Users from "../models/user";
import { IsRoleUser, UserType } from "../types/document";
const validateEmailAndPassword = (password: string, email: string): boolean => {
  if (password.length < 6 || password.length > 30) {
    return false;
  }

  const regx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regx.test(email);
};

const ValidateRegister = (request: Request): returnMessage => {
  const { email, userName, password } = request.body;

  if (!email || !userName || !password) {
    return {
      isValid: false,
      message: " Validation failed: Missing required fields",
    };
  }

  if (!validateEmailAndPassword(password, email)) {
    return {
      isValid: false,
      message: "Invalid email or password length is above 30",
    };
  }
  return {
    isValid: true,
    message: "Validation pass",
  };
};

const ValidateLogin = (request: Request): returnMessage => {
  const { email, password } = request.body;
  if (!email || !password) {
    return {
      isValid: false,
      message: " Validation failed: Missing required fields",
    };
  }

  if (!validateEmailAndPassword(password, email)) {
    return {
      isValid: false,
      message: "Invalid email or password length is not correct",
    };
  }
  return {
    isValid: true,
    message: "Validation pass",
  };
};

const VerifyJwtToken = (
  token: string,
  secretKey: string
): string | jwt.JwtPayload => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded as jwt.JwtPayload;
  } catch (error) {
    return "Invalid token";
  }
};

const isUserAlreadyRegistered = async (email: string): Promise<boolean> => {
  const findUserByEmail = await Owners.find({ email: email });
  return findUserByEmail.length === 0 ? false : true;
};

const isUserRoleOwnerOrUser = async (
  email: string
): Promise<IsRoleUser | null> => {
  const Owners_user = await Owners.findOne({ email });
  const Users_user = await Users.findOne({ email });

  if (!Owners_user && !Users_user) {
    return null;
  }

  if (Owners_user) {
    return { role: Owners_user.role, isOwner: true, Owners_user };
  }

  if (Users_user) {
    return {
      role: Users_user.role as string,
      isOwner: false,
      Users_user,
    } as unknown as IsRoleUser;
  }

  return null;
};

const isPasswordMatch = async (
  password: string,
  hasedapssword: string
): Promise<boolean> => {
  return compareSync(password, hasedapssword);
};

export default {
  ValidateLogin,
  ValidateRegister,
  VerifyJwtToken,
  isUserAlreadyRegistered,
  isUserRoleOwnerOrUser,
  validateEmailAndPassword,
  isPasswordMatch,
};

// validateing step we hvae to take
// first check if the input value are present or not
// then check if the input value are valid or not
