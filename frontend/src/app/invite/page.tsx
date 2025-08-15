import React from 'react';
import HeroSection from '../../components/InviteHeroSection';
import InviteForm from '../../components/inviteForm';

export default function Invite() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Elegant floating orbs */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-violet-500/20 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-gradient-to-br from-blue-500/15 to-cyan-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-teal-600/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-pink-500/8 to-rose-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '6s' }}></div>
      </div>

      {/* Sophisticated mesh gradient overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3), transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3), transparent 50%)
          `
        }}
      ></div>

      {/* Ultra-fine grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      ></div>

      {/* Main content area */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen gap-20 lg:gap-32">
          {/* Left side - Hero content */}
          <div className="flex-1 max-w-2xl">
            <HeroSection />
          </div>

          {/* Right side - Form */}
          <div className="flex-1 max-w-lg w-full">
            <InviteForm />
          </div>
        </div>
      </div>

      {/* Elegant bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
    </div>
  );
}
