import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, ExternalLink } from "lucide-react";

export function CollaboratorsCard() {
  const collaborators = [
    { 
      name: "Sarah Chen", 
      username: "@sarah", 
      status: "online", 
      project: "Dashboard UI",
      avatar: "SC"
    },
    { 
      name: "Mike Wilson", 
      username: "@mike", 
      status: "coding", 
      project: "API Gateway",
      avatar: "MW"
    },
    { 
      name: "Lisa Park", 
      username: "@lisa", 
      status: "idle", 
      project: "Mobile App",
      avatar: "LP"
    },
    { 
      name: "David Kim", 
      username: "@david", 
      status: "offline", 
      project: "Backend Service",
      avatar: "DK"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-600";
      case "coding": return "bg-green-600";
      case "idle": return "bg-orange-600";
      default: return "bg-black";
    }
  };

  return (
    <Card className="p-6 border-gray-700 bg-neutral-900">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Users className="w-5 h-5" />
        Team Members
      </h3>
      
      <div className="space-y-3">
        {collaborators.map((collab) => (
          <div key={collab.username} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-xs font-medium text-foreground">
                  {collab.avatar}
                </div>
                <div className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(collab.status)} rounded-full border border-card`}></div>
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{collab.name}</div>
                <div className="text-xs text-muted-foreground">{collab.username}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {collab.project}
              </Badge>
              <ExternalLink className="w-3 h-3 text-muted-foreground hover:text-foreground cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
