import { Router } from "express";
import UserController from "../controllers/user.controller";
import authenticateMiddleware from "../middlewares/auth.middleware";
const { authenticate } = authenticateMiddleware;
import authorizeRoles from "../middlewares/role.middleware";
const UserRouter = Router();

UserRouter.post(
  "/User/GetOwnerUsers",
  authenticate,
  authorizeRoles("Admin", "Owner"),
  (req, res) => UserController.GetAllOwnerUsers(req, res)
);
UserRouter.post(
  "User/",
  authenticate,
  authorizeRoles("Admin", "Owner"),
  (req, res) => UserController.updateUserRole(req, res)
);

export default UserRouter;
