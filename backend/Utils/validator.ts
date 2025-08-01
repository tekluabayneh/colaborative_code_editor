import jwt from "jsonwebtoken";
import { compareSync } from "bcryptjs";
import { Request } from "express";
import type { returnMessage } from "../types/user";
import Owners from "../models/Owners";
import Users from "../models/user";
const validateEmailAndPassword = (password: string, email: string): boolean => {
  if (password.length < 6 || password.length > 30) {
    return false;
  }
  // if email is not the correct email type return message for the user
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

const VerifyJwtToken = ( token: string, secretKey: string): string | jwt.JwtPayload => {
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


const isUserRoleOwnerOrUser =async(email:string) => {
const Owners_user = await Owners.findOne({email:email})
const users_user =  await Users.findOne({email:email})

	// is the result of owners is empty we know its user
	if(Owners_user){
         return { role:Owners_user.role, isOwner:true }

	}else if(users_user){
	  return { role:users_user.role, isOwner:false }
	}

}

const isPasswordMatch = async(password:string, hasedapssword:string): Promise<boolean> => {
   return compareSync(password,hasedapssword) 
}


export default {
  ValidateLogin,
  ValidateRegister,
  VerifyJwtToken,
  isUserAlreadyRegistered,
  isUserRoleOwnerOrUser ,
isPasswordMatch
};

// validateing step we hvae to take
// first check if the input value are present or not
// then check if the input value are valid or not
