import express from "express"
import inviteControllers from "../controllers/invite.controllers"
import  authorizeRoles from "../middlewares/role.middleware"   
import  authenticateMiddleware from "../middlewares/auth.middleware"
const { sendInvite, acceptInvite} = inviteControllers 
const {authenticate} = authenticateMiddleware 
const  inviteRouter = express.Router() 


inviteRouter.post("/auth/invite", authenticate, authorizeRoles("Admin","Ownder"), sendInvite)

inviteRouter.post("/auth/acceptInvite", acceptInvite)

export default inviteRouter
