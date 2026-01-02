"use client";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon, User } from "lucide-react";
import {
    GitCommit,
    FileEdit,
    MessageSquare,
    GitPullRequest,
    Zap,
    Clock,
} from "lucide-react";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const getPriorityIcon = (priority: string) => {
    switch (priority) {
        case "high":
            return Zap;
        case "medium":
            return Clock;
        default:
            return Clock;
    }
};

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case "high":
            return "red-500";
        case "medium":
            return "orange-500";
        default:
            return "white";
    }
};

export const ActivityFeed = () => {
    const [email, setEmail] = useState("");
    const [activities, setActivities] = useState([]);

    // Load email from localStorage
    useEffect(() => {
        const getEmail = localStorage.getItem("email");
        if (!getEmail) return;
        setEmail(getEmail);
    }, []);

    // Fetch minimal data from backend and enrich it
    const getAllOwnerUsers = async () => {
        if (!email) return;

        try {
            const res = await axios.post(
                "http://localhost:5000/api/User/GetOwnerUsers",
                { email },
                { withCredentials: true }
            );

            const data = res.data;

            const types = ["commit", "edit", "pr", "comment"];
            const actions: Record<string, string> = {
                commit: "committed",
                edit: "edited",
                pr: "opened pull request",
                comment: "commented on",
            };
            const colors: Record<string, string> = {
                commit: "green-500",
                edit: "blue-500",
                pr: "purple-500",
                comment: "orange-500",
            };
            const icons: Record<string, LucideIcon> = {
                commit: GitCommit,
                edit: FileEdit,
                pr: GitPullRequest,
                comment: MessageSquare,
            };
            const priorities = ["high", "medium", "low"];

            const enrichedData = data.map((item, index: number) => {
                const type = types[Math.floor(Math.random() * types.length)];

                return {
                    id: index + 1,
                    ...item,
                    target: item.task || item.target || "No description",
                    type,
                    action: actions[type],
                    icon: icons[type],
                    color: colors[type],
                    priority: priorities[Math.floor(Math.random() * priorities.length)],
                    time: `${Math.floor(Math.random() * 60) + 1} minutes ago`,
                };
            });

            setActivities(enrichedData);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || error.message);
            } else {
                toast.error("unknown");
            }
        }
    };

    useEffect(() => {
        getAllOwnerUsers();
    },);

    return (
        <Card className="relative overflow-hidden border border-gray-600/50 bg-neutral-900">
            <div className="absolute inset-0 bg-gradient-mesh opacity-40" />

            <CardHeader className="relative">
                <CardTitle className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-slow"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
                    </div>
                    <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                        Live Activity Feed
                    </span>
                    <Badge
                        variant="outline"
                        className="text-green-500 border-code-green/30 bg-green-500/5"
                    >
                        Real-time
                    </Badge>
                </CardTitle>
            </CardHeader>

            <CardContent className="relative space-y-2">
                {activities.length ? (
                    activities.map((activity, index) => {
                        const Icon = activity.icon;
                        const PriorityIcon = getPriorityIcon(activity.priority);

                        return (
                            <div
                                key={activity.id}
                                className={`
                  relative flex items-start gap-4 p-4 rounded-xl 
                  bg-gradient-to-r from-transparent via-${activity.color}/5 to-transparent
                  hover:from-${activity.color}/10 hover:via-${activity.color}/5 hover:to-transparent
                  transition-all duration-500 group cursor-pointer
                  border border-transparent hover:border-${activity.color}/20
                  animate-slide-up
                `}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div
                                    className={`absolute left-0 top-0 bottom-0 w-1 bg-${getPriorityColor(
                                        activity.priority
                                    )} rounded-r-full opacity-60`}
                                />

                                <div className="relative">
                                    <Avatar className="w-10 h-10 ring-2 ring-border/50 group-hover:ring-primary/50 transition-all duration-300">
                                        <User className="w-12 h-12 text-gray-400" />
                                    </Avatar>

                                    <div
                                        className={`absolute -bottom-1 -right-1 w-4 h-4 bg-${activity.color} rounded-full border-2 border-background flex items-center justify-center`}
                                    />
                                </div>

                                <div className="flex-1 min-w-0 space-y-2">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-semibold text-sm group-hover:text-primary transition-colors">
                                            {activity.userName}
                                        </span>
                                        <span className="text-muted-foreground text-sm">
                                            {activity?.action}
                                        </span>

                                        <div className="flex items-center gap-2">
                                            <Badge
                                                variant="outline"
                                                className={`
                          text-${activity.color} border-${activity.color}/30 bg-${activity.color}/10
                          group-hover:bg-${activity.color}/20 transition-all duration-300
                        `}
                                            >
                                                {activity?.type}
                                            </Badge>

                                            <div
                                                className={`flex items-center gap-1 px-2 py-0.5 rounded-full bg-${getPriorityColor(
                                                    activity?.priority
                                                )}/10`}
                                            >
                                                <PriorityIcon
                                                    className={`w-2.5 h-2.5 text-${getPriorityColor(
                                                        activity?.priority
                                                    )}`}
                                                />
                                                <span
                                                    className={`text-xs text-${getPriorityColor(
                                                        activity?.priority
                                                    )} capitalize`}
                                                >
                                                    {activity?.priority}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-sm text-foreground/90 group-hover:text-foreground transition-colors font-medium">
                                        {activity?.target}
                                    </p>

                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Clock className="w-3 h-3" />
                                        <span>{activity?.time}</span>
                                    </div>
                                </div>

                                <div
                                    className={`absolute inset-0 bg-${activity?.color}/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                                />
                            </div>
                        );
                    })
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-12 h-12 mb-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m4 4v-4h-1m4 4v-4h-1M3 7h18M3 12h18M3 17h18"
                            />
                        </svg>
                        <p className="text-center text-gray-500 text-lg">
                            No live activity
                        </p>
                    </div>
                )}

                <div className="pt-4">
                    <div className="text-center">
                        <button className="text-sm text-code-blue hover:text-code-blue/80 font-medium transition-colors duration-300">
                            View all activity →
                        </button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
