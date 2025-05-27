import AuthModal from "@/components/auth/authModal";
import HeroSection from "@/components/landing/HeroSection";
import HomePage from "@/components/landing/homePage";
import ProvideBanner from "@/components/landing/ProvideBanner";
import TopNavbar from "@/components/landing/TopNavbar";
import Why from "@/components/landing/Why";
import Image from "next/image";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <div className="bg-[#F0EFEB] w-[100vw]">
      <div className="h-full relative">
        {/* <HomePage /> */}
        <Toaster position="top-right" richColors />
        <TopNavbar />
        <HeroSection />
        <Why />
        <ProvideBanner />
      </div>
    </div>
  );
}
