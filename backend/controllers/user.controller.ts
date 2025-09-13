import Owners from "../models/Owners";
import Users from "../models/user";
import validator from "../Utils/validator";
import { Response, Request } from "express";
class UserControllers {
  async GetAllOwnerUsers(req: Request, res: Response) {
    const { email } = req.body as { email: string };
    console.log("this is emai", email);
    try {
      const IsRoleUser = await validator.isUserRoleOwnerOrUser(email);

      // check if the user is found
      if (!IsRoleUser) {
        res.status(404).json({ message: "user not found" });
        return;
      }

      // if the email is user find its owner if it just owner look for it's users
      // if the user is is not Owner get his owner id and fetch its folder tree
      let findOwnerId;
      if (IsRoleUser.role !== "Owner") {
        const invitedBy = IsRoleUser.users_user?.invitedBy;
        findOwnerId = await Owners.findOne({ _id: invitedBy });
      } else {
        findOwnerId = IsRoleUser?.Owners_user?._id;
      }

      const findUsers = await Users.find({ invitedBy: findOwnerId });

      res.send(findUsers);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  // Change user role
  async updateUserRole(req: Request, res: Response) {
    if (!req.body.newRole) {
      res.status(404).json({ message: "new role is required" });
      return;
    }
    try {
      const { userId } = req.params;
      const { newRole } = req.body;

      // Only update the role
      const updatedUser = await Users.findById(userId);

      if (!updatedUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      updatedUser.role = newRole;
      updatedUser.save();

      res.json({ message: "Role updated successfully", user: updatedUser });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
  async getTotalUser() {}
}

const UserController = new UserControllers();

export default UserController;
