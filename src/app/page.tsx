import HomePage from "@/components/landing/homePage";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-5 h-screen">
      <div className="h-full relative rounded-xl">
        <HomePage />
      </div>
    </div>
  );
}
