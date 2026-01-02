import { UserInfoCard } from "@/components/UserinfoCard";
import { Activity, Code2, Home } from "lucide-react";
import { CodingStats } from "@/components/CodingStatus";
import { ProjectsSection } from "@/components/ProjectSection";
import Link from "next/link";

const navigation = [
    { name: "Dashboard", icon: Home, current: true, link: "/dashboard" },
    { name: "Code Editor", icon: Code2, current: false, link: "/editor" },
    { name: "Activity", icon: Activity, current: false, link: "/activity" },
];
const Index = () => {
    return (
        <div className="min-h-screen bg-neutral-900 p-6">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <div className="flex gap-3 items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground mb-2">
                                Developer Dashboard
                            </h1>
                            <p className="text-muted-foreground">
                                Your coding journey at a glance
                            </p>
                        </div>
                        <div className="flex flex gap-4">
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.link}
                                        className="flex items-center gap-3 text-gray-700 hover:text-white hover:bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg transition-all duration-300"
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="text-lg font-medium">{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 space-y-6">
                        <UserInfoCard />
                        <CodingStats />
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <ProjectsSection />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
