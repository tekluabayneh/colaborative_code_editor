'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Code, Menu, X } from 'lucide-react';
const NarBar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (
        <header className="sticky top-0 mb-5 z-50 backdrop-blur-lg bg-black/50 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600">
                                <Code className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-white font-semibold text-2xl">CodeSync</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-4">
                        <Link href="/product">Product</Link>
                        <Link href="/resources">Resources</Link>
                        <Link href="/DocDashboard">Docs</Link>
                    </nav>

                    {/* Desktop Sign In Button */}
                    <div className="hidden md:block">
                        <Link href="/Auth">
                            <button className="group cursor-pointer relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-semibold text-white rounded-lg bg-gray-900/80 transition-all duration-300 hover:bg-gray-900 shadow-md hover:shadow-lg hover:shadow-purple-500/20">
                                <div className="absolute top-0 right-full w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 transform group-hover:translate-x-full transition-transform duration-500"></div>
                                <span className="relative">Sign In</span>
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-black/90 backdrop-blur-xl border-b border-white/10">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/product" className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Product</Link>
                        <Link href="/resources" className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Resources</Link>
                        <Link href="/DocDashboard" className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Docs</Link>
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-800">
                        <div className="px-5">
                             <Link href="/Auth">
                                <button className="w-full text-left group relative inline-flex items-center justify-center px-4 py-2.5 overflow-hidden font-semibold text-white rounded-md bg-gray-800 transition-all duration-300 hover:bg-gray-700">
                                    <div className="absolute top-0 right-full w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 transform group-hover:translate-x-full transition-transform duration-500"></div>
                                    <span className="relative">Sign In</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default NarBar;
