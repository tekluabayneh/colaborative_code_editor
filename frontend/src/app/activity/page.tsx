"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Activity as ActivityIcon,
    Home,
    User,
    Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ActivityItem from "../../components/activity/ActivityItem";
import CollaboratorSidebar from "../../components/activity/CollaboratorSidebar";
import LiveIndicator from "../../components/activity/LiveIndicator";
import ActivityStats from "../../components/activity/ActivityStats";

type activittype = {
    id: string
    type: string
    title: string
    collaborator_name: string,
    is_live?: boolean,
    created_date?: string,
    description?: string,
    file_path?: string,
    name: string,
    language?: string,
    lines_added?: number,
    lines_removed?: number,
    branch: string,
    updatedAt?: string,
    createdAt?: string,
    avatar?: string
}

const Files = [
    {
        _id: "2323412",
        type: "commit",
        title: "feat: Add real-time collaboration features",
        description:
            "Implemented live cursor tracking and user presence indicators",
        file_path: "src/components/Editor.tsx",
        name: "Alex Rivera",
        language: "typescript",
        lines_added: 127,
        lines_removed: 23,
        branch: "feature/collaboration",
        createdAt: new Date("2025-09-01T10:30:00"),
        updatedAt: new Date("2025-09-05T14:45:00"),
    },
    {
        _id: "23234das",
        type: "file_edit",
        title: "Update component styling",
        description: "Enhanced dark theme support and improved accessibility",
        file_path: "src/styles/editor.css",
        name: "Sarah Chen",
        language: "css",
        lines_added: 45,
        lines_removed: 12,
        branch: "main",
        createdAt: new Date("2025-09-01T10:30:00"),
        updatedAt: new Date("2025-09-05T14:45:00"),
    },
    {
        _id: "23234dasds",
        type: "comment",
        title: "Code review feedback",
        description: "Suggested improvements for the collaboration algorithm",
        file_path: "src/utils/collaboration.js",
        name: "Marcus Johnson",
        language: "javascript",
        branch: "feature/collaboration",
        createdAt: new Date("2025-09-01T10:30:00"),
        updatedAt: new Date("2025-09-05T14:45:00"),
    },
    {
        _id: "23234",
        type: "branch_create",
        title: "Created new feature branch",
        description: "Starting work on syntax highlighting improvements",
        collaborator_name: "Emma Davis",
        branch: "feature/syntax-highlighting",
        createdAt: new Date("2025-09-01T10:30:00"),
        updatedAt: new Date("2025-09-05T14:45:00"),
    },
    {
        _id: "2323442344",
        type: "merge",
        title: "Merged PR #247",
        description: "Performance optimizations for large files",
        file_path: "src/core/parser.py",
        name: "David Kim",
        language: "python",
        lines_added: 89,
        lines_removed: 156,
        branch: "main",
        createdAt: new Date("2025-09-01T10:30:00"),
        updatedAt: new Date("2025-09-05T14:45:00"),
    },
    {
        _id: "2324",
        type: "file_edit",
        title: "Refactor authentication logic",
        description: "Simplified user session management",
        file_path: "src/auth/session.js",
        name: "Lisa Wang",
        language: "javascript",
        lines_added: 34,
        lines_removed: 67,
        branch: "main",
        createdAt: new Date("2025-09-01T10:30:00"),
        updatedAt: new Date("2025-09-05T14:45:00"),
    },
    {
        _id: "232342",
        type: "commit",
        title: "fix: Resolve memory leak in websocket connection",
        description: "Fixed issue causing connection cleanup failures",
        file_path: "src/websocket/client.ts",
        name: "James Wilson",
        language: "typescript",
        lines_added: 18,
        lines_removed: 8,
        branch: "hotfix/websocket-leak",
        createdAt: new Date("2025-09-01T10:30:00"),
        updatedAt: new Date("2025-09-05T14:45:00"),
    },
    {
        _id: "23234234",
        type: "comment",
        title: "Documentation update needed",
        description: "API endpoints need better documentation",
        file_path: "docs/api.md",
        name: "Anna Rodriguez",
        branch: "main",
        createdAt: new Date("2025-09-01T10:30:00"),
        updatedAt: new Date("2025-09-05T14:45:00"),

    },
];

const tabs = [
    { value: "all", label: "All" },
    { value: "commit", label: "Commits" },
    { value: "file_edit", label: "Edits" },
    { value: "comment", label: "Comments" },
];

export default function ActivityPage() {
    const [activities, setActivities] = useState<activittype[]>([]);
    const [filteredActivities, setFilteredActivities] = useState<activittype[]>([]);
    const [activeFilter, setActiveFilter] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [liveActivities, setLiveActivities] = useState<activittype[]>([]);

    console.log("con con", setSearchQuery)
    const filterActivities = useCallback(() => {
        let filtered = activities;

        if (activeFilter !== "all") {
            filtered = filtered.filter((activity) => activity.type === activeFilter);
        }

        if (searchQuery) {
            filtered = filtered.filter(
                (activity) =>
                    activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    activity.file_path
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    activity?.collaborator_name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
            );
        }

        setFilteredActivities(filtered);
    }, [activities, activeFilter, searchQuery]);

    useEffect(() => {
        loadActivities();
        const interval = setInterval(simulateLiveActivity, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        filterActivities();
    }, [filterActivities]);

    const loadActivities = async () => {
        setIsLoading(true);
        try {
            setActivities(Files);
        } catch (error) {
            console.error("Error loading activities:", error);
        }
        setIsLoading(false);
    };

    const simulateLiveActivity = () => {
        const liveActivity = {
            id: `live - ${Date.now()} `,
            type: "collaboration",
            title: "Live editing in progress",
            collaborator_name: "Sarah Chen",
            file_path: "src/components/Editor.tsx",
            is_live: true,
            created_date: new Date().toISOString(),
        };

        setLiveActivities((prev) => [liveActivity, ...prev.slice(0, 2)]);
        setTimeout(() => {
            setLiveActivities((prev) => prev.filter((a) => a.id !== liveActivity.id));
        }, 4000);
    };

    const getCollaborators = () => {
        const collaborators = {};
        activities.forEach((activity) => {
            if (!collaborators[activity.name]) {
                collaborators[activity.name] = {
                    name: activity.name,
                    avatar:
                        activity.avatar ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.collaborator_name}`,
                    lastActive: activity.createdAt,
                    isOnline: Math.random() > 0.3,
                };
            }
        });
        return Object.values(collaborators);
    };

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />

            <div className="relative flex h-screen">
                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Header */}
                    <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-10">
                        <div className="px-6 py-4">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                        <ActivityIcon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold text-white">
                                            Development Activity
                                        </h1>
                                        <p className="text-gray-400 text-sm">
                                            Real-time collaboration insights
                                        </p>
                                    </div>
                                </div>
                                <LiveIndicator count={liveActivities.length} />
                            </div>

                            {/* Controls */}
                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                    <Link
                                        href={"/dashboard"}
                                        className="flex items-center gap-3 text-gray-700 hover:text-white hover:bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg transition-all duration-300"
                                    >
                                        <Home className="w-5 h-5" />
                                    </Link>
                                    <Link
                                        href={"/profile"}
                                        className="flex items-center gap-3 text-gray-700 hover:text-white hover:bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg transition-all duration-300"
                                    >
                                        <User className="w-5 h-5" />
                                    </Link>
                                    <Link
                                        href={"/admin"}
                                        className="flex items-center gap-3 text-gray-700 hover:text-white hover:bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg transition-all duration-300"
                                    >
                                        <Users className="w-5 h-5" />
                                    </Link>
                                </div>

                                <div className="w-full sm:w-auto">
                                    <div className="flex bg-gray-900/50 border border-gray-700 w-full sm:w-auto rounded">
                                        {tabs.map((tab) => (
                                            <button
                                                key={tab.value}
                                                onClick={() => setActiveFilter(tab.value)}
                                                className={`px-4 py-2 flex-1 text-center ${activeFilter === tab.value
                                                    ? "bg-gray-700 text-white"
                                                    : "text-gray-300 hover:bg-gray-800"
                                                    }`}
                                            >
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Stats */}
                    <ActivityStats activities={activities} />

                    {/* Activity Feed */}
                    <div className="flex-1 overflow-auto">
                        <div className="p-6">
                            {/* Live Activities */}
                            <AnimatePresence>
                                {liveActivities.map((activity) => (
                                    <motion.div
                                        key={activity.id}
                                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                        className="mb-4"
                                    >
                                        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-xl p-4 backdrop-blur-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="w-6 h-6">
                                                        <AvatarImage
                                                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.collaborator_name}`}
                                                        />
                                                        <AvatarFallback>{activity.name}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-white font-medium">
                                                        {activity.name}
                                                    </span>
                                                </div>
                                                <span className="text-gray-300">is editing</span>
                                                <code className="text-blue-400 bg-gray-800/50 px-2 py-1 rounded text-sm">
                                                    {activity.file_path}
                                                </code>
                                                <span className="text-green-400 text-sm font-medium">
                                                    LIVE
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Activity List */}
                            <div className="space-y-2">
                                <AnimatePresence>
                                    {isLoading
                                        ? Array(6)
                                            .fill(0)
                                            .map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="bg-gray-900/40 rounded-xl p-6 animate-pulse"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-gray-700 rounded-xl" />
                                                        <div className="flex-1">
                                                            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />
                                                            <div className="h-3 bg-gray-800 rounded w-1/2" />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        : filteredActivities.map((activity, index) => (
                                            <ActivityItem
                                                key={activity.id}
                                                activity={activity}
                                                index={index}
                                            />
                                        ))}
                                </AnimatePresence>
                            </div>

                            {!isLoading && filteredActivities.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <ActivityIcon className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-300 mb-2">
                                        No activities found
                                    </h3>
                                    <p className="text-gray-500">
                                        Try adjusting your filters or search query
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Collaborator Sidebar */}
                <CollaboratorSidebar collaborators={getCollaborators()} />
            </div>
        </div>
    );
}
