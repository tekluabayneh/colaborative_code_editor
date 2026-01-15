"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import { FileText, Folder, ExternalLink, Clock, Star, GitBranch } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

// File type color based on extension
const getFileTypeColor = (type: string | undefined) => {
    switch (type) {
        case "tsx":
        case "jsx":
            return "code-blue";
        case "ts":
            return "code-purple";
        case "css":
            return "code-green";
        case "json":
            return "code-orange";
        case "js":
            return "code-yellow";
        default:
            return "muted-foreground";
    }
};

// Status configuration
const getStatusConfig = (status: string) => {
    switch (status) {
        case "new":
            return { color: "code-green", icon: "✨", label: "New" };
        case "modified":
            return { color: "code-orange", icon: "📝", label: "Modified" };
        case "stable":
            return { color: "muted-foreground", icon: "✓", label: "Stable" };
        default:
            return { color: "muted-foreground", icon: "•", label: status };
    }
};

// Type matching API response
export type FileItemType = {
    id: string;           // from _id
    content: string;
    language: string;
    ownerType: "User" | "Owner";
    ownerId: string;
    createdAt: string;
    updatedAt: string;
    // optional UI fields
    size?: string;
    commits?: number;
    starred?: boolean;
};

export const RecentFiles = () => {
    const [recentFiles, setRecentFiles] = useState<FileItemType[]>([]);
    const [email, setEmail] = useState("");

    // Load email from localStorage
    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        if (storedEmail) setEmail(storedEmail);
    }, []);

    // Fetch recent files
    useEffect(() => {
        if (!email) return;

        const fetchFiles = async () => {
            try {
                const response = await axios.post(
                    process.env.BACKEND_BASEURL + "/api/doc/GetOnlyDocument",
                    { email },
                    { withCredentials: true }
                );

                const files: FileItemType[] = response.data.map((file: {
                    _id: string;
                    content: string;
                    language: string;
                    ownerType: "User" | "Owner";
                    ownerId: string;
                    createdAt: string;
                    updatedAt: string;
                }) => ({
                    id: file._id,
                    content: file.content,
                    language: file.language || "plaintext",
                    ownerType: file.ownerType,
                    ownerId: file.ownerId,
                    createdAt: file.createdAt,
                    updatedAt: file.updatedAt,
                    size: "1 KB", // optional mock value
                    commits: Math.floor(Math.random() * 10), // optional mock
                    starred: false, // optional default
                }));

                setRecentFiles(files.slice(0, 5));
            } catch (error) {
                console.error(error);
            }
        };

        fetchFiles();
    }, [email]);

    return (
        <Card className="w-full relative overflow-hidden bg-gradient-to-b border border-gray-700/50 bg-neutral-900 group">
            {/* Background effect */}
            <div className="absolute inset-0 bg-gradient-mesh opacity-30" />

            <CardHeader className="relative flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-code-blue" />
                    <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                        Recent Files
                    </span>
                </CardTitle>

                <Button
                    variant="ghost"
                    size="sm"
                    className="text-code-blue hover:text-code-blue hover:bg-code-blue/10 transition-all duration-300 group-hover:scale-105"
                >
                    <Link href="/files">View All</Link>
                    <ExternalLink className="w-4 h-4 ml-1" />
                </Button>
            </CardHeader>

            <CardContent className="relative space-y-2">
                {recentFiles.length > 0 ? (
                    recentFiles.map((file, index) => {
                        const ext = file.language.split(".")[1]; // safe: language always exists
                        const color = getFileTypeColor(ext);
                        const statusConfig = getStatusConfig("stable");

                        return (
                            <div
                                key={file.id}
                                className={`
                  relative flex items-center gap-4 p-4 rounded-xl 
                  bg-gradient-to-r from-transparent via-${color}/5 to-transparent
                  hover:from-${color}/10 hover:via-${color}/5 hover:to-transparent
                  transition-all duration-500 group/item cursor-pointer border border-transparent hover:border-${color}/20
                  animate-slide-up
                `}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {/* File type indicator */}
                                <div
                                    className={`p-2 rounded-lg bg-${color}/10 border border-${color}/20 group-hover/item:scale-110 transition-transform duration-300`}
                                >
                                    <FileText className={`w-4 h-4 text-${color}`} />
                                </div>

                                <div className="flex-1 min-w-0 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-sm truncate group-hover/item:text-primary transition-colors">
                                            {file.content.slice(0, 20)}{/* example: first 20 chars */}
                                        </span>

                                        {file.starred && <Star className="w-3 h-3 text-code-yellow fill-current" />}

                                        <Badge
                                            variant="outline"
                                            className={`text-xs text-${statusConfig.color} border-${statusConfig.color}/30 bg-${statusConfig.color}/10 group-hover/item:bg-${statusConfig.color}/20 transition-all duration-300`}
                                        >
                                            <span className="mr-1">{statusConfig.icon}</span>
                                            {statusConfig.label}
                                        </Badge>
                                    </div>

                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Folder className="w-3 h-3" />
                                            <span className="truncate">{file.language}</span>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <GitBranch className="w-3 h-3" />
                                            <span>{file.commits ?? 0} commits</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right space-y-1">
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Clock className="w-3 h-3" />
                                        <span>{new Date(file.updatedAt).toLocaleString()}</span>
                                    </div>
                                    <div className="text-xs font-medium text-muted-foreground/70">{file.size}</div>
                                </div>

                                {/* Hover glow */}
                                <div
                                    className={`absolute inset-0 bg-${color}/5 rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 pointer-events-none`}
                                />
                            </div>
                        );
                    })
                ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                        <Folder className="w-10 h-10 mb-2 text-muted-foreground/70" />
                        <p className="text-sm font-medium">No recent files found</p>
                        <p className="text-xs text-muted-foreground/70">Start by creating or uploading a file</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
