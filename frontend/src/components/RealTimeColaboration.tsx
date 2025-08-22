import React from 'react';
import { Code, Users, Zap } from 'lucide-react';

const RealTimeCollaboration = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content Section */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">Real-time Collaboration</span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight">
                Code together,
                <br />
                ship faster.
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                Experience seamless real-time collaboration. See changes instantly as your team codes together.
              </p>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-300">Live editing</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-300">Team presence</span>
              </div>
            </div>
          </div>

          {/* Code Editor Mockup */}
          <div className="relative">
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
              {/* Editor Header */}
              <div className="bg-slate-700/50 px-6 py-4 border-b border-slate-600/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-300 font-medium">App.jsx</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full border-2 border-slate-800 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">J</span>
                      </div>
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full border-2 border-slate-800 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">S</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">2 online</span>
                  </div>
                </div>
              </div>

              {/* Code Content */}
              <div className="bg-slate-900/80 p-6 font-mono text-sm relative">
                <div className="space-y-1">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500 w-6 text-right">1</span>
                    <span className="text-purple-400">import</span>
                    <span className="text-gray-300">React from</span>
                    <span className="text-green-400">'react'</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500 w-6 text-right">2</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500 w-6 text-right">3</span>
                    <span className="text-purple-400">function</span>
                    <span className="text-yellow-300">App</span>
                    <span className="text-gray-300">() {'{'}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500 w-6 text-right">4</span>
                    <span className="ml-4 text-purple-400">return</span>
                    <span className="text-gray-300">(</span>
                  </div>
                  
                  <div className="flex items-center gap-4 relative">
                    <span className="text-gray-500 w-6 text-right">5</span>
                    <span className="ml-8 text-gray-300">&lt;</span>
                    <span className="text-red-400">div</span>
                    <span className="text-blue-400">className</span>
                    <span className="text-gray-300">=</span>
                    <span className="text-green-400">"app"</span>
                    <span className="text-gray-300">&gt;</span>
                    <div className="absolute -top-1 right-0 bg-blue-500 text-white px-2 py-1 rounded text-xs animate-pulse">
                      Jon editing
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500 w-6 text-right">6</span>
                    <span className="ml-12 text-gray-300">&lt;</span>
                    <span className="text-red-400">h1</span>
                    <span className="text-gray-300">&gt;</span>
                    <span className="bg-purple-500/20 border border-purple-500/40 px-1 rounded">
                      <span className="text-gray-300">Collaborative</span>
                    </span>
                    <span className="text-gray-300"> App&lt;</span>
                    <span className="text-red-400">h1</span>
                    <span className="text-gray-300">&gt;</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500 w-6 text-right">7</span>
                    <span className="ml-8 text-gray-300">&lt;</span>
                    <span className="text-red-400">div</span>
                    <span className="text-gray-300">&gt;</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500 w-6 text-right">8</span>
                    <span className="ml-4 text-gray-300">)</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500 w-6 text-right">9</span>
                    <span className="text-gray-300">{'}'}</span>
                  </div>
                </div>

                {/* Cursor indicators */}
                <div className="absolute top-20 right-8">
                  <div className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium animate-bounce">
                    Sophie
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeCollaboration;
