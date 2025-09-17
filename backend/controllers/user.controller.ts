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

      let findOwnerId;
      if (IsRoleUser.isOwner) {
        findOwnerId = IsRoleUser?.Owners_user?._id;
      } else {
        const invitedBy = IsRoleUser.Users_user?.invitedBy;
        findOwnerId = await Owners.findOne({ _id: invitedBy });
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
      return;
    }
  }

  async getProfile(req: Request, res: Response) {
    if (!req.body.email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }
    const { email } = req.body;

    try {
      const IsRoleUser = await validator.isUserRoleOwnerOrUser(email);

      // check if the user is found
      if (!IsRoleUser) {
        res.status(404).json({ message: "user not found" });
        return;
      }

      res.status(200).json({
        message: "Users fetched successfully",
        IsRoleUser,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Server error" });
    }
  }

  async updateUserRoleOrStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { role } = req.body;
    if (!id && !id) {
      res.status(400).json({ message: "Role or id must be provided" });
      return;
    }
    try {
      const user = await Users.findById(id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      if (role) user.role = role;

      await user.save();

      res.json({ message: "User updated successfully", user });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Server error" });
    }
  }

  async getTotalUser(req: Request, res: Response) {}
}

const UserController = new UserControllers();

export default UserController;
