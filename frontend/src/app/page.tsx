 "use client"
import "../styles/globals.css"
import React from "react";
import NarBar from "../components/NavBar";
import Footer from "../components/Footer";
import FAQ from "@/components/FAQ";
import RealTimeCollaboration from "../components/RealTimeColaboration";
import LandingTab from "@/components/DashboardTab";
import Link from "next/link";
import { useState } from "react";
const LandingPage = () => {
	const [toggleEditor, setoggleEditor]  = useState(true)
	return (
		<div className="z-10 relative min-h-screen bg-black text-white">
			 <div className="fixed -z-10 inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"></div>
			<div className="fixed -z-10 inset-0 bg-gradient-to-tr from-black via-transparent to-purple-800/10"></div>
			<div className="fixed -z-10 top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
			<div className="fixed -z-10 bottom-0 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>

			{/* Navigation Bar */}
			<div className="z-50">
			<NarBar/>
			 </div>

			{/* Hero Section */}
			<main className="max-w-7xl mx-auto px-2 sm:px-3 z-50">
				<div className="flex justify-center mb-12">
					<div className="flex items-center space-x-2 text-sm text-gray-400">
						<span>New</span>
						<span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
							CodeSync 0.1 is here
						</span>
						<span>→</span>
					</div>
				</div>

				{/* Main Heading */}
				<div className="text-center mb-8">
					<h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
						Ready-made AI copilots and
						<br />
						collaboration for your product
					</h1>

					<p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
						CodeSync gives you ready-made features like AI Copilots, Comments, and{' '}
						<span className="text-purple-400">Multiplayer Editing</span> to make your product more engaging and grow your business.
					</p>

				 		{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-24">
						<button className="group relative overflow-hidden bg-white text-black px-10 py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-2xl shadow-white/20">
							<div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
							<Link href="/Auth" className="relative z-10">
								Register Now
							</Link>
						</button>
						<button className="group relative overflow-hidden border-2 border-white/20 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:border-white/40 transition-all duration-300 bg-white/5 backdrop-blur-sm">
							<div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
							<Link href="/Auth" className="relative z-10 flex items-center space-x-3">
								<span>Start today for free</span>
								<span className="group-hover:translate-x-1 transition-transform duration-300 text-purple-400">→</span>
							</Link>
						</button>
					</div>
				</div>

				<div className="flex justify-center mb-16 z-10">
					<div className="relative">
						{/* Glassmorphism Heading */}
						<div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl px-8 py-4 shadow-lg">
							<h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
								Next-Gen Monaco Editor — Supercharged with AI
							</h1>
						</div>
					</div>
				</div>

				{/* landing tab   */}
				<LandingTab toggleEditor={toggleEditor}/>

				{/* Enhanced Toggle Buttons */}
				<div className="flex justify-center mb-20 mt-4">
					<div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-full p-2 flex items-center gap-2">
						<button 
							onClick={() => setoggleEditor(false)}
							className={`px-8 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer ${
								!toggleEditor 
									? 'bg-white text-black shadow-lg shadow-white/20' 
									: 'text-gray-300 hover:text-white hover:bg-white/10'
							}`}
						>
							Code Editor
						</button>
						<button 
							onClick={() => setoggleEditor(true)}
							className={`px-8 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer ${
								toggleEditor 
									? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/30' 
									: 'text-gray-300 hover:text-white hover:bg-white/10'
							}`}
						>
							Custom Editor
						</button>
					</div>
				</div>

				{/* FAQ */}
				<FAQ/>
				<RealTimeCollaboration/>
			</main>
			 <div className="z-10">
			<Footer/>
			 </div>
		</div>
	);
};

export default LandingPage;
