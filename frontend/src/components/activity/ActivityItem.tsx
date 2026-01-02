import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    GitCommit,
    FileText,
    MessageSquare,
    GitBranch,
    GitMerge,
    Users,
    Plus,
    Minus,
    Clock,
} from "lucide-react";

const activityIcons = {
    commit: GitCommit,
    file_edit: FileText,
    comment: MessageSquare,
    branch_create: GitBranch,
    merge: GitMerge,
    collaboration: Users,
};

const activityColors = {
    commit: "from-green-500/20 to-green-600/20 border-green-500/30",
    file_edit: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
    comment: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
    branch_create: "from-yellow-500/20 to-yellow-600/20 border-yellow-500/30",
    merge: "from-orange-500/20 to-orange-600/20 border-orange-500/30",
    collaboration: "from-pink-500/20 to-pink-600/20 border-pink-500/30",
};

const languageColors = {
    javascript: "bg-yellow-500",
    typescript: "bg-blue-500",
    python: "bg-green-500",
    css: "bg-purple-500",
    html: "bg-orange-500",
    json: "bg-gray-500",
};

export default function ActivityItem({ activity, index }) {
    const Icon = activityIcons[activity.type] || FileText;
    const colorClass = activityColors[activity.type] || activityColors.file_edit;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`bg-gradient-to-r ${colorClass} backdrop-blur-sm rounded-xl p-6 hover:scale-[1.01] transition-transform duration-200`}
        >
            <div className="flex items-start gap-4">
                {/* Activity Icon */}
                <div className="w-12 h-12 bg-gray-800/50 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-700">
                    <Icon className="w-6 h-6 text-gray-300" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                            <h3 className="text-white font-semibold mb-1">
                                {activity.title}
                            </h3>
                            {activity.description && (
                                <p className="text-gray-400 text-sm mb-2">
                                    {activity.description}
                                </p>
                            )}

                            <div className="flex items-center gap-2 flex-wrap">
                                <div className="flex items-center gap-2">
                                    <Avatar className="w-6 h-6">
                                        <AvatarImage
                                            src={
                                                activity.collaborator_avatar ||
                                                `https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.name}`
                                            }
                                        />
                                        <AvatarFallback className="text-xs">
                                            {activity.name}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-gray-300 text-sm font-medium">
                                        {activity.name}
                                    </span>
                                </div>

                                {activity.file_path && (
                                    <>
                                        <span className="text-gray-500">•</span>
                                        <code className="text-blue-400 bg-gray-800/50 px-2 py-1 rounded text-sm">
                                            {activity.file_path}
                                        </code>
                                    </>
                                )}

                                {activity.language && (
                                    <Badge
                                        className={`${languageColors[activity.language]
                                            } text-white border-0 text-xs`}
                                    >
                                        {activity.language}
                                    </Badge>
                                )}

                                {activity.branch && (
                                    <Badge
                                        variant="outline"
                                        className="border-gray-600 text-gray-300 text-xs"
                                    >
                                        <GitBranch className="w-3 h-3 mr-1" />
                                        {activity.branch}
                                    </Badge>
                                )}
                            </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                            <div className="flex items-center gap-1 text-gray-400 text-sm mb-1">
                                <Clock className="w-3 h-3" />
                                {/* {format(new Date(activity.created_date), "MMM d, h:mm a")} */}
                            </div>

                            {(activity.lines_added || activity.lines_removed) && (
                                <div className="flex items-center gap-2 text-xs">
                                    {activity.lines_added > 0 && (
                                        <span className="text-green-400 flex items-center gap-1">
                                            <Plus className="w-3 h-3" />
                                            {activity.lines_added}
                                        </span>
                                    )}
                                    {activity.lines_removed > 0 && (
                                        <span className="text-red-400 flex items-center gap-1">
                                            <Minus className="w-3 h-3" />
                                            {activity.lines_removed}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
