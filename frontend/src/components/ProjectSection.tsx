import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import { Folder, ExternalLink, GitBranch, Star } from "lucide-react";

export function ProjectsSection() {
  const projects = [
    {
      name: "E-Commerce Platform",
      role: "Owner",
      status: "In Progress",
      description: "Modern React-based shopping platform with Stripe integration",
      tags: ["React", "Node.js", "Stripe", "PostgreSQL"],
      statusColor: "bg-orange-600"
    },
    {
      name: "Chat Application",
      role: "Contributor", 
      status: "Deployed",
      description: "Real-time messaging app with video calling features",
      tags: ["React", "Socket.io", "WebRTC"],
      statusColor: "bg-green-600"
    },
    {
      name: "Task Manager",
      role: "Owner",
      status: "In Progress", 
      description: "Collaborative project management tool for teams",
      tags: ["TypeScript", "Prisma", "NextJS"],
      statusColor: "text-orange-600"
    },
    {
      name: "Analytics Dashboard",
      role: "Viewer",
      status: "Archived",
      description: "Data visualization dashboard for business metrics",
      tags: ["D3.js", "Python", "FastAPI"],
      statusColor: "bg-gray-600"
    }
  ];

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Deployed": return "default";
      case "In Progress": return "secondary";
      default: return "outline";
    }
  };

  return (
    <Card className="p-6 border-gray-700 bg-neutral-900">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Folder className="w-5 h-5" />
          Projects
        </h3>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>
      
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.name} className="border border-gray-700 rounded-lg p-4 bg-muted hover:bg-secondary transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-foreground">{project.name}</h4>
                <Badge variant="outline" className="text-xs">
                  {project.role}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getStatusBadgeVariant(project.status)} className="text-xs">
                  {project.status}
                </Badge>
                <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-pointer" />
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">
              {project.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex gap-1 flex-wrap">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <GitBranch className="w-3 h-3" />
                  <span>12</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  <span>8</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
