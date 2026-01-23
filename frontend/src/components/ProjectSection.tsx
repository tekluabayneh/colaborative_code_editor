"use client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import { Folder, ExternalLink, GitBranch, Star } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { DocumentType } from "@/app/files/page";

export function ProjectsSection() {
    const [email, setemail] = useState("");
    const [projects, setprojects] = useState<DocumentType[]>([]);
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
                    process.env.NEXT_PUBLIC_BACKEND_URL + "/api/doc/GetOnlyDocument",
                    { email: email },
                    { withCredentials: true }
                );
                setprojects(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        FetchFile();
    }, [email]);

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case "Deployed":
                return "default";
            case "In Progress":
                return "secondary";
            default:
                return "outline";
        }
    };

    return (
        <Card className="p-6 border-gray-700 bg-neutral-900">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Folder className="w-5 h-5" />
                    Projects
                </h3>
                <Button variant="outline" size="sm">
                    View All
                </Button>
            </div>

            <div className="space-y-4">
                {projects.slice(0, 5).map((project) => (
                    <div
                        key={project.name}
                        className="border border-gray-700 rounded-lg p-4 bg-muted hover:bg-secondary transition-colors"
                    >
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <h4 className="font-medium text-foreground">{project.name}</h4>
                                <Badge variant="outline" className="text-xs">
                                    {project.ownerType}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-2">

                                {/* @ts-expect-error fils type need to be updated */}
                                <Badge variant={getStatusBadgeVariant(project.updatedAt)} className="text-xs" >

                                    {/* @ts-expect-error fils type need to be updated */}
                                    {project.updatedAt}
                                </Badge>
                                <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-pointer" />
                            </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">
                            {project.language}
                        </p>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <GitBranch className="w-3 h-3" />
                                    <span>12</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3" />
                                    <span>8</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
