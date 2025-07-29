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
    <div className="w-64 bg-card border-r border-border flex flex-col h-screen">
      <div className="p-6">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.name}
                variant={item.current ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-11",
                  item.current && "bg-gradient-accent border border-primary/20"
                )}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-border">
        <div className="bg-gradient-accent rounded-lg p-4 border border-primary/20">
          <h3 className="font-semibold text-sm mb-2">Upgrade to Pro</h3>
          <p className="text-xs text-muted-foreground mb-3">
            Get unlimited projects and advanced collaboration features.
          </p>
          <Button size="sm" className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  );
};
