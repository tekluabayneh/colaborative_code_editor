"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import {
  Users,
  Crown,
  Circle,
  MessageCircle,
  User,
  Coffee,
  Zap,
} from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const getStatusConfig = (status: string) => {
  switch (status) {
    case "online":
      return { color: "green-500", icon: Circle, pulse: true };
    case "away":
      return { color: "white", icon: Circle, pulse: false };
    case "offline":
      return { color: "red-500", icon: Circle, pulse: false };
    default:
      return { color: "gray-900", icon: Circle, pulse: false };
  }
};

const getMoodIcon = (mood: string) => {
  switch (mood) {
    case "focused":
      return Zap;
    case "creative":
      return "🎨";
    case "coffee":
      return Coffee;
    case "energetic":
      return "⚡️";
    case "thoughtful":
      return "💭";
    default:
      return MessageCircle;
  }
};

export const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getEmail = localStorage.getItem("email");
    if (getEmail) setEmail(getEmail);
  }, []);

  const fetchTeamMembers = async () => {
    if (!email) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/User/GetOwnerUsers",
        { email },
        { withCredentials: true }
      );

      console.log(res.data);
      const data = res.data || [];

      const transformedData = data.map((item: any, index: number) => ({
        id: item._id || index + 1,
        name: item.userName || `User ${index + 1}`,
        role: item.role || "Developer",
        avatar: "",
        initials: item.userName
          ? item.userName
              .split(" ")
              .map((n: string) => n[0])
              .join("")
          : "UK",
        status: "online",
        commitsToday: Math.floor(Math.random() * 10),
        isLead: item.role === "Admin",
        mood: ["focused", "creative", "coffee", "energetic", "thoughtful"][
          Math.floor(Math.random() * 5)
        ],
        lastSeen: "Active now",
      }));

      setTeamMembers(transformedData);
    } catch (error: any) {
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error.message;
      toast.error(message);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, [email]);

  const onlineCount = teamMembers.filter((m) => m.status === "online").length;

  return (
    <Card className="w-full relative overflow-hidden p-6 bg-neutral-900 border border-gray-600/50 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />

      <CardHeader className="relative flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-3">
          <div className="relative">
            <Users className="w-5 h-5 text-code-purple text-code-green" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-600 rounded-full border-2 border-background animate-pulse-slow" />
          </div>
          <span className="bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text">
            Team Members
          </span>
        </CardTitle>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-green-600 ">
            {onlineCount} online
          </Badge>
          <Badge variant="outline" className="text-blue-600 ">
            {teamMembers.length} total
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-3">
        {teamMembers.length > 0 ? (
          teamMembers.map((member, index) => {
            const statusConfig = getStatusConfig(member.status);
            const StatusIcon = statusConfig.icon;
            const MoodIcon = getMoodIcon(member.mood);

            return (
              <div
                key={member.id}
                className={`
                  relative flex items-center gap-4 p-4 rounded-xl 
                  bg-gradient-to-r from-transparent via-purple-500 to-transparent
                  hover:from-purple-50 hover:via-code-purple/5 hover:to-transparent
                  transition-all duration-500 group cursor-pointer
                  border border-transparent animate-slide-up
                `}
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <div className="relative">
                  <Avatar className="w-12 h-12 ring-2 ring-border/50 group-hover:ring-primary/50 transition-all duration-300">
                    {member.avatar ? (
                      <AvatarImage src={member.avatar} alt={member.name} />
                    ) : (
                      <AvatarFallback className="text-sm font-medium">
                        {member.initials}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <div className="absolute -bottom-1 -right-1">
                    <StatusIcon
                      className={`
                        w-4 h-4 text-${statusConfig.color} fill-current 
                        ${statusConfig.pulse ? "animate-pulse-slow" : ""}
                      `}
                    />
                  </div>

                  {member.isLead && (
                    <Crown className="absolute -top-2 -right-2 w-4 h-4 text-code-yellow fill-current animate-float" />
                  )}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm group-hover:text-primary transition-colors">
                      {member.name ? member.name : "User not found"}
                    </span>

                    {member.isLead && (
                      <Badge
                        variant="outline"
                        className="text-code-yellow border-code-yellow/30 bg-code-yellow/10 text-xs"
                      >
                        Lead
                      </Badge>
                    )}

                    <div className="text-xs" title={`Mood: ${member.mood}`}>
                      {typeof MoodIcon === "string" ? (
                        <span>{MoodIcon}</span>
                      ) : (
                        <MoodIcon className="w-3 h-3 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>
                      {member.role ? member.role : "Role not assigned"}
                    </span>
                    <span>•</span>
                    <span>
                      {member.lastSeen ? member.lastSeen : "Last seen unknown"}
                    </span>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <Badge
                    variant="outline"
                    className={`
                      text-${statusConfig.color} border-${statusConfig.color}/30 bg-${statusConfig.color}/10 text-xs
                      group-hover:bg-${statusConfig.color}/20 transition-all duration-300
                    `}
                  >
                    {member.status ? member.status : "Status unknown"}
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium text-code-blue">
                      {member.commitsToday ?? 0}
                    </span>{" "}
                    commits today
                  </div>
                </div>

                <div className="absolute inset-0 bg-code-purple/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Users className="w-12 h-12 mb-4" />
            <p className="text-center text-lg">
              No team members found. Maybe the user hasn't added anyone yet.
            </p>
          </div>
        )}

        <div className="pt-2">
          <Button
            variant="outline"
            className="w-full border-dashed border-primary/30 hover:border-gray-500/50 hover:bg-neutral-900/5 transition-all duration-300 group"
          >
            <Users className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Invite Team Member
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
