"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import {
  FileText,
  Folder,
  ExternalLink,
  Clock,
  Star,
  GitBranch,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

//   {
//     id: 5,
//     name: "api.config.json",
//     path: "src/config/",
//     lastModified: "2 days ago",
//     type: "json",
//     size: "945 B",
//     status: "stable",
//     commits: 5,
//     starred: false
//   }

const getFileTypeColor = (type: string) => {
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
    default:
      return "muted-foreground";
  }
};

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

export const RecentFiles = () => {
  const [recentFiles, setRecentFile] = useState([]);
  const [email, setemail] = useState("");

  useEffect(() => {
    const getEmail = localStorage.getItem("email");
    if (!getEmail) return;
    setemail(getEmail);
  }, []);

  useEffect(() => {
    if (!email) return;

    async function FetchFile() {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/doc/GetOnlyDocument",
          { email: email },
          { withCredentials: true }
        );
        setRecentFile(response.data.slice(0, 5));
      } catch (error: any) {
        console.log(error);
      }
    }
    FetchFile();
  }, [email]);

  return (
    <Card className="w-full relative overflow-hidden bg-gradient-to-b border border-gray-700/50 bg-neutral-900 group">
      {/* Background effects */}
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
          <Link href="/files"> View All </Link>
          <ExternalLink className="w-4 h-4 ml-1" />
        </Button>
      </CardHeader>

      <CardContent className="relative space-y-2">
        {recentFiles.length > 0 ? (
          recentFiles.map((file, index) => {
            const statusConfig = getStatusConfig("stable");

            return (
              <div
                key={file._id}
                className={`
          relative flex items-center gap-4 p-4 rounded-xl 
          bg-gradient-to-r from-transparent via-${getFileTypeColor(
            file.language.split(".")[1]
          )}/5 to-transparent
          hover:from-${getFileTypeColor(
            file.language.split(".")[1]
          )}/10 hover:via-${getFileTypeColor(
                  file.language.split(".")[1]
                )}/5 hover:to-transparent
          transition-all duration-500 group/item cursor-pointer
          border border-transparent hover:border-${getFileTypeColor(
            file.language.split(".")[1]
          )}/20
          animate-slide-up
        `}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* File type indicator */}
                <div
                  className={`p-2 rounded-lg bg-${getFileTypeColor(
                    file.language.split(".")[1]
                  )}/10 border border-${getFileTypeColor(
                    file.language.split(".")[1]
                  )}/20 group-hover/item:scale-110 transition-transform duration-300`}
                >
                  <FileText
                    className={`w-4 h-4 text-${getFileTypeColor(
                      file.language.split(".")[1]
                    )}`}
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate group-hover/item:text-primary transition-colors">
                      {file.name}
                    </span>

                    {file.starred && (
                      <Star className="w-3 h-3 text-code-yellow fill-current" />
                    )}

                    <Badge
                      variant="outline"
                      className={`
                text-xs text-${statusConfig.color} border-${statusConfig.color}/30 bg-${statusConfig.color}/10
                group-hover/item:bg-${statusConfig.color}/20 transition-all duration-300
              `}
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
                      <span>{file.updateAt} commits</span>
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{file.updateAt}</span>
                  </div>
                  <div className="text-xs font-medium text-muted-foreground/70">
                    {Math.floor(Math.random() * 500)}Mb
                  </div>
                </div>

                {/* Hover glow */}
                <div
                  className={`absolute inset-0 bg-${getFileTypeColor(
                    file.language.split(".")[1]
                  )}/5 rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 pointer-events-none`}
                />
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
            <Folder className="w-10 h-10 mb-2 text-muted-foreground/70" />
            <p className="text-sm font-medium">No recent files found</p>
            <p className="text-xs text-muted-foreground/70">
              Start by creating or uploading a file
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
