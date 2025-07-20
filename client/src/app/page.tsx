import "../styles/globals.css"
import React from "react";
import NarBar from "../components/NavBar";
import Footer from "../components/Footer";
import heroReviewImage  from "../../../assets/this-one-can-be-for-landing-also-for-main-folder-structure.png"
import Image from "next/image";
import FAQ from "@/components/FAQ";
import RealTimeCollaboration from "../components/RealTimeColaboration";
import Folder_tree from "@/components/folder_tree";

const documents= [
  // User A's root folder
  {
    _id: "1",
    name: "main_folder",
    type: "folder",
    parentId: null,
    ownerId: "userA"
  },
  // Subfolder in main_folder
  {
    _id: "2",
    name: "project_alpha",
    type: "folder",
    parentId: "1",
    ownerId: "userA"
  },
  {
    _id: "3",
    name: "assets",
    type: "folder",
    parentId: "1",
    ownerId: "userA"
  },
  // Files in project_alpha
  {
    _id: "4",
    name: "index.html",
    type: "file",
    parentId: "2",
    ownerId: "userA",
    extension: "html",
    content: "<html></html>"
  },
  {
    _id: "5",
    name: "app.js",
    type: "file",
    parentId: "2",
    ownerId: "userA",
    extension: "js",
    content: "console.log('Hello');"
  },
  // Files in assets
  {
    _id: "6",
    name: "logo.png",
    type: "file",
    parentId: "3",
    ownerId: "userA",
    extension: "png",
    content: ""
  },
  // File directly in main_folder
  {
    _id: "7",
    name: "README.md",
    type: "file",
    parentId: "1",
    ownerId: "userA",
    extension: "md",
    content: "# Welcome"
  },

  // Another user: User B
  {
    _id: "10",
    name: "main_folder",
    type: "folder",
    parentId: null,
    ownerId: "userB"
  },
  {
    _id: "11",
    name: "blog_site",
    type: "folder",
    parentId: "10",
    ownerId: "userB"
  },
  {
    _id: "12",
    name: "main.py",
    type: "file",
    parentId: "11",
    ownerId: "userB",
    extension: "py",
    content: "print('Blog running')"
  }
];



const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
        {/* Navigation Bar */}
<NarBar/>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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
            <button className="bg-white text-black px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
               Register 
            </button>
            <button className="border border-gray-600 text-white px-8 py-3 rounded-md font-medium hover:border-gray-400 transition-colors flex items-center space-x-2">
              <span>Start today for free</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Product Demo Image */}
        <div className="flex justify-center mb-16">
          <div className="relative">
            <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-1 rounded-lg">
                             Collaborate in real-time. Code faster. Build together.
            </div>
          </div>
        </div>
               
             <div className="w-full m-2 min-h-screen">
                    <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-1 rounded-lg">
                        <Image  src={heroReviewImage} alt="image of CodeSync preview" className="w-full h-screen" />
                    </div>
                </div>

        {/* FAQ */}
                <FAQ/>
  <RealTimeCollaboration/>


                <Folder_tree Documents={documents}/>
            </main>



            
            <Footer/>
        </div>
    );
};

export default LandingPage;
