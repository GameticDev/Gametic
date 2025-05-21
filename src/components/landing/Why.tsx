import { Handshake } from "lucide-react";
import Image from "next/image";

const Why = () => {
  return (
    <div className="w-full px-22 h-screen flex flex-col justify-center items-center">
      <div className="w-full flex justify-between mb-10">
        <h1 className="text-6xl whitespace-nowrap tracking-wider">
          Why choose us?
        </h1>
        <p className="text-[17px] max-w-3xl mt-3">
          We offer seamless venue booking, easy game joining, and access to
          competitive tournaments — all in one powerful platform built for
          sports enthusiasts.
        </p>
      </div>
      <div className="w-full grid grid-cols-3 gap-5">
        <div className="bg-[#98916d]/90 text-white rounded-3xl p-10">
          <h1 className="text-3xl tracking-wide mb-3">
            Book Venues, <br />
            Play Anywhere
          </h1>
          <p className="text-[14px]">
            Quickly find and reserve high-quality sports venues that suit your
            schedule and sport. Hassle-free booking tailored for players and
            organizers.
          </p>
        </div>
        <div className="bg-black rounded-3xl overflow-hidden relative">
          <Image
            src={
              "https://res.cloudinary.com/dup1lh7xk/image/upload/v1747648380/photo-1599586120429-48281b6f0ece_oahke7.jpg"
            }
            alt="football"
            fill
            className="object-cover"
          />
        </div>
        <div className="bg-[#00423d]/90 text-white rounded-3xl p-10">
          <h1 className="text-3xl tracking-wide mb-3">
            Create Tournaments,
            <br /> Chase Glory
          </h1>
          <p className="text-[14px]">
            Build and manage your own tournaments or join existing ones. From
            casual competitions to serious showdowns — it all happens here.
          </p>
        </div>
        <div className="bg-black rounded-3xl overflow-hidden relative">
            <Image
            src={
              "https://res.cloudinary.com/dup1lh7xk/image/upload/v1747648482/photo-1486286701208-1d58e9338013_dnomkf.jpg"
            }
            alt="football"
            fill
            className="object-cover"
          />
        </div>
        <div className="col-span-2 bg-[#415c41]/90 rounded-3xl text-white p-10 flex gap-28">
          <div>
            <h1 className="text-3xl tracking-wide mb-3">
              {" "}
              Host Games, Join the Action
            </h1>
            <p className="text-[14px]">
              Take control of your game day by hosting your own matches — set the time, location, and format. Or jump into games organized by others to meet new players, challenge your skills, and stay active in the community. Whether it's a quick pickup game or a planned showdown, you're always just a few clicks away from the action.
            </p>
          </div>
          <div>
            <Handshake size={150} className="text-white/80" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Why;
