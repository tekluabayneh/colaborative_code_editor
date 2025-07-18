"use client"
import React, { useState } from 'react';
import { Send, UserPlus, Mail, Shield, Check, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useToast } from '../Hooks/use-toast';
import { INVITE_ROLES, type InviteData, type InviteRole } from '../types/invite';

const InviteForm = () => {
  const [inviteData, setInviteData] = useState<InviteData>({
    email: '',
    role: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<InviteRole | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteData.email || !inviteData.role) {
      toast({
        title: "Missing Information",
        description: "Please fill in both email and role fields.",
        variant: "destructive",
      });
      return;
    }


    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Invitation Sent! 🎉",
        description: `Successfully invited ${inviteData.email} as ${selectedRole?.label}`,
      });
      
      // Reset form
      setInviteData({ email: '', role: '', message: '' });
      setSelectedRole(null);
    }, 2000);
  };

  const handleRoleChange = (roleValue: string) => {
    setInviteData(prev => ({ ...prev, role: roleValue }));
    const role = INVITE_ROLES.find(r => r.value === roleValue);
    setSelectedRole(role || null);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'editor': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'reviewer': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'viewer': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto backdrop-blur-xl bg-card/50 border-border/50 shadow-2xl">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-glow">
          <UserPlus className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-3xl font-bold gradient-text">
          Invite Collaborator
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground">
          Invite developers to join your collaborative coding session
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="developer@example.com"
              value={inviteData.email}
                            onChange={(e) => setInviteData(prev => ({ ...prev, email: e.target.value }))}
                            className="h-12 bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-200"
                            required
                        />
                    </div>
                    <div className="space-y-3">
                        <Label htmlFor="role" className="text-sm font-medium flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            Role & Permissions
                        </Label>
                        <select
                            id="role"
                            value={inviteData.role}
                            onChange={handleRoleChange}
                            className="h-12 w-full bg-background/50 border border-border/50 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                            <option value="" disabled>
                                Select a role for the collaborator
                            </option>
                            {INVITE_ROLES.map((role) => (
                                <option key={role.value} value={role.value}>
                                    {role.label} – {role.description}
                                </option>
                            ))}
                        </select>
                    </div>


                    {selectedRole && (
                        <div className="p-4 rounded-lg bg-accent/30 border border-border/30">
                            <h4 className="font-medium mb-2 flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                Permissions for {selectedRole.label}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {selectedRole.permissions.map((permission) => (
                                    <Badge
                                        key={permission}
                                        variant="secondary"
                                        className={`${getRoleColor(selectedRole.value)} capitalize`}
                                    >
                                        {permission.replace('_', ' ')}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                <div/>

                <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">
                        Personal Message (Optional)
                    </Label>
                    <Textarea
                        id="message"
                        placeholder="Add a personal note to your invitation..."
                        value={inviteData.message}
                        onChange={(e) => setInviteData(prev => ({ ...prev, message: e.target.value }))}
                        className="min-h-[100px] bg-background/50 border-border/50 focus:border-primary/50 resize-none"
                    />
                </div>

                <Button
                    type="submit"
                    disabled={isLoading || !inviteData.email || !inviteData.role}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending Invitation...
                        </div>
                    ) : (
                            <div className="flex items-center gap-2">
                                <Send className="w-5 h-5" />
                                Send Invitation
                            </div>
                        )}
                </Button>
            </form>

            <div className="pt-4 border-t border-border/30">
                <div className="text-center text-sm text-muted-foreground">
                    <p>The collaborator will receive an email with instructions to join your coding session.</p>
                </div>
            </div>

        </CardContent>
            </Card>
    );
};

export default InviteForm;
