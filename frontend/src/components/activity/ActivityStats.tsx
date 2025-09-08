import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GitCommit, FileText, MessageSquare, TrendingUp } from "lucide-react";

export default function ActivityStats({ activities }) {
  const stats = {
    commits: activities.filter((a) => a.type === "commit").length,
    files: activities.filter((a) => a.type === "file_edit").length,
    comments: activities.filter((a) => a.type === "comment").length,
    totalLines: activities.reduce(
      (sum, a) => sum + (a.lines_added || 0) + (a.lines_removed || 0),
      0
    ),
  };

  const statItems = [
    {
      label: "Commits",
      value: stats.commits,
      icon: GitCommit,
      color: "text-green-400",
    },
    {
      label: "Files Changed",
      value: stats.files,
      icon: FileText,
      color: "text-blue-400",
    },
    {
      label: "Comments",
      value: stats.comments,
      icon: MessageSquare,
      color: "text-purple-400",
    },
    {
      label: "Lines Changed",
      value: stats.totalLines,
      icon: TrendingUp,
      color: "text-orange-400",
    },
  ];

  return (
    <div className="p-6 border-b border-gray-800">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statItems.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-900/40 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
