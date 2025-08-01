"use client"
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { 
  BookOpen, 
  Users, 
  Edit3, 
  Keyboard, 
  FolderOpen, 
  HelpCircle, 
  Mail,
  ChevronRight,
  Sparkles,
  Zap,
  Target
} from "lucide-react";

const docsData = { "getting-started": { title: "Getting Started", icon: BookOpen, content: (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Welcome to Our Platform
          </h2>
          <p className="text-muted-foreground mb-6">
            Get up and running in minutes with our comprehensive getting started guide.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Quick Setup
            </CardTitle>
            <CardDescription>Follow these steps to begin your journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                "Create your account and verify your email",
                "Complete your profile setup",
                "Explore the dashboard and main features",
                "Join your first session or create a project"
              ].map((step, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-accent/30">
                  <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                    {index + 1}
                  </Badge>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Modern web browser (Chrome, Firefox, Safari, Edge)</li>
              <li>• Stable internet connection</li>
              <li>• JavaScript enabled</li>
              <li>• Minimum screen resolution: 1024x768</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    )
  },
  "sessions": {
    title: "Creating & Joining Sessions",
    icon: Users,
    content: (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Session Management</h2>
          <p className="text-muted-foreground">Learn how to create and join collaborative sessions.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Creating Sessions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground mb-4">
                Start a new collaborative session in just a few clicks.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 mt-0.5 text-primary" />
                  <span>Click "New Session" in the dashboard</span>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 mt-0.5 text-primary" />
                  <span>Configure session settings</span>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 mt-0.5 text-primary" />
                  <span>Invite participants via link or email</span>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 mt-0.5 text-primary" />
                  <span>Start collaborating!</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Joining Sessions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground mb-4">
                Join existing sessions using invitation links or codes.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 mt-0.5 text-primary" />
                  <span>Receive invitation link or code</span>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 mt-0.5 text-primary" />
                  <span>Click link or enter code in dashboard</span>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 mt-0.5 text-primary" />
                  <span>Verify your access permissions</span>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 mt-0.5 text-primary" />
                  <span>Begin collaborating</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Session Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border">
                <h4 className="font-medium mb-2">Public Sessions</h4>
                <p className="text-sm text-muted-foreground">Open to all users with link</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-medium mb-2">Private Sessions</h4>
                <p className="text-sm text-muted-foreground">Invitation only access</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-medium mb-2">Team Sessions</h4>
                <p className="text-sm text-muted-foreground">Organization members only</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
  "editor": {
    title: "Editor Features",
    icon: Edit3,
    content: (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            Powerful Editing Tools
          </h2>
          <p className="text-muted-foreground">Discover all the features that make our editor special.</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Collaboration</CardTitle>
              <CardDescription>Work together seamlessly with live updates</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• See cursors and selections of other users in real-time</li>
                <li>• Automatic conflict resolution and operational transforms</li>
                <li>• Live commenting and suggestions</li>
                <li>• Presence indicators showing who's online</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Advanced Text Editing</CardTitle>
              <CardDescription>Professional-grade editing capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Formatting</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Rich text formatting</li>
                    <li>• Custom styles and themes</li>
                    <li>• Typography controls</li>
                    <li>• Color and highlighting</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Productivity</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Smart autocomplete</li>
                    <li>• Code syntax highlighting</li>
                    <li>• Find and replace</li>
                    <li>• Version history</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Export & Sharing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-4">
                {["PDF Export", "Word Document", "Markdown"].map((format) => (
                  <div key={format} className="p-3 rounded-lg bg-accent/30 text-center">
                    <div className="font-medium text-sm">{format}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  },
  "shortcuts": {
    title: "Keyboard Shortcuts",
    icon: Keyboard,
    content: (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Keyboard Shortcuts</h2>
          <p className="text-muted-foreground">Master these shortcuts to boost your productivity.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Text Editing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { key: "Ctrl + B", action: "Bold text" },
                  { key: "Ctrl + I", action: "Italic text" },
                  { key: "Ctrl + U", action: "Underline text" },
                  { key: "Ctrl + Z", action: "Undo" },
                  { key: "Ctrl + Y", action: "Redo" },
                  { key: "Ctrl + F", action: "Find in document" }
                ].map((shortcut, index) => (
                  <div key={index} className="flex justify-between items-center py-2">
                    <span className="text-sm">{shortcut.action}</span>
                    <Badge variant="outline" className="font-mono text-xs">
                      {shortcut.key}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { key: "Ctrl + S", action: "Save document" },
                  { key: "Ctrl + O", action: "Open document" },
                  { key: "Ctrl + N", action: "New document" },
                  { key: "Ctrl + P", action: "Print document" },
                  { key: "Ctrl + /", action: "Toggle comments" },
                  { key: "Esc", action: "Exit full screen" }
                ].map((shortcut, index) => (
                  <div key={index} className="flex justify-between items-center py-2">
                    <span className="text-sm">{shortcut.action}</span>
                    <Badge variant="outline" className="font-mono text-xs">
                      {shortcut.key}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Custom Shortcuts</CardTitle>
            <CardDescription>You can customize keyboard shortcuts in your settings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Go to Settings → Preferences → Keyboard Shortcuts to create your own custom shortcuts 
              or modify existing ones to match your workflow.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  },
  "project-management": {
    title: "Project Management",
    icon: FolderOpen,
    content: (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Project Management</h2>
          <p className="text-muted-foreground">Organize your work with powerful project management tools.</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Structure</CardTitle>
              <CardDescription>Organize files and folders efficiently</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border-l-4 border-primary bg-accent/30">
                  <h4 className="font-medium mb-2">Folder Organization</h4>
                  <p className="text-sm text-muted-foreground">
                    Create nested folders to organize your documents and assets logically.
                  </p>
                </div>
                <div className="p-4 rounded-lg border-l-4 border-primary bg-accent/30">
                  <h4 className="font-medium mb-2">File Tagging</h4>
                  <p className="text-sm text-muted-foreground">
                    Use tags to categorize and quickly find related documents.
                  </p>
                </div>
                <div className="p-4 rounded-lg border-l-4 border-primary bg-accent/30">
                  <h4 className="font-medium mb-2">Search & Filter</h4>
                  <p className="text-sm text-muted-foreground">
                    Powerful search capabilities to find any file instantly.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Team Collaboration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm">
                  <li>• Assign team members to projects</li>
                  <li>• Set permissions and access levels</li>
                  <li>• Track project activity and changes</li>
                  <li>• Team notifications and updates</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Version Control</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm">
                  <li>• Automatic version saving</li>
                  <li>• Compare document versions</li>
                  <li>• Restore previous versions</li>
                  <li>• Branch and merge workflows</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  },
  "faq": {
    title: "FAQ",
    icon: HelpCircle,
    content: (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Find answers to common questions about our platform.</p>
        </div>

        <div className="space-y-4">
          {[
            {
              question: "How do I reset my password?",
              answer: "Click 'Forgot Password' on the login page, enter your email, and follow the instructions sent to your inbox."
            },
            {
              question: "Can I work offline?",
              answer: "Limited offline functionality is available. Your work will sync when you reconnect to the internet."
            },
            {
              question: "What file formats are supported?",
              answer: "We support most common formats including DOCX, PDF, TXT, MD, HTML, and various image formats."
            },
            {
              question: "How is my data protected?",
              answer: "We use enterprise-grade encryption, secure servers, and follow industry best practices for data protection."
            },
            {
              question: "Can I cancel my subscription anytime?",
              answer: "Yes, you can cancel your subscription at any time from your account settings. Your access continues until the end of your billing period."
            },
            {
              question: "Is there a mobile app?",
              answer: "Our web application is fully responsive and works great on mobile devices. Native mobile apps are in development."
            }
          ].map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  },
  "contact": {
    title: "Contact / Support",
    icon: Mail,
    content: (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Contact & Support</h2>
          <p className="text-muted-foreground">Get in touch with our team for help and support.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Support Channels</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/30">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Email Support</div>
                    <div className="text-sm text-muted-foreground">support@example.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/30">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Help Center</div>
                    <div className="text-sm text-muted-foreground">Comprehensive guides and tutorials</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Response Times</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Critical Issues</span>
                  <Badge variant="outline">&lt; 2 hours</Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm">General Support</span>
                  <Badge variant="outline">&lt; 24 hours</Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm">Feature Requests</span>
                  <Badge variant="outline">&lt; 3 days</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Submit a Support Ticket</CardTitle>
            <CardDescription>Describe your issue and we'll help you resolve it quickly</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Subject</label>
                  <input 
                    type="text" 
                    placeholder="Brief description of your issue"
                    className="w-full p-2 border rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Priority</label>
                  <select className="w-full p-2 border rounded-md text-sm">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <textarea 
                  placeholder="Please provide detailed information about your issue..."
                  className="w-full p-2 border rounded-md text-sm h-24 resize-none"
                />
              </div>
              <button className="w-full sm:w-auto">Submit Support Ticket</button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
};

const Docs = () => {
  const [activeTab, setActiveTab] = useState("getting-started");

  const tabs = [
    { id: "getting-started", label: "Getting Started", icon: BookOpen },
    { id: "sessions", label: "Sessions", icon: Users },
    { id: "editor", label: "Editor", icon: Edit3 },
    { id: "shortcuts", label: "Shortcuts", icon: Keyboard },
    { id: "project-management", label: "Projects", icon: FolderOpen },
    { id: "faq", label: "FAQ", icon: HelpCircle },
    { id: "contact", label: "Support", icon: Mail }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Navigation Header */}
      <div className="sticky top-0 z-50 bg-docs-nav border-b border-docs-nav-border backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold text-docs-nav-foreground">Documentation</h1>
            </div>
            <button variant="outline" size="sm" asChild>
              <Link href="/">Back to Home</Link>
            </button>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-1 min-w-max">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                      transition-all duration-200 whitespace-nowrap
                      ${isActive 
                        ? 'bg-primary text-primary-foreground shadow-sm' 
                        : 'text-docs-tab-inactive hover:text-docs-nav-foreground hover:bg-accent/50'
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div 
            key={activeTab}
            className="animate-in fade-in-0 slide-in-from-right-2 duration-300"
          >
            {docsData[activeTab as keyof typeof docsData]?.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;
