import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Code, Clock, GitBranch, Flame } from "lucide-react";

export function CodingStats() {
  const languages = [
    { name: "TypeScript", percentage: 45, color: "bg-gray-600" },
    { name: "React", percentage: 35, color: "bg-blue-600" },
    { name: "Rust", percentage: 15, color: "bg-orange-600" },
    { name: "Python", percentage: 5, color: "bg-green-600" },
  ];

  return (
    <Card className="p-6 border-gray-700 bg-neutral-900">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Code className="w-5 h-5" />
        Coding Stats
      </h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">127</div>
          <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            <GitBranch className="w-3 h-3" />
            Projects
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">42h</div>
          <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            <Clock className="w-3 h-3" />
            This Week
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Languages Used</span>
          <Flame className="w-4 h-4 text-amber-300" />
        </div>
        {languages.map((lang) => (
          <div key={lang.name} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-foreground">{lang.name}</span>
              <span className="text-muted-foreground">{lang.percentage}%</span>
            </div>
            <Progress value={lang.percentage} className="h-2 " />
          </div>
        ))}
      </div>
    </Card>
  );
}
