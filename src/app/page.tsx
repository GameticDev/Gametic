import HomePage from "@/components/landing/homePage";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen">
      <div className="h-full relative">
        <HomePage />
      </div>
    </div>
  );
}
