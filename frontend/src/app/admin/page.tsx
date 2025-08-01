"use client"
import { useState } from "react";
import { MoreVertical, Users, Shield, Search, Crown, Eye, Edit, Trash2, UserCheck, UserX, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";

const mockUsers = [
  {
    id: 1,
    name: "Alexandra Chen",
    email: "alex@company.com",
    role: "admin",
    status: "online",
    avatar: "/placeholder.svg",
    lastActive: "2 min ago",
    projects: 12,
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    email: "marcus@company.com",
    role: "editor",
    status: "offline",
    avatar: "/placeholder.svg",
    lastActive: "1 hour ago",
    projects: 8,
  },
  {
    id: 3,
    name: "Sarah Kim",
    email: "sarah@company.com",
    role: "viewer",
    status: "online",
    avatar: "/placeholder.svg",
    lastActive: "5 min ago",
    projects: 3,
  },
  {
    id: 4,
    name: "David Thompson",
    email: "david@company.com",
    role: "editor",
    status: "suspended",
    avatar: "/placeholder.svg",
    lastActive: "2 days ago",
    projects: 15,
  },
  {
    id: 5,
    name: "Emily Johnson",
    email: "emily@company.com",
    role: "viewer",
    status: "online",
    avatar: "/placeholder.svg",
    lastActive: "Just now",
    projects: 5,
  },
];

const Index = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter( (user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoleChange = (userId: number, newRole: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const handleUserAction = (userId: number, action: string) => {
    switch (action) {
      case "suspend":
        setUsers(users.map(user => 
          user.id === userId ? { ...user, status: "suspended" } : user
        ));
        break;
      case "activate":
        setUsers(users.map(user => 
          user.id === userId ? { ...user, status: "online" } : user
        ));
        break;
      case "delete":
        setUsers(users.filter(user => user.id !== userId));
        break;
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin": return "bg-red-600";
      case "editor": return"bg-purple-500";
      case "viewer": return "bg-gray-600";
      default: return "bg-gray-600";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin": return Crown;
      case "editor": return Edit;
      case "viewer": return Eye;
      default: return Eye;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "offline": return "bg-red-600";
      case "suspended": return "bg-red-600";
      default: return "bg-green-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online": return "🟢";
      case "offline": return "⚫";
      case "suspended": return "🔴";
      default: return "⚫";
    }
  };

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === "online").length;
  const suspendedUsers = users.filter(u => u.status === "suspended").length;

  return (
    <div className="min-h-screen bg-neutral-900">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-6 mb-8">
            <div className="p-4 rounded-2xl bg-card border border-gray-800">
              <Shield className="h-10 w-10 text-purple-500" />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-foreground mb-2">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground text-xl">Manage users, roles, and permissions with elegance</p>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="border border-gray-800 bg-card bg-neutral-900">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-md font-medium text-gray-400 uppercase tracking-wide mb-2">Total Users</p>
                    <p className="text-4xl font-bold text-purple-500">{totalUsers}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted border border-gray-800">
                    <Users className="h-8 w-8 text-purple-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-800 bg-card bg-neutral-900 ">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-md font-medium text-gray-400 uppercase tracking-wide mb-2">Active Users</p>
                    <p className="text-4xl font-bold text-success">{activeUsers}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted border border-gray-800">
                    <UserCheck className="h-8 w-8 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-800 bg-card bg-neutral-900 ">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-md font-medium text-gray-400 uppercase tracking-wide mb-2">Suspended</p>
                    <p className="text-4xl font-bold text-red-700">{suspendedUsers}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted border border-gray-800">
                    <UserX className="h-8 w-8 text-red-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Card className="border border-gray-800 bg-neutral-900">
          <CardHeader className="border-b border-gray-800 p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <CardTitle className="flex items-center gap-4 text-3xl">
                <div className="p-3 rounded-xl bg-muted">
                  <Users className="h-8 w-8 text-purple-500" />
                </div>
                User Management
              </CardTitle>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 w-80 h-12 border-gray-800 bg-input text-foreground"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800 bg-neutral-900">`
                    <TableHead className="font-semibold text-foreground p-6">User</TableHead>
                    <TableHead className="font-semibold text-foreground p-6">Role</TableHead>
                    <TableHead className="font-semibold text-foreground p-6">Status</TableHead>
                    <TableHead className="font-semibold text-foreground p-6">Projects</TableHead>
                    <TableHead className="font-semibold text-foreground p-6">Last Active</TableHead>
                    <TableHead className="text-right font-semibold text-foreground p-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user, index) => {
                    const RoleIcon = getRoleIcon(user.role);
                    return (
                      <TableRow 
                        key={user.id} 
                        className="border-gray-800 hover:bg-grya-400 transition-colors group"
                      >
                        <TableCell className="p-6">
                          <div className="flex items-center gap-6">
                            <div className="relative">
                              <Avatar className="h-14 w-14 border-2 border-gray-800">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="bg-muted text-foreground font-semibold text-lg">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-gray-800 ${getStatusColor(user.status)}`} />
                            </div>
                            <div>
                              <div className="font-semibold text-foreground text-lg">{user.name}</div>
                              <div className="text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell className="p-6">
                          <Badge className={`gap-2 px-4 border border-gray-800 py-2 font-medium text-sm ${getRoleBadgeVariant(user.role)}`} > <RoleIcon className="h-3 w-3" />
                            {user.role}
                          </Badge>
                        </TableCell>
                        
                        <TableCell className="p-6">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{getStatusIcon(user.status)}</span>
                            <span className="capitalize font-medium text-base">{user.status}</span>
                            {user.status === "suspended" && (
                              <AlertTriangle className="h-4 w-4 text-destructive" />
                            )}
                          </div>
                        </TableCell>
                        
                        <TableCell className="p-6">
                          <span className="font-medium text-lg">{user.projects}</span>
                        </TableCell>
                        
                        <TableCell className="text-muted-foreground">
                          {user.lastActive}
                        </TableCell>
                        
                        <TableCell className="text-right p-6">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                className="h-10 w-10 p-0 hover:bg-purple-500 transition-colors opacity-0 group-hover:opacity-100"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent 
                              align="end" 
                              className="w-56 border border-gray-800 bg-neutral-900"
                            >
                              <DropdownMenuLabel className="font-semibold text-foreground">
                                User Actions
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator className="bg-border" />
                              
                              <DropdownMenuItem 
                                onClick={() => handleRoleChange(user.id, "admin")}
                                className="gap-3 py-3 hover:bg-purple-500"
                              >
                                <Crown className="h-4 w-4" />
                                Make Admin
                              </DropdownMenuItem>
                              
                              <DropdownMenuItem 
                                onClick={() => handleRoleChange(user.id, "editor")}
                                className="gap-3 py-3 hover:bg-purple-500"
                              >
                                <Edit className="h-4 w-4" />
                                Make Editor
                              </DropdownMenuItem>
                              
                              <DropdownMenuItem 
                                onClick={() => handleRoleChange(user.id, "viewer")}
                                className="gap-3 py-3 hover:bg-purple-500"
                              >
                                <Eye className="h-4 w-4" />
                                Make Viewer
                              </DropdownMenuItem>
                              
                              <DropdownMenuSeparator className="bg-border" />
                              
                              {user.status === "suspended" ? (
                                <DropdownMenuItem 
                                  onClick={() => handleUserAction(user.id, "activate")}
                                  className="gap-3 py-3 hover:bg-purple-500 text-success"
                                >
                                  <UserCheck className="h-4 w-4" />
                                  Activate User
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem 
                                  onClick={() => handleUserAction(user.id, "suspend")}
                                  className="gap-3 py-3 hover:bg-purple-500 text-warning"
                                >
                                  <UserX className="h-4 w-4" />
                                  Suspend User
                                </DropdownMenuItem>
                              )}
                              
                              <DropdownMenuItem 
                                onClick={() => handleUserAction(user.id, "delete")}
                                className="gap-3 py-3 text-destructive hover:bg-purple-500"
                              >
                                <Trash2 className="h-4 w-4" />
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
