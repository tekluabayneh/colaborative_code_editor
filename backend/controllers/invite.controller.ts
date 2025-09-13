import { Request, Response } from "express";
import Tokens from "../Utils/token";
import InviteToken from "../models/inviteToke";
import { sendInvitationLink } from "../services/email.service";
import validator from "../Utils/validator";
import Users from "../models/user";
import HashPassword from "../Utils/hash";
import Owners from "../models/Owners";

const sendInvite = async (req: Request, res: Response) => {
  if (!req.body.role || !req.body.email) {
    res.status(400).json({ message: "role and email are mandatory to invite" });
    return;
  }

  const { email, role } = req.body;

  if (
    (await validator.isUserRoleOwnerOrUser(email)) ||
    (await InviteToken.findOne({ email }))
  ) {
    res
      .status(400)
      .json({ message: "user already exist or it's in invite proccess" });
    return;
  }

  if (!req.token) {
    res.status(400).json({ message: "inviter not found" });
    return;
  }

  const inviter = req.token.email;
  const invitedBy = await validator.isUserRoleOwnerOrUser(inviter);
  let inviterId;

  if (!invitedBy) {
    res.status(400).json({ message: "inviter not found" });
    return;
  }

  let IsUser;
  if (!invitedBy.users_user) {
    inviterId = invitedBy.Owners_user._id;
    if (typeof invitedBy.Owners_user.email !== "string") {
      res.status(400).json({ message: "Email must be a string" });
      return;
    }
    IsUser = await validator.isUserRoleOwnerOrUser(invitedBy.Owners_user.email);
  }

  if (!invitedBy.Owners_user) {
    inviterId = invitedBy.users_user._id;
    if (typeof invitedBy.users_user.email !== "string") {
      res.status(400).json({ message: "Email must be a string" });
      return;
    }
    IsUser = await validator.isUserRoleOwnerOrUser(invitedBy.users_user.email);
  }

  if (!IsUser) {
    res.status(400).json({ message: "user is not found" });
    return;
  }

  if (IsUser.role !== "Admin" && IsUser.role !== "Owner") {
    res.status(401).json({ message: "forbidden insufficent role" });
    return;
  }

  const token = Tokens.ResetPasswordLink();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const storetoken = await InviteToken.insertOne({
    token: token,
    email: email,
    role: role,
    InvitedBy: inviterId,
    expireAt: expiresAt,
  });

  if (!storetoken._id) {
    res.status(500).json({ message: "internal server error" });
    return;
  }

  const InvitaionLInk: string = `http://localhost:3000/AcceptInvitation?token=${token}&email=${email}&role=${role}&inviterId=${inviterId}`;

  try {
    sendInvitationLink(email, InvitaionLInk);
    res.status(200).json({ message: "Invitation sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
};

const acceptInvite = async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).json({ message: "Request body is missing" });
    return;
  }

  const requiredFields = [
    "userName",
    "email",
    "password",
    "token",
    "role",
    "invitedBy",
  ] as const;

  for (let char of requiredFields) {
    if (!req.body[char]) {
      res.status(400).json({ message: "all input are mandatory" });
      return;
    }
  }

  const { userName, email, password, token, role, invitedBy } = req.body;

  const checkUser = await InviteToken.findOne({ email });
  if (!checkUser) {
    res.status(400).json({ message: "INvitation not found" });
    return;
  }

  const isInputValid = validator.validateEmailAndPassword(password, email);
  if (!isInputValid) {
    res.status(400).json({ message: "Invalid email or password" });
    return;
  }

  const isUserExist = await validator.isUserRoleOwnerOrUser(email);
  if (isUserExist) {
    res.status(409).json({ message: "User already exists" });
    return;
  }

  if (
    checkUser.role !== role ||
    checkUser.email !== email ||
    checkUser.token !== token
  ) {
    res.status(403).json({ message: "Invalid invite details" });
    return;
  }

  if (checkUser.expireAt && Number(checkUser.expireAt) < Date.now()) {
    res.status(410).json({ message: "Invite link expired" });
    return;
  }

  try {
    const hashedPassword = await HashPassword(password);

    const chckifOwnerIdExist = await Owners.findById(invitedBy);

    if (!chckifOwnerIdExist) {
      res.status(500).json({ message: "owner is not found " });
      return;
    }

    const StoreUser = await Users.insertOne({
      userName,
      email,
      password: hashedPassword,
      role,
      invitedBy,
      createdAt: new Date(),
    });

    await InviteToken.deleteOne({ email });

    if (StoreUser._id) {
      const token = Tokens.SignUser_JWT_Token(
        email,
        role,
        process.env.JWT_SECRET_KEY!
      );

      res.cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        maxAge: 100 * 60 * 60 * 60,
        signed: false,
      });

      res.status(201).json({ message: "Welcome! You are now a member", token });
      return;
    } else {
      res.status(500).json({ message: "Failed to create user" });
      return;
    }
  } catch (error) {
    console.error("AcceptInvite error:", error);
    res.status(500).json({ message: "Internal server error", error });
    return;
  }
};

export default { sendInvite, acceptInvite };
