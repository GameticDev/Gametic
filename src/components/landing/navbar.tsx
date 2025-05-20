import { User } from "lucide-react";
import localFont from "next/font/local";
const racesport = localFont({
  src: "../../fonts/RaceSport.ttf",
  variable: "--font-RaceSport",
});

const Navbar = () => {
  return (
    <div className="fixed w-full pt-3">
        <div className="flex w-full justify-between px-20 relative z-50">
        <div className={`text-white/70 ${racesport.className} absolute top-[23px] tracking-wider`}>
          GameTic!
        </div>
        <div className="flex list-none pl-40">
          <li className="text-[16px] py-5 text-white/70 hover:text-white/85 px-4 font-outfit">
            Home
          </li>
          <li className="text-[16px] py-5 text-white/70 hover:text-white/85 px-4 font-outfit">
            Join
          </li>
          <li className="text-[16px] py-5 text-white/70 hover:text-white/85 px-4 font-outfit">
            Book
          </li>
          <li className="text-[16px] py-5 text-white/70 hover:text-white/85 px-4 font-outfit">
            Tournaments
          </li>
          <li className="text-[16px] py-5 text-white/70 hover:text-white/85 px-4 font-outfit">
            About us
          </li>
        </div>
      <div className="text-[16px] py-5 text-white/70 hover:text-white/85 px-4 font-outfit relative flex">
      <User className="absolute"/>
        <h1 className="pl-7">Sign in/Register</h1>
      </div>
    </div>
    </div>
  );
};

export default Navbar;
