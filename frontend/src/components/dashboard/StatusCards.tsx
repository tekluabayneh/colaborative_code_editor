import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitCommit, FileText, Users, TrendingUp, Sparkles } from "lucide-react";

const stats = [
    {
        title: "Lines of Code",
        value: "124,592",
        change: "+12%",
        changeType: "positive" as const,
        icon: FileText,
        color: "text-blue-500",
        bgGradient: "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-1xl shadow-xl text-white",
        glowColor: "shadow-glow-blue",
        chartData: [20, 35, 25, 40, 30, 45, 35, 50]
    },
    {
        title: "Commits Today", value: "23",
        change: "+4",
        changeType: "positive" as const,
        icon: GitCommit,
        color: "text-green-500",
        bgGradient: "bg-gradient-to-br from-green-300 via-purple-100 to-pink-200 p-6 rounded-1xl shadow-xl text-white",
        glowColor: "shadow-glow-green",
        chartData: [10, 15, 8, 20, 18, 23, 19, 25]
    },
    {
        title: "Active Users",
        value: "8",
        change: "+2",
        changeType: "positive" as const,
        icon: Users,
        color: "text-purple-400",
        bgGradient: "bg-gradient-to-br from-yellow-300 via-purple-100 to-gray-200 p-6 rounded-1xl shadow-xl text-white",
        glowColor: "shadow-glow",
        chartData: [6, 7, 6, 8, 7, 8, 7, 8]
    },
    {
        title: "Project Progress",
        value: "73%",
        change: "+8%",
        changeType: "positive" as const,
        icon: TrendingUp,
        color: "text-orange-400",
        bgGradient: "bg-gradient-to-br from-pink-300 via-purple-100 to-purple-200 p-6 rounded-1xl shadow-xl text-white",
        glowColor: "shadow-glow",
        chartData: [45, 52, 48, 60, 65, 68, 70, 73]
    }
];

const EnhancedMiniChart = ({ data, color }: { data: number[]; color: string }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;

    return (
        <div className="relative">
            {/* Glowing background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-current to-transparent opacity-10 blur-sm"></div>

            <div className="relative flex items-end gap-1 h-12 w-20">
                {data.map((value, index) => {
                    const height = range === 0 ? 50 : ((value - min) / range) * 100;
                    return (
                        <div key={index} className="relative flex-1">
                            {/* Glowing effect */}
                            <div
                                className={`absolute inset-0 bg-${color} rounded-sm blur-sm opacity-40}
                style={{ height: ${Math.max(height, 15)}% }`}
                            />
                            {/* Solid bar */}
                            <div
                                className={`relative bg-${color} rounded-sm transition-all duration-500 hover:scale-110 hover:brightness-125}
                style={{ height: ${Math.max(height, 15)}% }`}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const FloatingParticles = ({ color }: { color: string }) => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
            <div
                key={i}
                className={`{absolute w-1 h-1 bg-${color} rounded-full opacity-30 animate-float}`}
            // style={`{ left: ${20 + i * 30}%, top: ${10 + i * 20}%, animationDelay: ${i * 2}s }`}
            />
        ))}
    </div>
);


export const StatsCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <Card
                        key={stat.title}
                        className={`
              relative overflow-hidden bg-gradient-glass border border-gray-600 
              hover:border-${stat.color}/50 transition-all duration-500 
              hover:${stat.glowColor} hover:scale-[1.02] group
              backdrop-blur-sm animate-fade-in
            `}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {/* Mesh gradient background */}
                        <div className="absolute inset-0 bg-gradient-mesh opacity-60" />

                        {/* Dynamic gradient overlay */}
                        <div className={`absolute inset-0 ${stat.bgGradient} opacity-70 group-hover:opacity-90 transition-opacity duration-500`} />

                        {/* Floating particles */}
                        <FloatingParticles color={stat.color} />

                        {/* Content */}
                        <div className="relative">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                                <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                    {stat.title}
                                </CardTitle>
                                <div className={`
                  relative p-3 rounded-xl bg-${stat.color}/10 border border-${stat.color}/20 
                  group-hover:bg-${stat.color}/20 group-hover:scale-110 transition-all duration-300
                  backdrop-blur-sm
                `}>
                                    {/* Icon glow */}
                                    <div className={`absolute inset-0 bg-${stat.color}/20 rounded-xl blur-md group-hover:blur-lg transition-all`} />
                                    <Icon className={`relative w-5 h-5 text-${stat.color} group-hover:brightness-125 transition-all`} />
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="flex items-end justify-between">
                                    <div className="space-y-1">
                                        <div className="text-3xl font-bold group-hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                                            {stat.value}
                                        </div>
                                        <div className={`
                      flex items-center gap-2 text-xs px-3 py-1.5 rounded-full 
                      bg-${stat.color}/10 border border-${stat.color}/20 backdrop-blur-sm
                      group-hover:bg-${stat.color}/20 transition-all duration-300
                    `}>
                                            <TrendingUp className={`w-3 h-3 text-${stat.color}`} />
                                            <span className={`font-medium text-${stat.color}`}>{stat.change}</span>
                                            <span className="text-muted-foreground">vs last week</span>
                                        </div>
                                    </div>

                                    <div className="group-hover:scale-105 transition-transform duration-300">
                                        <EnhancedMiniChart data={stat.chartData} color={stat.color} />
                                    </div>
                                </div>
                            </CardContent>
                        </div>

                        {/* Sparkle effect on hover */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Sparkles className={`w-4 h-4 text-${stat.color} animate-pulse-slow`} />
                        </div>
                    </Card>
                );
            })}
        </div>
    )
}
