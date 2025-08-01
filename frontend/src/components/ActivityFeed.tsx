import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, GitCommit, MessageCircle, FileCode, Clock } from "lucide-react";

export function ActivityFeed() {
  const activities = [
    {
      type: "commit",
      action: "Pushed 3 commits to",
      target: "e-commerce-platform",
      time: "2 minutes ago",
      icon: GitCommit,
      color: "text-green-600"
    },
    {
      type: "session",
      action: "Started coding session on",
      target: "chat-application",
      time: "15 minutes ago", 
      icon: Activity,
      color: "text-blue-600"
    },
    {
      type: "comment",
      action: "Commented on",
      target: "UserAuth.tsx",
      time: "1 hour ago",
      icon: MessageCircle,
      color: "text-green-600"
    },
    {
      type: "file",
      action: "Modified",
      target: "database.sql",
      time: "2 hours ago",
      icon: FileCode,
      color: "text-orange-600"
    },
    {
      type: "commit",
      action: "Merged pull request in",
      target: "task-manager",
      time: "4 hours ago",
      icon: GitCommit,
      color: "text-green-600"
    },
    {
      type: "session",
      action: "Ended 3h coding session",
      target: "analytics-dashboard",
      time: "6 hours ago",
      icon: Clock,
      color: "text-gray-600"
    }
  ];

  return (
    <Card className="p-6 border-gray-700 bg-neutral-900">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5" />
        Recent Activity
      </h3>
      
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={`mt-1 ${activity.color}`}>
              <activity.icon className="w-4 h-4" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="text-sm text-foreground">
                <span className="text-muted-foreground">{activity.action}</span>
                {" "}
                <Badge variant="outline" className="text-xs mx-1">
                  {activity.target}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {activity.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
