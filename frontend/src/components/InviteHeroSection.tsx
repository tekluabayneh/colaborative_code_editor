import React from 'react';
import { Crown, UserPlus, ShieldCheck, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="space-y-10">
      {/* Premium status indicator */}
      <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-indigo-500/10 border border-violet-500/20 backdrop-blur-xl">
        <div className="w-2 h-2 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full animate-pulse"></div>
        <Crown className="w-5 h-5 text-violet-400" />
        <span className="text-sm font-medium text-violet-200 tracking-wide">Administrative Access</span>
      </div>

      {/* Hero headline with sophisticated typography */}
      <div className="space-y-6">
        <h1 className="text-6xl lg:text-7xl font-thin text-white leading-[0.9] tracking-tight">
          Invite
          <span className="block font-light bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mt-2">
            Excellence
          </span>
        </h1>
        
        <p className="text-xl text-gray-300 leading-relaxed max-w-xl font-light">
          Curate your team with precision. Grant access to exceptional individuals and define their journey within your organization.
        </p>
      </div>

      {/* Premium feature showcase */}
      <div className="space-y-6 pt-8">
        <div className="flex items-center gap-6 group cursor-pointer">
          <div className="relative">
            <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-violet-500/20 to-purple-600/20 border border-violet-500/30 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              <UserPlus className="w-7 h-7 text-violet-300" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full opacity-75 animate-ping"></div>
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-medium text-white group-hover:text-violet-200 transition-colors duration-300">Seamless Integration</h3>
            <p className="text-gray-400 font-light">Onboard new talent effortlessly with intelligent workflows</p>
          </div>
        </div>

        <div className="flex items-center gap-6 group cursor-pointer">
          <div className="relative">
            <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border border-blue-500/30 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              <ShieldCheck className="w-7 h-7 text-blue-300" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-75 animate-ping" style={{ animationDelay: '0.5s' }}></div>
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-medium text-white group-hover:text-blue-200 transition-colors duration-300">Granular Permissions</h3>
            <p className="text-gray-400 font-light">Define precise access levels with enterprise-grade security</p>
          </div>
        </div>

        <div className="flex items-center gap-6 group cursor-pointer">
          <div className="relative">
            <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-600/20 border border-emerald-500/30 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              <Sparkles className="w-7 h-7 text-emerald-300" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-75 animate-ping" style={{ animationDelay: '1s' }}></div>
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-medium text-white group-hover:text-emerald-200 transition-colors duration-300">Instant Activation</h3>
            <p className="text-gray-400 font-light">Real-time invitation delivery with automated provisioning</p>
          </div>
        </div>
      </div>

      {/* Elegant metrics display */}
      <div className="pt-12 border-t border-gray-700/50">
        <div className="grid grid-cols-3 gap-8">
          <div className="text-center space-y-2">
            <div className="text-2xl font-light text-white">2.4k+</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Active Users</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-light text-white">99.9%</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Uptime</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-light text-white">24/7</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}
