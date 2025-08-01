"use client"
// import { Send, UserPlus, Mail, Shield, Check, X } from 'lucide-react';
// import { Button } from '../components/ui/Button';
// import { Input } from '../components/ui/input';
// import { Label } from '../components/ui/label';
// import { Textarea } from '../components/ui/textarea';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
// import { Badge } from '../components/ui/badge';
// import { useToast } from '../Hooks/use-toast';
// import { INVITE_ROLES, type InviteData, type InviteRole } from '../types/invite';
//
// const InviteForm = () => {
//   const [inviteData, setInviteData] = useState<InviteData>({
//     email: '',
//     role: '',
//     message: ''
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedRole, setSelectedRole] = useState<InviteRole | null>(null);
//   const { toast } = useToast();
//
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!inviteData.email || !inviteData.role) {
//       toast({
//         title: "Missing Information",
//         description: "Please fill in both email and role fields.",
//         variant: "destructive",
//       });
//       return;
//     }
//
//
//     setIsLoading(true);
//
//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false);
//       toast({
//         title: "Invitation Sent! 🎉",
//         description: `Successfully invited ${inviteData.email} as ${selectedRole?.label}`,
//       });
//
//       // Reset form
//       setInviteData({ email: '', role: '', message: '' });
//       setSelectedRole(null);
//     }, 2000);
//   };
//
//   const handleRoleChange = (roleValue: string) => {
//     setInviteData(prev => ({ ...prev, role: roleValue }));
//     const role = INVITE_ROLES.find(r => r.value === roleValue);
//     setSelectedRole(role || null);
//   };
//
//   const getRoleColor = (role: string) => {
//     switch (role) {
//       case 'admin': return 'bg-red-500/20 text-red-300 border-red-500/30';
//       case 'editor': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
//       case 'reviewer': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
//       case 'viewer': return 'bg-green-500/20 text-green-300 border-green-500/30';
//       default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
//
//                 return (
//                     <Card className="w-full max-w-2xl mx-auto backdrop-blur-xl bg-card/50 border-border/50 shadow-2xl">
//                         <CardHeader className="text-center space-y-4">
//                             <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-glow">
//                                 <UserPlus className="w-8 h-8 text-white" />
//                             </div>
//                             <CardTitle className="text-3xl font-bold gradient-text">
//                                 Invite Collaborator
//                             </CardTitle>
//                             <CardDescription className="text-lg text-muted-foreground">
//                                 Invite developers to join your collaborative coding session
//                             </CardDescription>
//                         </CardHeader>
//
//                         <CardContent className="space-y-6">
//                             <form onSubmit={handleSubmit} className="space-y-6">
//                                 <div className="space-y-2">
//                                     <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
//                                         <Mail className="w-4 h-4" />
//                                         Email Address
//                                     </Label>
//                                     <Input
//                                         id="email"
//                                         type="email"
//                                         placeholder="developer@example.com"
//                                         value={inviteData.email}
//                                         onChange={(e) => setInviteData(prev => ({ ...prev, email: e.target.value }))}
//                                         className="h-12 bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-200"
//                                         required
//                                     />
//                                 </div>
//                                 <div className="space-y-3">
//                                     <Label htmlFor="role" className="text-sm font-medium flex items-center gap-2">
//                                         <Shield className="w-4 h-4" />
//                                         Role & Permissions
//                                     </Label>
//                                     <select
//                                         id="role"
//                                         value={inviteData.role}
//                                         onChange={handleRoleChange}
//                                         className="h-12 w-full bg-background/50 border border-border/50 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
//                                     >
//                                         <option value="" disabled>
//                                             Select a role for the collaborator
//                                         </option>
//                                         {INVITE_ROLES.map((role) => (
//                                             <option key={role.value} value={role.value}>
//                                                 {role.label} – {role.description}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//
//
//                                 {selectedRole && (
//                                     <div className="p-4 rounded-lg bg-accent/30 border border-border/30">
//                                         <h4 className="font-medium mb-2 flex items-center gap-2">
//                                             <Shield className="w-4 h-4" />
//                                             Permissions for {selectedRole.label}
//                                         </h4>
//                                         <div className="flex flex-wrap gap-2">
//                                             {selectedRole.permissions.map((permission) => (
//                                                 <Badge
//                                                     key={permission}
//                                                     variant="secondary"
//                                                     className={`${getRoleColor(selectedRole.value)} capitalize`}
//                                                 >
//                                                     {permission.replace('_', ' ')}
//                                                 </Badge>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 )}
//                                 <div/>
//
//                                 <div className="space-y-2">
//                                     <Label htmlFor="message" className="text-sm font-medium">
//                                         Personal Message (Optional)
//                                     </Label>
//                                     <Textarea
//                                         id="message"
//                                         placeholder="Add a personal note to your invitation..."
//                                         value={inviteData.message}
//                                         onChange={(e) => setInviteData(prev => ({ ...prev, message: e.target.value }))}
//                                         className="min-h-[100px] bg-background/50 border-border/50 focus:border-primary/50 resize-none"
//                                     />
//                                 </div>
//
//                                 <Button
//                                     type="submit"
//                                     disabled={isLoading || !inviteData.email || !inviteData.role}
//                                     className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-200"
//                                 >
//                                     {isLoading ? (
//                                         <div className="flex items-center gap-2">
//                                             <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                                             Sending Invitation...
//                                         </div>
//                                     ) : (
//                                             <div className="flex items-center gap-2">
//                                                 <Send className="w-5 h-5" />
//                                                 Send Invitation
//                                             </div>
//                                         )}
//                                 </Button>
//                             </form>
//
//                             <div className="pt-4 border-t border-border/30">
//                                 <div className="text-center text-sm text-muted-foreground">
//                                     <p>The collaborator will receive an email with instructions to join your coding session.</p>
//                                 </div>
//                             </div>
//
//                         </CardContent>
//                     </Card>
//                 );
//         };
//
//         export default InviteForm;
//
    // }
  // };


import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { SidebarProvider } from "../components/ui/sidebar"
import { TeamSidebar } from "../components/TeamSidebar";
import { useToast } from "../Hooks/use-toast";
import HeroSection from "./heroSection";
import { Mail, Send, UserPlus, Check, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const Invitation = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const { toast } = useToast();

  const handleGenerateLink = async () => {
    if (!role) {
      toast({
        title: "Missing Role",
        description: "Please select a role first.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockLink = `https://app.company.com/invite/${Math.random().toString(36).substring(7)}?role=${role}`;
    setGeneratedLink(mockLink);
    setIsGenerating(false);
    setIsGenerated(true);
    
    toast({
      title: "Invitation Link Generated!",
      description: `Ready to send invitation for ${role} role`,
      className: "bg-success text-success-foreground",
    });
  };

  const handleSendInvitation = async () => {
    if (!email) {
      toast({
        title: "Missing Email",
        description: "Please enter an email address.",
        variant: "destructive",
      });
      return;
    }

    if (!isGenerated) {
      toast({
        title: "Generate Link First",
        description: "Please generate an invitation link before sending.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSending(false);
    
    toast({
      title: "Invitation Sent!",
      description: `Invitation sent to ${email} as ${role}`,
      className: "bg-success text-success-foreground",
    });

    // Reset form after successful send
    setTimeout(() => {
      setEmail("");
      setRole("");
      setIsGenerated(false);
      setGeneratedLink("");
    }, 1000);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
                <div className="hidden lg:flex ">
        <TeamSidebar />
       </div> 
        <div className="flex-1 flex items-center justify-center p-8">


          <div className="w-full max-w-md">
            <Card className="bg-card border-border shadow-2xl">
              <CardHeader className="text-center space-y-4 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
                  <UserPlus className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-semibold tracking-tight text-card-foreground">
                    Send Invitation
                  </CardTitle>
                  <CardDescription className="text-muted-foreground mt-2">
                    Generate and send invitation links to new team members
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-card-foreground">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="colleague@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={cn(
                        "pl-10 h-11 transition-all duration-200 bg-input border-border text-card-foreground",
                        "focus:ring-2 focus:ring-primary/20 focus:border-primary",
                        "hover:border-primary/50"
                      )}
                      disabled={isGenerating || isSending}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium text-card-foreground">
                    Role
                  </Label>
                  <Select value={role} onValueChange={setRole} disabled={isGenerating || isSending}>
                    <SelectTrigger className={cn(
                      "h-11 transition-all duration-200 bg-input border-border text-card-foreground",
                      "focus:ring-2 focus:ring-primary/20 focus:border-primary",
                      "hover:border-primary/50"
                    )}>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border shadow-xl z-10 bg-gray-400">
                      <SelectItem value="viewer" className="cursor-pointer hover:bg-accent text-popover-foreground ">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-muted-foreground/50"></div>
                          <div>
                            <div className="font-medium">Viewer</div>
                            <div className="text-xs text-muted-foreground">Can view content only</div>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="editor" className="cursor-pointer hover:bg-accent text-popover-foreground">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-primary/60"></div>
                          <div>
                            <div className="font-medium">Editor</div>
                            <div className="text-xs text-muted-foreground">Can edit and create content</div>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="admin" className="cursor-pointer hover:bg-accent text-popover-foreground">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <div>
                            <div className="font-medium">Admin</div>
                            <div className="text-xs text-muted-foreground">Full access and management</div>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {isGenerated && generatedLink && (
                  <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                    <p className="text-xs font-medium text-success mb-1">Generated Link:</p>
                    <p className="text-xs text-muted-foreground font-mono break-all">{generatedLink}</p>
                  </div>
                )}

                <div className="space-y-3">
                  <Button
                    onClick={handleGenerateLink}
                    disabled={isGenerating || isSending}
                    className={cn(
                      "w-full h-11 font-medium transition-all duration-300",
                      "bg-secondary hover:bg-secondary/80 text-secondary-foreground",
                      "hover:shadow-lg hover:scale-[1.02]"
                    )}
                  >
                    {isGenerating ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin" />
                        <span>Generating...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4" />
                        <span>Generate Link</span>
                      </div>
                    )}
                  </Button>

                  <Button
                    onClick={handleSendInvitation}
                    disabled={isGenerating || isSending || !isGenerated}
                    className={cn(
                      "w-full h-11 font-medium transition-all duration-300",
                      "bg-primary hover:bg-primary/90 text-primary-foreground",
                      "hover:shadow-lg hover:scale-[1.02]",
                      "disabled:opacity-50"
                    )}
                  >
                    {isSending ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="w-4 h-4" />
                        <span>Send Invitation</span>
                      </div>
                    )}
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Generate a link first, then send it to the recipient's email
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Invitation;
