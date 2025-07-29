import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import { Users, Crown, Circle, MessageCircle, Coffee, Zap } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    role: "Team Lead",
    avatar: "https://github.com/shadcn.png",
    initials: "JD",
    status: "online",
    commitsToday: 8,
    isLead: true,
    mood: "focused",
    lastSeen: "Active now"
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Frontend Dev",
    avatar: "https://github.com/shadcn.png",
    initials: "SC",
    status: "online",
    commitsToday: 5,
    isLead: false,
    mood: "creative",
    lastSeen: "2 mins ago"
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Backend Dev",
    avatar: "https://github.com/shadcn.png",
    initials: "MJ",
    status: "away",
    commitsToday: 3,
    isLead: false,
    mood: "coffee",
    lastSeen: "15 mins ago"
  },
  {
    id: 4,
    name: "Alex Kim",
    role: "Full Stack",
    avatar: "https://github.com/shadcn.png",
    initials: "AK",
    status: "online",
    commitsToday: 6,
    isLead: false,
    mood: "energetic",
    lastSeen: "Active now"
  },
  {
    id: 5,
    name: "Emma Davis",
    role: "UI/UX Designer",
    avatar: "https://github.com/shadcn.png",
    initials: "ED",
    status: "offline",
    commitsToday: 2,
    isLead: false,
    mood: "thoughtful",
    lastSeen: "2 hours ago"
  }
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case "online":
      return { color: "code-green", icon: Circle, pulse: true };
    case "away":
      return { color: "code-orange", icon: Circle, pulse: false };
    case "offline":
      return { color: "muted-foreground", icon: Circle, pulse: false };
    default:
      return { color: "muted-foreground", icon: Circle, pulse: false };
  }
};

const getMoodIcon = (mood: string) => {
  switch (mood) {
    case "focused":
      return Zap;
    case "creative":
      return "🎨";
    case "coffee":
      return Coffee;
    case "energetic":
      return "⚡️";
    case "thoughtful":
      return "💭";
    default:
      return MessageCircle;
  }
};
export const TeamSection = () => {
  const onlineCount = teamMembers.filter(m => m.status === "online").length;
  
  return (
    <Card className="relative overflow-hidden bg-gradient-glass border border-border/50 backdrop-blur-sm">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      
      <CardHeader className="relative flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-3">
          <div className="relative">
            <Users className="w-5 h-5 text-code-purple" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-code-green rounded-full border-2 border-background animate-pulse-slow" />
          </div>
          <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
            Team Members
          </span>
        </CardTitle>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-code-green border-code-green/30 bg-code-green/10">
            {onlineCount} online
          </Badge>
          <Badge variant="outline" className="text-code-blue border-code-blue/30 bg-code-blue/10">
            {teamMembers.length} total
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="relative space-y-3">
        {teamMembers.map((member, index) => {
          const statusConfig = getStatusConfig(member.status);
          const StatusIcon = statusConfig.icon;
          const MoodIcon = getMoodIcon(member.mood);
          
          return (
            <div 
              key={member.id} 
              className={`
                relative flex items-center gap-4 p-4 rounded-xl 
                bg-gradient-to-r from-transparent via-code-purple/5 to-transparent
                hover:from-code-purple/10 hover:via-code-purple/5 hover:to-transparent
                transition-all duration-500 group cursor-pointer
                border border-transparent hover:border-code-purple/20
                animate-slide-up
              `}
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <div className="relative">
                <Avatar className="w-12 h-12 ring-2 ring-border/50 group-hover:ring-primary/50 transition-all duration-300">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="text-sm font-medium">{member.initials}</AvatarFallback>
                </Avatar>
                
                {/* Status indicator */}
                <div className="absolute -bottom-1 -right-1">
                  <StatusIcon 
                    className={`
                      w-4 h-4 text-${statusConfig.color} fill-current 
                      ${statusConfig.pulse ? 'animate-pulse-slow' : ''}
                    `}
                  />
                </div>
                
                {/* Lead crown */}
                {member.isLead && (
                  <Crown className="absolute -top-2 -right-2 w-4 h-4 text-code-yellow fill-current animate-float" />
                )}
              </div>
              
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm group-hover:text-primary transition-colors">
                    {member.name}
                  </span>
                  
                  {member.isLead && (
                    <Badge variant="outline" className="text-code-yellow border-code-yellow/30 bg-code-yellow/10 text-xs">
                      Lead
                    </Badge>
                  )}
                  
                  <div className="text-xs" title={`Mood: ${member.mood}`}>
                    {typeof MoodIcon === "string" ? (
                      <span>{MoodIcon}</span>
                    ) : (
                      <MoodIcon className="w-3 h-3 text-muted-foreground" />
                    )}
                  </div>
                </div>


<div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{member.role}</span>
                  <span>•</span>
                  <span>{member.lastSeen}</span>
                </div>
              </div>
              
              <div className="text-right space-y-1">
                <Badge 
                  variant="outline" 
                  className={`
                    text-${statusConfig.color} border-${statusConfig.color}/30 bg-${statusConfig.color}/10 text-xs
                    group-hover:bg-${statusConfig.color}/20 transition-all duration-300
                  `}
                >
                  {member.status}
                </Badge>
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium text-code-blue">{member.commitsToday}</span> commits today
                </div>
              </div>
              
              {/* Hover glow */}
              <div className="absolute inset-0 bg-code-purple/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          );
        })}
        
        <div className="pt-2">
          <Button 
            variant="outline" 
            className="w-full border-dashed border-primary/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
          >
            <Users className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Invite Team Member
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
