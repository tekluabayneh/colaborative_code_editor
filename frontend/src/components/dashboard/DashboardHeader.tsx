"use client"
import { Bell, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";

export const DashboardHeader = () => {
    const userName = localStorage.getItem("email")?.split("@")[0] ?? "not found"

    return (
        <header className="border-b border-gray-600 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-sm">Dc</span>
                        </div>
                        <h1 className="text-xl text-white font-semibold bg-gradient-primary bg-clip-text ">
                            CodeSync
                        </h1>
                    </div>
                </div>

                <div className="flex-1 max-w-md mx-8">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                            placeholder="Search files, users, or projects..."
                            className="pl-10 bg-muted/50 border-gray-600 focus:border-primary transition-colors"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-code-red rounded-full text-xs flex items-center justify-center">
                            <span className="w-1.5 h-1.5 bg-primary-foreground rounded-full"></span>
                        </span>
                    </Button>

                    <Button variant="ghost" size="icon">
                        <Settings className="w-5 h-5" />
                    </Button>

                    <div className="flex items-center gap-2 pl-2 border-l border-gray-600">
                        <span className="text-sm font-medium">{userName}</span>
                    </div>
                </div>
            </div>
        </header>
    );
};
