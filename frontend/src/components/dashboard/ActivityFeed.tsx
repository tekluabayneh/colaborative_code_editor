"use client";

import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { LucideIcon, User, GitCommit, FileEdit, MessageSquare, GitPullRequest, Zap, Clock } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* =========================
   TYPES
========================= */

export type UserType = {
    _id: string;
    userName: string;
    email: string;
    password: string;
    role: string;
    invitedBy: string;
    createdAt: Date;
};

export type ActivityFeedType = {
    id: number;
    userName: string;
    email: string;
    role: string;
    invitedBy: string;
    createdAt: Date;

    type: "commit" | "edit" | "pr" | "comment";
    action: string;
    target: string;
    icon: LucideIcon;
    color: string;
    priority: "high" | "medium" | "low";
    time: string;
};

type ActivityKind = ActivityFeedType["type"];
type Priority = ActivityFeedType["priority"];

/* =========================
   HELPERS
========================= */

const getPriorityIcon = (priority: Priority) => {
    switch (priority) {
        case "high":
            return Zap;
        case "medium":
            return Clock;
        default:
            return Clock;
    }
};

const getPriorityColor = (priority: Priority) => {
    switch (priority) {
        case "high":
            return "red-500";
        case "medium":
            return "orange-500";
        default:
            return "white";
    }
};

/* =========================
   STATIC MAPS
========================= */

const activityTypes: ActivityKind[] = ["commit", "edit", "pr", "comment"];
const priorities: Priority[] = ["high", "medium", "low"];

const actions: Record<ActivityKind, string> = {
    commit: "committed",
    edit: "edited",
    pr: "opened pull request",
    comment: "commented on",
};

const colors: Record<ActivityKind, string> = {
    commit: "green-500",
    edit: "blue-500",
    pr: "purple-500",
    comment: "orange-500",
};

const icons: Record<ActivityKind, LucideIcon> = {
    commit: GitCommit,
    edit: FileEdit,
    pr: GitPullRequest,
    comment: MessageSquare,
};

/* =========================
   COMPONENT
========================= */

export const ActivityFeed = () => {
    const [email, setEmail] = useState("");
    const [activities, setActivities] = useState<ActivityFeedType[]>([]);

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        if (storedEmail) setEmail(storedEmail);
    }, []);

    useEffect(() => {
        if (!email) return;

        const getAllOwnerUsers = async () => {
            try {
                const res = await axios.post(
                    "http://localhost:5000/api/User/GetOwnerUsers",
                    { email },
                    { withCredentials: true }
                );

                const data: UserType[] = res.data;

                const enriched: ActivityFeedType[] = data.map((item, index) => {
                    const type =
                        activityTypes[Math.floor(Math.random() * activityTypes.length)];

                    const priority =
                        priorities[Math.floor(Math.random() * priorities.length)];

                    return {
                        id: index + 1,
                        userName: item.userName,
                        email: item.email,
                        role: item.role,
                        invitedBy: item.invitedBy,
                        createdAt: item.createdAt,

                        target: "No description",
                        type,
                        action: actions[type],
                        icon: icons[type],
                        color: colors[type],
                        priority,
                        time: `${Math.floor(Math.random() * 60) + 1} minutes ago`,
                    };
                });

                setActivities(enriched);
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data?.message || error.message);
                } else {
                    toast.error("Unknown error");
                }
            }
        };

        getAllOwnerUsers();
    }, [email]);

    return (
        <Card className="relative overflow-hidden border border-gray-600/50 bg-neutral-900">
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span>Live Activity Feed</span>
                    <Badge variant="outline" className="text-green-500">
                        Real-time
                    </Badge>
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
                {activities.length ? (
                    activities.map((activity) => {
                        const PriorityIcon = getPriorityIcon(activity.priority);

                        return (
                            <div
                                key={activity.id}
                                className="flex items-start gap-4 p-4 rounded-xl border border-gray-700/50"
                            >
                                <Avatar className="w-10 h-10">
                                    <User className="w-6 h-6 text-gray-400" />
                                </Avatar>

                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-semibold text-sm">
                                            {activity.userName}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            {activity.action}
                                        </span>

                                        <Badge
                                            variant="outline"
                                            className={`text-${activity.color}`}
                                        >
                                            {activity.type}
                                        </Badge>

                                        <div
                                            className={`flex items-center gap-1 text-${getPriorityColor(
                                                activity.priority
                                            )}`}
                                        >
                                            <PriorityIcon className="w-3 h-3" />
                                            <span className="text-xs capitalize">
                                                {activity.priority}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-sm">{activity.target}</p>

                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Clock className="w-3 h-3" />
                                        <span>{activity.time}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-center text-gray-500 py-12">
                        No live activity
                    </p>
                )}
            </CardContent>
        </Card>
    );
};
