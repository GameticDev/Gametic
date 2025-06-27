import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-screen px-4 overflow-hidden">
      <div className="absolute w-full h-full pointer-events-none">
        <Image
          src={
            "https://images.unsplash.com/photo-1466065665758-d473db752253?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          fill
          alt="hero"
          className="object-cover"
        />
      </div>
      <div className="relative flex-1 max-w-6xl px-2 mx-auto sm:px-4">
        <div className="relative flex flex-col items-center justify-center mb-16 text-center">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-[110px] font-bold tracking-wide mb-5">
              <span className="bg-gradient-to-r from-gray-900 to-[#415C41] bg-clip-text text-transparent">
                Find Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#415C41] to-[#98916D] bg-clip-text text-transparent">
                Game Partner
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-[17px] max-w-full md:max-w-[850px] text-gray-700 leading-relaxed mx-auto px-2">
              Connect with athletes in your area for{" "}
              <span className="font-semibold text-[#415C41]">
                {"football, basketball, tennis".split("").map((char, idx) => (
                  <span
                    key={idx}
                    className="inline-block transition-transform duration-300 hover:-translate-y-1 hover:scale-110"
                  >
                    {char}
                  </span>
                ))}
              </span>{" "}
              and more. Join local tournaments, discover amazing venues, and build your
              sports community - all in one place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
