import { Schema } from "mongoose";

interface UserType {
  _id: any;
  userName: string;
  email: string;
  password: string;
  role: string;
  invitedBy?: string;
  createdAt?: string;
}

export type IsRoleUser =
  | {
      role: string;
      isOwner: false;
      Users_user: UserType;
    }
  | {
      role: string;
      isOwner: true;
      Owners_user: UserType;
    };
