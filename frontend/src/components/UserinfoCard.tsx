"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Globe, User } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface UserData {
  _id: string;
  userName: string;
  email: string;
  role: string;
  invitedBy: string;
}

export function UserInfoCard() {
  const [user, setUser] = useState<UserData | null>(null);
  const [email, setemail] = useState("");

  useEffect(() => {
    const getEmail = localStorage.getItem("email");
    if (!getEmail) return;
    setemail(getEmail);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!email) return;
      try {
        const res = await axios.post(
          "http://localhost:5000/api/User/getProfile",
          { email },
          { withCredentials: true }
        );
        const userData =
          res.data?.IsRoleUser?.users_user ||
          res.data?.IsRoleUser?.Owners_user ||
          null;
        setUser(userData);
      } catch (error: any) {
        toast.error(error.response?.data?.message || error.message);
      }
    };

    fetchProfile();
  }, [email]);

  return (
    <Card className="p-6 border-gray-700 bg-neutral-900">
      <div className="flex items-start gap-4">
        <div className="relative">
          {user ? (
            <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-gray-300" />
            </div>
          ) : (
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center animate-pulse">
              <User className="w-10 h-10 text-gray-500" />
            </div>
          )}

          <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-600 rounded-full border-2 border-card"></div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xl font-bold text-white">
              {user ? user.userName : "User not found"}
            </h2>
            <Badge variant="secondary" className="text-xs">
              {user ? user.email.split("@")[0] : "No Email"}
            </Badge>
          </div>

          <p className="text-gray-400 mb-3 text-sm">
            {user
              ? `${user.role} | Invited by: ${user.invitedBy}`
              : "User profile information is not available yet."}
          </p>

          <div className="flex flex-wrap gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>Location not set</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Timezone not set</span>
            </div>
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              <span className="text-green-600">
                {user ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
