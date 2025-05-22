import AuthModal from "@/components/auth/authModal";
import HeroSection from "@/components/landing/HeroSection";
import HomePage from "@/components/landing/homePage";
import ProvideBanner from "@/components/landing/ProvideBanner";
import TopNavbar from "@/components/landing/TopNavbar";
import Why from "@/components/landing/Why";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#F0EFEB]">
      <div className="h-full relative">
        {/* <HomePage /> */}
        <TopNavbar />
        <HeroSection />
        <Why />
        <ProvideBanner />
      </div>
    </div>
  );
}
