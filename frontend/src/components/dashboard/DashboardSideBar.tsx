import { BarChart3, FileText, Users, Activity, Folder, GitBranch, Code2, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Dashboard", icon: Home, current: true },
    { name: "Projects", icon: Folder, current: false },
    { name: "Code Editor", icon: Code2, current: false },
    { name: "Team", icon: Users, current: false },
    { name: "Activity", icon: Activity, current: false },
    { name: "Analytics", icon: BarChart3, current: false },
    { name: "Files", icon: FileText, current: false },
    { name: "Branches", icon: GitBranch, current: false },
];

export const DashboardSidebar = () => {
    return (
        <div className="w-13 md:hover:w-40 transition-all  delay-200  bg-neutral-900 border-r border-gray-700 flex flex-col overflow-hidden">
            <div className="p-4 pl-1">
                <nav className="space-y-3 ">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Button
                                key={item.name}
                                variant={item.current ? "secondary" : "ghost"}
                                className={cn( " cursor-pointer justify-start gap-4 h-11", item.current && "bg-purple-400 border border-gray-700")} >
                                <Icon className="w-5 h-5" /> 
                                <span className="hidden md:block">
                                    {item.name}
                                </span>
                            </Button>
                        );
                    })}
                </nav>
            </div>

        </div>
    );
};
