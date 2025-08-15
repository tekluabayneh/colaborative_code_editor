import { Request, Response } from "express"
import Tokens from "../Utils/token"
import InviteToken  from "../models/inviteToke"
import {sendInvitationLink} from "../services/email.service"
import validator from "../Utils/validator"
import Users from "../models/user"
import HashPassword from "../Utils/hash"

const sendInvite = async (req:Request, res:Response) => { 
	if(!req.body.role || !req.body.email || !req.body.InvitedBy){ 
		res.status(400).json({message:"role and email are mandatory to invite"})
		return 
	}

	const {email, role, InvitedBy} = req.body

	if (typeof email !== "string") {
		res.status(400).json({ message: "Email must be a string" });
		return;
	}

	const IsUser = await validator.isUserRoleOwnerOrUser(email)

	if(!IsUser){ 
		res.status(400).json({message:"user is not found"}) 
		return 
	}

	if(IsUser.role !== "Admin" && IsUser.role !==  "Owner"){ 
		res.status(401).json({message:"forbidden insufficent role"}) 
		return 
	} 

	const token = Tokens.ResetPasswordLink()
	const expiresAt = new Date(Date.now() + 5 * 60 * 1000)
	const storetoken = await InviteToken.insertOne({token:token, email:email, role:role, InvitedBy:InvitedBy, expireAt:expiresAt})

	if(!storetoken._id){ 
		res.status(500).json({message:"internal server error"}) 
		return 
	} 

	const  InvitaionLInk:string = `http://localhost:3000/AcceptInvite?token=${token}&email=${email}&role=${role}`

	try {
		sendInvitationLink(email,  InvitaionLInk)

		res.status(200).json({ message: "Invitation sent successfully" }); 
	} catch (err) {
		res.status(500).json({message:"internal server error"}) 
	}

}

const acceptInvite = async (req: Request, res: Response) => {
  if (!req.body.email || !req.query.token || !req.query.role) {
    return res.status(400).json({ message: "Email, token, and role are required" });
  }

  const { userName, email, password } = req.body;
  const role = String(req.query.role);
  const token = String(req.query.token);

  // 1. Check invite token
  const checkUser = await InviteToken.findOne({ email });
  if (!checkUser) {
    return res.status(400).json({ message: "Invite not found" });
  }

  // 2. Verify role & email match
  if (checkUser.role !== role || checkUser.email !== email) {
    return res.status(403).json({ message: "Invalid invite details" });
  }

  // 3. Check expiry
  if (checkUser.expireAt && checkUser.expireAt.getTime() < Date.now()) {
    return res.status(410).json({ message: "Invite link expired" });
  }

  // 4. Check if user already exists
  const isUserExist = await validator.isUserRoleOwnerOrUser(email);
  if (isUserExist) {
    return res.status(409).json({ message: "User already exists" });
  }

  // 5. Validate email & password format
  const isInputValid = validator.validateEmailAndPassword(email, password);
  if (!isInputValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  try {
    // 6. Hash password
    const hashedPassword = HashPassword(password) 

    // 7. Store new user
    const StoreUser = await Users.insertOne({
      userName,
      email,
      password: hashedPassword,
      role,
      createdAt: new Date()
    });

    // 8. Cleanup invite token
    await InviteToken.deleteOne({ email });

    if (StoreUser.insertedId) {
      return res.status(201).json({ message: "Welcome! You are now a member 🎉" });
    } else {
      return res.status(500).json({ message: "Failed to create user" });
    }
  } catch (error) {
    console.error("AcceptInvite error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};




export default { sendInvite, acceptInvite}
