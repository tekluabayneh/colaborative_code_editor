"use client";

import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

import {
    Users,
    Crown,
    Circle,
    MessageCircle,
    Coffee,
    Zap,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";

import type { UserType } from "./ActivityFeed";

/* =========================
   TYPES
========================= */

export type MemberStatus = "online" | "offline" | "away";
export type MemberMood =
    | "focused"
    | "creative"
    | "coffee"
    | "energetic"
    | "thoughtful";

export type TeamMemberType = {
    id: number;
    name: string;
    role: string;
    avatar: string;
    initials: string;
    status: MemberStatus;
    commitsToday: number;
    isLead: boolean;
    mood: MemberMood;
    lastSeen: string;
};

/* =========================
   HELPERS
========================= */

const getStatusConfig = (status: MemberStatus) => {
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

const getMoodIcon = (mood: MemberMood) => {
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

const moods: MemberMood[] = [
    "focused",
    "creative",
    "coffee",
    "energetic",
    "thoughtful",
];

/* =========================
   COMPONENT
========================= */

export const TeamSection = () => {
    const [teamMembers, setTeamMembers] = useState<TeamMemberType[]>([]);
    const [email, setEmail] = useState("");

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        if (storedEmail) setEmail(storedEmail);
    }, []);

    useEffect(() => {
        if (!email) return;

        const fetchTeamMembers = async () => {
            try {
                const res = await axios.post(
                    process.env.NEXT_PUBLIC_BACKEND_URL + "/api/User/GetOwnerUsers",
                    { email },
                    { withCredentials: true }
                );

                const data: UserType[] = res.data ?? [];

                const transformed: TeamMemberType[] = data.map((item, index) => {
                    const mood =
                        moods[Math.floor(Math.random() * moods.length)];

                    return {
                        id: index + 1,
                        name: item.userName || `User ${index + 1}`,
                        role: item.role || "Developer",
                        avatar: "",
                        initials: item.userName
                            ? item.userName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                            : "UK",
                        status: "online",
                        commitsToday: Math.floor(Math.random() * 10),
                        isLead: item.role === "Admin",
                        mood,
                        lastSeen: "Active now",
                    };
                });

                setTeamMembers(transformed);
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data?.message || error.message);
                } else {
                    toast.error("Unknown error");
                }
            }
        };

        fetchTeamMembers();
    }, [email]);

    const onlineCount = teamMembers.filter(
        (m) => m.status === "online"
    ).length;

    return (
        <Card className="w-full relative overflow-hidden p-6 bg-neutral-900 border border-gray-600/50">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-green-500" />
                    <span>Team Members</span>
                </CardTitle>

                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-600">
                        {onlineCount} online
                    </Badge>
                    <Badge variant="outline" className="text-blue-600">
                        {teamMembers.length} total
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-3">
                {teamMembers.length ? (
                    teamMembers.map((member, index) => {
                        const statusConfig = getStatusConfig(member.status);
                        const StatusIcon = statusConfig.icon;
                        const MoodIcon = getMoodIcon(member.mood);

                        return (
                            <div
                                key={member.id}
                                className="flex items-center gap-4 p-4 rounded-xl border border-gray-700/50"
                                style={{ animationDelay: `${index * 75}ms` }}
                            >
                                <div className="relative">
                                    <Avatar className="w-12 h-12">
                                        {member.avatar ? (
                                            <AvatarImage src={member.avatar} alt={member.name} />
                                        ) : (
                                            <AvatarFallback>{member.initials}</AvatarFallback>
                                        )}
                                    </Avatar>

                                    <StatusIcon
                                        className={`absolute -bottom-1 -right-1 w-4 h-4 text-${statusConfig.color} ${statusConfig.pulse ? "animate-pulse" : ""
                                            }`}
                                    />

                                    {member.isLead && (
                                        <Crown className="absolute -top-2 -right-2 w-4 h-4 text-yellow-400" />
                                    )}
                                </div>

                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-sm">
                                            {member.name}
                                        </span>

                                        {member.isLead && (
                                            <Badge
                                                variant="outline"
                                                className="text-yellow-400 text-xs"
                                            >
                                                Lead
                                            </Badge>
                                        )}

                                        <span className="text-xs">
                                            {typeof MoodIcon === "string" ? (
                                                MoodIcon
                                            ) : (
                                                <MoodIcon className="w-3 h-3 text-muted-foreground" />
                                            )}
                                        </span>
                                    </div>

                                    <div className="text-xs text-muted-foreground">
                                        {member.role} • {member.lastSeen}
                                    </div>
                                </div>

                                <div className="text-right">
                                    <Badge
                                        variant="outline"
                                        className={`text-${statusConfig.color}`}
                                    >
                                        {member.status}
                                    </Badge>

                                    <div className="text-xs text-muted-foreground">
                                        <span className="font-medium text-blue-400">
                                            {member.commitsToday}
                                        </span>{" "}
                                        commits today
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-16 text-gray-400">
                        <Users className="w-12 h-12 mx-auto mb-4" />
                        <p>No team members found</p>
                    </div>
                )}

                <Button
                    variant="outline"
                    className="w-full border-dashed mt-2"
                >
                    <Users className="w-4 h-4 mr-2" />
                    Invite Team Member
                </Button>
            </CardContent>
        </Card>
    );
};
