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
  console.log("from the main",toggleEditor)
	return (
		<div className="min-h-screen bg-black text-white">
			{/* Navigation Bar */}
			<NarBar/>

			{/* Hero Section */}
			<main className="max-w-7xl mx-auto px-2 sm:px-3">
				{/* Announcement Bar */}
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
					<div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-20">
						<button className="bg-white cursor-pointer hover:bg-gray-100 text-black px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
						<Link href={"/Auth"}> Register </Link>	
						</button>
						<button className="border border-gray-600 cursor-pointer text-white px-8 py-3 rounded-md font-medium hover:border-gray-400 transition-colors flex items-center space-x-2">
							<Link href={"/Auth"} className="flex items-center justify-center gap-2"> 
							<span>Start today for free</span>
							<span>→</span>
							</Link>
						</button>
					</div>
				</div>

				<div className="flex justify-center mb-16">
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
				<div className="w-96 h-10 mt-2 p-3 rounded-[10rem] flex items-center justify-center gap-10 mx-auto border border-[]"> 
					<h1 onClick={() => setoggleEditor(false)} className="border hover:bg-gray-100/50 cursor-pointer rounded-[5rem] px-1 px-6 font-medium ">code</h1>
					<h1 onClick={() => setoggleEditor(true)}  className="border hover:bg-gray-100/50 cursor-pointer rounded-[5rem] px-1 px-6 font-medium ">custom edito</h1>
				</div>

				{/* FAQ */}
				<FAQ/>
				<RealTimeCollaboration/>
			</main>
			<Footer/>
		</div>
	);
};

export default LandingPage;
