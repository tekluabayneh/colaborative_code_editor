"use client";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import {
  FileText,
  Image,
  Video,
  Music,
  Archive,
  Code,
  File as FileIcon,
  Download,
  ExternalLink,
  Calendar,
  User,
  HardDrive,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import axios from "axios";
type DocumentType = {
  _id: string;
  content: string;
  language: string;
  name: string;
  ownerType: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
};

const File = [
  {
    _id: "1",
    name: "ProjectProposal.docx",
    content: "This is a proposal for a new project...",
    language: "English",
    ownerType: "user",
    ownerId: "user1",
    createdAt: new Date("2025-09-01T10:30:00"),
    updatedAt: new Date("2025-09-05T14:45:00"),
  },
  {
    _id: "2",
    name: "MeetingNotes.txt",
    content: "Notes from today's meeting about product launch...",
    language: "English",
    ownerType: "user",
    ownerId: "user2",
    createdAt: new Date("2025-08-28T09:15:00"),
    updatedAt: new Date("2025-09-02T11:00:00"),
  },
  {
    _id: "3",
    name: "Budget.xlsx",
    content: "Budget breakdown for Q3 2025...",
    language: "English",
    ownerType: "admin",
    ownerId: "admin1",
    createdAt: new Date("2025-07-15T12:00:00"),
    updatedAt: new Date("2025-08-20T16:30:00"),
  },
  {
    _id: "4",
    name: "DesignMockup.png",
    content: "Initial design mockups for mobile app...",
    language: "Visual",
    ownerType: "user",
    ownerId: "user3",
    createdAt: new Date("2025-08-05T08:45:00"),
    updatedAt: new Date("2025-08-25T10:15:00"),
  },
  {
    _id: "5",
    name: "CodeSnippet.js",
    content: "function greet(name) { return `Hello ${name}`; }",
    language: "JavaScript",
    ownerType: "user",
    ownerId: "user1",
    createdAt: new Date("2025-09-03T13:20:00"),
    updatedAt: new Date("2025-09-04T09:50:00"),
  },
];

export default function Files() {
  const [files, setFiles] = useState<DocumentType[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<DocumentType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    setIsLoading(true);
    try {
      //   const res = await axios.get("");
      //   if (res.data) return;
      setFiles(File);
    } catch (error) {
      console.error("Error loading files:", error);
    }
    setIsLoading(false);
  };

  const filterFiles = useCallback(() => {
    let filtered = files;

    if (searchTerm) {
      filtered = filtered.filter((file) =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredFiles(filtered);
  }, [searchTerm, files]);

  useEffect(() => {
    filterFiles();
  }, [filterFiles]);

  const getFileIcon = (fileType: string) => {
    const iconProps = { className: "w-8 h-8" };
    switch (fileType) {
      case "image":
        return <Image {...iconProps} className="w-8 h-8 text-emerald-400" />;
      case "document":
        return <FileText {...iconProps} className="w-8 h-8 text-blue-400" />;
      case "video":
        return <Video {...iconProps} className="w-8 h-8 text-red-400" />;
      case "audio":
        return <Music {...iconProps} className="w-8 h-8 text-purple-400" />;
      case "archive":
        return <Archive {...iconProps} className="w-8 h-8 text-orange-400" />;
      case "code":
        return <Code {...iconProps} className="w-8 h-8 text-green-400" />;
      default:
        return <FileIcon {...iconProps} className="w-8 h-8 text-gray-400" />;
    }
  };

  const FileCard = ({ file }: { file: DocumentType }) => (
    <div className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/70 hover:border-gray-600/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-gray-900/30">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-700/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gray-900/50 border border-gray-600/30">
              {getFileIcon(file.language)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium truncate group-hover:text-blue-300 transition-colors">
                {file.name}
              </h3>
              <Badge
                className={`mt-1 text-xs "bg-blue-500/20 text-blue-300 border-blue-500/30 border`}
              >
                {file.language?.toUpperCase()}
              </Badge>
            </div>
          </div>

          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="icon"
              variant="ghost"
              className="w-8 h-8 text-gray-400 hover:text-white hover:bg-gray-700/50"
              onClick={() => window.open("_blank")}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="w-8 h-8 text-gray-400 hover:text-white hover:bg-gray-700/50"
              onClick={() => {
                const blob = new Blob([file.content], {
                  type: "application/json",
                });
                const url = URL.createObjectURL(blob);

                const link = document.createElement("a");
                link.href = url;
                link.download = file.name;
                link.click();

                URL.revokeObjectURL(url);
              }}
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2 text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <HardDrive className="w-3 h-3" />
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{format(new Date(file.createdAt), "MMM d, yyyy")}</span>
            </div>
          </div>

          {file.updatedAt && (
            <div className="flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span>{file.ownerType}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="container mx-auto px-6 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-700/50 rounded-lg w-1/3"></div>
            <div className="h-12 bg-gray-700/50 rounded-lg w-full"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="h-48 bg-gray-700/50 rounded-xl"></div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header Section */}
      <div className="border-b border-gray-700/50 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                Team Files
              </h1>
              <p className="text-gray-400">{filteredFiles.length} files • </p>
            </div>

            <Link
              href="/dashboard"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg cursor-pointer transition-colors duration-300"
            >
              Go to Dashboard
            </Link>
          </div>
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search files by name or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {filteredFiles.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-800/50 flex items-center justify-center">
              <FileIcon className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No files found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 cursor-pointer md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFiles.map((file) => (
              <FileCard key={file._id} file={file} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
