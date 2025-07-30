import { Users, UserPlus, Shield, Eye, Edit3, Crown } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarTrigger } from "../components/ui/sidebar";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const teamMembers = [
  { id: 1, name: "Alice Johnson", email: "alice@company.com", role: "admin", initials: "AJ", status: "online" },
  { id: 2, name: "Bob Smith", email: "bob@company.com", role: "editor", initials: "BS", status: "offline" },
  { id: 3, name: "Carol Davis", email: "carol@company.com", role: "viewer", initials: "CD", status: "online" },
  { id: 4, name: "David Wilson", email: "david@company.com", role: "editor", initials: "DW", status: "away" },
  { id: 5, name: "Eva Brown", email: "eva@company.com", role: "admin", initials: "EB", status: "online" },
];

const getRoleIcon = (role: string) => {
  switch (role) {
    case "admin": return Crown;
    case "editor": return Edit3;
    case "viewer": return Eye;
    default: return Shield;
  }
};

const getRoleBadgeVariant = (role: string) => {
  switch (role) {
    case "admin": return "default";
    case "editor": return "secondary";
    case "viewer": return "outline";
    default: return "outline";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "online": return "bg-green-500";
    case "away": return "bg-yellow-500";
    case "offline": return "bg-gray-500";
    default: return "bg-gray-500";
  }
};

export function TeamSidebar() {
  return (
    <Sidebar className="w-80 border-r border-sidebar-border bg-sidebar-background">
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6 text-primary" />
          <h2 className="text-lg font-semibold text-sidebar-foreground">Team Members</h2>
        </div>
      </div>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-medium text-muted-foreground px-0">
            Active Members ({teamMembers.length})
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-3">
            <SidebarMenu className="space-y-2">
              {teamMembers.map((member) => {
                const RoleIcon = getRoleIcon(member.role);
                return (
                  <SidebarMenuItem key={member.id}>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="relative">
                        <Avatar className="h-10 w-10 bg-primary/10 border border-border">
                          <AvatarFallback className="text-sm font-medium bg-primary/20 text-primary-foreground">
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-sidebar-background ${getStatusColor(member.status)}`}></div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-sidebar-foreground truncate">
                            {member.name}
                          </p>
                          <RoleIcon className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {member.email}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={getRoleBadgeVariant(member.role)} className="text-xs py-0 px-1.5">
                            {member.role}
                          </Badge>
                          <span className="text-xs text-muted-foreground capitalize">
                            {member.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-6 p-4 bg-accent/30 rounded-lg border border-border">
          <div className="flex items-center space-x-2 mb-2">
            <UserPlus className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-sidebar-foreground">Invite New Member</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Use the form on the right to send invitations to new team members.
          </p>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

export default TeamSidebar
