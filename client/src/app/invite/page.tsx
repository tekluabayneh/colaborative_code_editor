import React from 'react';
import HeroSection from "../../components/heroSection"
import InviteForm from "../../components/inviteForm"

const Invite = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/90 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>


        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>



        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>



      {/* Grid pattern overlay */}
      <div  
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      ></div>

      <div className="relative  w-full  mx-auto lg:ml-[15rem]  lg:w-[60rem] xl:w-[75rem]  container px-4 py-16">
        <HeroSection />
        <InviteForm />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>


    </div>
  );
};

export default Invite;
