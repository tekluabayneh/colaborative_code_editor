import Image from "next/image";
import  heroReviewImage from "../../../assets/editor_image.png"

const LandingTab = () => {
  return (
    <div
      className="HeroCarousel-content p-10 px-2 flex items-center rounded-md  w-full min-h-screen relative overflow-hidden"
      style={{ background: "radial-gradient(141.53% 114.68% at 87.46% 55.27%, #9A7CFF 36.75%, rgba(14, 10, 162, 0) 100%)", }} >

      {/* Glow at top */}
      <div className="absolute top-0 left-0 w-full h-32 pointer-events-none bg-gradient-to-b from-[#9A7CFF]/50 to-transparent blur-2xl" />

      {/* Glow at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none bg-gradient-to-t from-[#9A7CFF]/50 to-transparent blur-2xl" />

      {/* Content box */}
      <div className="w-full h-full p-4 bg-white/15 border border-solid border-[#8c93fb] border-r-0 border-b-0 rounded-lg shadow-[0_0_40px_rgba(154,124,255,0.6)]">

        <Image src={heroReviewImage} alt="image of CodeSync preview" className="w-full h-screen object-contain object-fill rounded-lg"
        />
      </div>
    </div>
  );
};

export default LandingTab;

