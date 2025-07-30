import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitCommit, FileEdit, MessageSquare, GitPullRequest, Zap, Clock } from "lucide-react";

const activities = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      avatar: "https://github.com/shadcn.png",
      initials: "SC"
    },
    action: "committed",
    target: "Fix authentication bug in login.tsx",
    time: "2 minutes ago",
    type: "commit",
    icon: GitCommit,
    color: "green-500",
    priority: "high"
  },
  {
    id: 2,
    user: {
      name: "Mike Johnson",
      avatar: "https://github.com/shadcn.png",
      initials: "MJ"
    },
    action: "opened pull request",
    target: "Add dark mode toggle component",
    time: "5 minutes ago",
    type: "pr",
    icon: GitPullRequest,
    color: "purple-500",
    priority: "medium"
  },
  {
    id: 3,
    user: {
      name: "Alex Kim",
      avatar: "https://github.com/shadcn.png",
      initials: "AK"
    },
    action: "edited",
    target: "dashboard/components/Header.tsx",
    time: "12 minutes ago",
    type: "edit",
    icon: FileEdit,
    color: "blue-500",
    priority: "low"
  },
  {
    id: 4,
    user: {
      name: "Emma Davis",
      avatar: "https://github.com/shadcn.png",
      initials: "ED"
    },
    action: "commented on",
    target: "Review navigation improvements",
    time: "18 minutes ago",
    type: "comment",
    icon: MessageSquare,
    color: "orange-500",
    priority: "medium"
  },
  {
    id: 5,
    user: {
      name: "David Wilson",
      avatar: "https://github.com/shadcn.png",
      initials: "DW"
    },
    action: "committed",
    target: "Update API endpoints for user management",
    time: "25 minutes ago",
    type: "commit",
    icon: GitCommit,
    color: "green-500",
    priority: "high"
  }
];

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case "high":
      return Zap;
    case "medium":
      return Clock;
    default:
      return Clock;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "red-500";
    case "medium":
      return "orange-500";
    default:
      return "white";
  }
};
export const ActivityFeed = () => {
  return (
    <Card className="relative overflow-hidden border border-gray-600/50 backdrop-blur-sm">
      {/* Background mesh */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
      
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-3">
          <div className="relative">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-slow"></div>
            <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
          </div>
          <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
            Live Activity Feed
          </span>
          <Badge variant="outline" className="text-green-500 border-code-green/30 bg-green-500/5">
            Real-time
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative space-y-2">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          const PriorityIcon = getPriorityIcon(activity.priority);
          
          return (
            <div 
              key={activity.id} 
              className={`
                relative flex items-start gap-4 p-4 rounded-xl 
                bg-gradient-to-r from-transparent via-${activity.color}/5 to-transparent
                hover:from-${activity.color}/10 hover:via-${activity.color}/5 hover:to-transparent
                transition-all duration-500 group cursor-pointer
                border border-transparent hover:border-${activity.color}/20
                animate-slide-up
              `}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Priority indicator */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${getPriorityColor(activity.priority)} rounded-r-full opacity-60`} />
              
              <div className="relative">
                <Avatar className="w-10 h-10 ring-2 ring-border/50 group-hover:ring-primary/50 transition-all duration-300">
                  <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                  <AvatarFallback className="text-xs font-medium">{activity.user.initials}</AvatarFallback>
                </Avatar>
                
                {/* Status indicator */}
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 bg-${activity.color} rounded-full border-2 border-background flex items-center justify-center`}>
                  <Icon className="w-2 h-2 text-background" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm group-hover:text-primary transition-colors">
                    {activity.user.name}
                  </span>
                  <span className="text-muted-foreground text-sm">{activity.action}</span>
                  
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={`
                        text-${activity.color} border-${activity.color}/30 bg-${activity.color}/10
                        group-hover:bg-${activity.color}/20 transition-all duration-300
                      `}
                    >
                      <Icon className="w-3 h-3 mr-1" />
                      {activity.type}
                    </Badge>
                    
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full bg-${getPriorityColor(activity.priority)}/10`}>
                      <PriorityIcon className={`w-2.5 h-2.5 text-${getPriorityColor(activity.priority)}`} />
                      <span className={`text-xs text-${getPriorityColor(activity.priority)} capitalize`}>
                        {activity.priority}
                      </span>
                    </div>
</div>
                </div>
                
                <p className="text-sm text-foreground/90 group-hover:text-foreground transition-colors font-medium">
                  {activity.target}
                </p>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{activity.time}</span>
                </div>
              </div>
              
              {/* Hover glow effect */}
              <div className={`absolute inset-0 bg-${activity.color}/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
            </div>
          );
        })}
        
        <div className="pt-4">
          <div className="text-center">
            <button className="text-sm text-code-blue hover:text-code-blue/80 font-medium transition-colors duration-300">
              View all activity →
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
