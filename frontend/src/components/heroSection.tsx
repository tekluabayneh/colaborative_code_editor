import React from 'react';
import { Code2, Users, Zap, Globe } from 'lucide-react';
const HeroSection = () => {
  const features = [
    {
      icon: Code2,
      title: 'Real-time Collaboration',
      description: 'Code together in real-time with live cursors and instant updates'
    },
    {
      icon: Users,
      title: 'Team Management',
      description: 'Invite team members with custom roles and permissions'
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Access your projects from anywhere, anytime'
    }
  ];

  return (
    <div className="text-center space-y-12 mb-16 ">
      <div className="space-y-6">
        <div className="animate-float">
          <h1 className="text-5xl md:text-7xl font-bold gradient-text leading-tight bg-gradient-to-br from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Code Together,
            <br />
            Build Better
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          The most powerful collaborative code editor for modern development teams.
          Invite your teammates and start coding together instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl  lg:ml-36 xl:ml-56"> {features.map((feature, index) => (
          <div
            key={feature.title}
            className="group p-6 rounded-xl bg-card/30 border border-border/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300 hover:scale-105"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="mb-4">
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:animate-pulse">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}


      </div>
    </div>
  );
};

export default HeroSection;









