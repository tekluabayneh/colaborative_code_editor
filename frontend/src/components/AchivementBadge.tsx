import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Zap, Target, Award } from "lucide-react";

export function AchievementsBadges() {
  const achievements = [
    {
      title: "100 PRs Merged",
      description: "Merged 100 pull requests",
      icon: Trophy,
      color: "text-orange-600",
      bgColor: "bg-orange-900/15"
    },
    {
      title: "Speed Demon", 
      description: "Completed 10 tasks in one day",
      icon: Zap,
      color: "text-white",
      bgColor: "bg-blue-900/15"
    },
    {
      title: "Bug Hunter",
      description: "Fixed 50 critical bugs",
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-700/15"

    },
    {
      title: "Code Mentor",
      description: "Helped 5 teammates this week",
      icon: Award,
     color: "text-green-600",
      bgColor: "bg-green-700/15"


    }
  ];

  return (
    <Card className="p-6 border-gray-700 bg-neutral-900">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Trophy className="w-5 h-5" />
        Achievements
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {achievements.map((achievement) => (
          <div 
            key={achievement.title}
            className={`p-3 rounded-lg border border-gray-700 ${achievement.bgColor} hover:scale-105 transition-transform cursor-pointer`}
          >
            <div className="flex items-center gap-2 mb-2">
              <achievement.icon className={`w-4 h-4 ${achievement.color}`} />
              <Badge variant="secondary" className="text-xs">
                New
              </Badge>
            </div>
            <h4 className="font-medium text-foreground text-sm mb-1">
              {achievement.title}
            </h4>
            <p className="text-xs text-muted-foreground">
              {achievement.description}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
