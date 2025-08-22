"use client"
import React, { useState } from 'react';
import  Link from 'next/link';
import { 
  BookOpen, 
  Users, 
  Edit3, 
  Keyboard, 
  HelpCircle, 
  Mail,
  ChevronRight,
  Sparkles,
  Zap,
  Target,
  ArrowLeft,
  Star
} from "lucide-react";

const docsData = {
  "getting-started": {
    title: "Getting Started",
    icon: BookOpen,
    content: (
      <div className="space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2 text-white">Welcome to Our Platform</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Get up and running in minutes with our comprehensive getting started guide. Everything you need to begin your journey.
          </p>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
          <div className="text-center pb-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mb-2">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white">Quick Setup Guide</h3>
            <p className="text-base text-gray-300">Follow these simple steps to get started</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                "Create your account and verify your email",
                "Complete your profile setup",
                "Explore the dashboard and main features",
                "Join your first session or create a project"
              ].map((step, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-xl border border-gray-600">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {index + 1}
                  </div>
                  <span className="font-medium text-gray-200">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-white">
              <Star className="h-5 w-5 text-yellow-400" />
              System Requirements
            </h3>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Modern web browser (Chrome, Firefox, Safari, Edge)",
                "Stable internet connection",
                "JavaScript enabled",
                "Minimum screen resolution: 1024x768"
              ].map((req, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/30">
                  <ChevronRight className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-gray-300">{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  },
  "sessions": {
    title: "Creating & Joining Sessions",
    icon: Users,
    content: (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2 text-white">Session Management</h2>
          <p className="text-lg text-gray-300">Learn how to create and join collaborative sessions with ease.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl hover:shadow-blue-500/10 transition-shadow duration-300 overflow-hidden">
            <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-green-400">Creating Sessions</h3>
              <p className="text-gray-300 mt-2">Start a new collaborative session in just a few clicks</p>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {[
                  "Click 'New Session' in the dashboard",
                  "Configure session settings",
                  "Invite participants via link or email", 
                  "Start collaborating!"
                ].map((step, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-900/20 transition-colors">
                    <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                      <ChevronRight className="h-4 w-4 text-green-400" />
                    </div>
                    <span className="text-sm text-gray-300">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl hover:shadow-blue-500/10 transition-shadow duration-300 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-blue-400">Joining Sessions</h3>
              <p className="text-gray-300 mt-2">Join existing sessions using invitation links or codes</p>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {[
                  "Receive invitation link or code",
                  "Click link or enter code in dashboard",
                  "Verify your access permissions",
                  "Begin collaborating"
                ].map((step, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-900/20 transition-colors">
                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                      <ChevronRight className="h-4 w-4 text-blue-400" />
                    </div>
                    <span className="text-sm text-gray-300">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-xl font-semibold text-white">Session Types</h3>
            <p className="text-gray-300 mt-2">Choose the right session type for your needs</p>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Public Sessions", desc: "Open to all users with link", color: "from-blue-500 to-blue-600" },
                { title: "Private Sessions", desc: "Invitation only access", color: "from-purple-500 to-purple-600" },
                { title: "Team Sessions", desc: "Organization members only", color: "from-green-500 to-green-600" }
              ].map((type, index) => (
                <div key={index} className="p-6 rounded-xl bg-gray-700/50 border border-gray-600 hover:bg-gray-700/70 transition-all duration-300 group">
                  <div className={`w-12 h-12 bg-gradient-to-r ${type.color} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}></div>
                  <h4 className="font-semibold mb-2 text-white">{type.title}</h4>
                  <p className="text-sm text-gray-400">{type.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  },
  "editor": {
    title: "Editor Features",
    icon: Edit3,
    content: (
      <div className="space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-4">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2 text-white">Powerful Editing Tools</h2>
          <p className="text-lg text-gray-300">Discover all the features that make our editor exceptional.</p>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
            <h3 className="text-xl font-semibold mb-2">Real-time Collaboration</h3>
            <p className="text-indigo-100">Work together seamlessly with live updates</p>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "See cursors and selections of other users in real-time",
                "Automatic conflict resolution and operational transforms",
                "Live commenting and suggestions",
                "Presence indicators showing who's online"
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2"></div>
                  <span className="text-sm text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  },
  "shortcuts": {
    title: "Keyboard Shortcuts",
    icon: Keyboard,
    content: (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2 text-white">Keyboard Shortcuts</h2>
          <p className="text-lg text-gray-300">Master these shortcuts to boost your productivity and work faster.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-orange-400">Text Editing</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { key: "Ctrl + B", action: "Bold text" },
                  { key: "Ctrl + I", action: "Italic text" },
                  { key: "Ctrl + U", action: "Underline text" },
                  { key: "Ctrl + Z", action: "Undo" },
                  { key: "Ctrl + Y", action: "Redo" },
                  { key: "Ctrl + F", action: "Find in document" }
                ].map((shortcut, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-600 last:border-0">
                    <span className="text-sm font-medium text-gray-200">{shortcut.action}</span>
                    <span className="font-mono text-xs bg-gray-700 text-gray-300 border border-gray-600 px-2 py-1 rounded">
                      {shortcut.key}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-green-400">Navigation</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { key: "Ctrl + S", action: "Save document" },
                  { key: "Ctrl + O", action: "Open document" },
                  { key: "Ctrl + N", action: "New document" },
                  { key: "Ctrl + P", action: "Print document" },
                  { key: "Ctrl + /", action: "Toggle comments" },
                  { key: "Esc", action: "Exit full screen" }
                ].map((shortcut, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-600 last:border-0">
                    <span className="text-sm font-medium text-gray-200">{shortcut.action}</span>
                    <span className="font-mono text-xs bg-gray-700 text-gray-300 border border-gray-600 px-2 py-1 rounded">
                      {shortcut.key}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  "faq": {
    title: "FAQ",
    icon: HelpCircle,
    content: (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2 text-white">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-300">Find answers to common questions about our platform.</p>
        </div>

        <div className="space-y-6">
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
            <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl hover:bg-gray-700/50 transition-colors duration-300 overflow-hidden">
              <div className="p-6 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  "contact": {
    title: "Contact / Support",
    icon: Mail,
    content: (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2 text-white">Contact & Support</h2>
          <p className="text-lg text-gray-300">Get in touch with our team for help and support.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">Support Channels</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 transition-colors border border-blue-500/20">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-blue-400">Email Support</div>
                  <div className="text-sm text-blue-300">support@example.com</div>
                  <div className="text-xs text-gray-400 mt-1">We typically respond within 24 hours</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-green-500/10 hover:bg-green-500/20 transition-colors border border-green-500/20">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <HelpCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-green-400">Help Center</div>
                  <div className="text-sm text-green-300">Comprehensive guides and tutorials</div>
                  <div className="text-xs text-gray-400 mt-1">Available 24/7</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">Response Times</h3>
              <p className="text-gray-300 mt-2">Our commitment to quick support</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { type: "Critical Issues", time: "< 2 hours", color: "bg-red-500/20 text-red-300 border-red-500/30" },
                  { type: "General Support", time: "< 24 hours", color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" },
                  { type: "Feature Requests", time: "< 3 days", color: "bg-green-500/20 text-green-300 border-green-500/30" }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-gray-700/30 border border-gray-600">
                    <span className="font-medium text-gray-200">{item.type}</span>
                    <span className={`${item.color} border px-2 py-1 rounded text-xs font-medium`}>{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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
    { id: "faq", label: "FAQ", icon: HelpCircle },
    { id: "contact", label: "Support", icon: Mail }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-700/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Documentation</h1>
                <p className="text-sm text-gray-400">Everything you need to get started</p>
              </div>
            </div>
            <Link href={"/"}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-sm font-medium text-gray-300 border border-gray-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
          
          <div className="px-25 w-full overflow-x-auto pb-6">
            <div className="flex gap-2 min-w-max mx-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center cursor-pointer gap-3 px-6 py-3 rounded-xl text-sm font-medium
                      transition-all duration-300 whitespace-nowrap group border
                      ${isActive 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20 scale-105 border-blue-500/50' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-800 hover:border-gray-600 border-gray-700'
                      }
                    `}
                  >
                    <Icon className={`h-4 w-4 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="transform transition-all duration-500 ease-in-out">
          {docsData[activeTab]?.content}
        </div>
      </div>
    </div>
  );
};

export default Docs;
