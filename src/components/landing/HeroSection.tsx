import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="w-full pr-20 xl:h-screen flex items-center justify-between ">
      <div className="relative">
        <div className=" pl-20 flex flex-col justify-center mb-16">
          <div className="">
            <h1 className="text-9xl tracking-wide mb-5 leading-28">
              Blaze to <br /> the victory
            </h1>
            <p className="text-[17px] pl-3 w-[850px] mb-5">
              This isn`t just a platform — it`s where passion meets purpose. A
              space built for players who live for the thrill of the game, the
              spirit of teamwork, and the rush of competition - it`s a movement,
              a community, and your home for all things sport.
            </p>
            <div className="pl-3">
              <div className="p-2 bg-[#00423d] w-[150px] flex justify-center text-white rounded-3xl">
                Get Started
              </div>
            </div>
          </div>
        </div>
        <div className="py-4 bg-[#98916d]/20 absolute w-[80vw] pl-22 -bottom-20 ">
          <h1 className="text-3xl font-medium italic tracking-wider mb-2">300+ Active Users</h1>
          <p className="text-[17px]">
            Join our vibrant commnunity of over 300+ users who trust us for
            insightful, high <br /> quality sports content{" "}
          </p>
        </div>
      </div>
      <div className="h-screen flex items-center pt-16 z-10">
        <div className="h-[600px] w-[450px] overflow-hidden rounded-3xl">
          <Image
            src={
              "https://res.cloudinary.com/dup1lh7xk/image/upload/v1747632813/photo-1628779238951-be2c9f2a59f4_sidiuw.jpg"
            }
            height={550}
            width={550}
            alt="Hero image"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
