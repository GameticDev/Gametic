"use client";
import { useEffect } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";

const CircularText = ({
  text,
  spinDuration = 20,
  onHover = "speedUp",
}: {
  text: string;
  spinDuration?: number;
  onHover?: "slowDown" | "speedUp" | "pause" | "goBonkers";
}) => {
  const controls = useAnimation();
  const rotation = useMotionValue(0);
  const letters = [...text];

  const getTransition = (speed: number, from: number) => ({
    rotate: {
      from,
      to: from + 360,
      ease: "linear",
      duration: speed,
      repeat: Infinity,
    },
    scale: { type: "spring", damping: 20, stiffness: 300 },
  });

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  },);

  const speeds = {
    slowDown: spinDuration * 2,
    speedUp: spinDuration / 4,
    pause: 999999,
    goBonkers: spinDuration / 20,
  };

  const handleHover = (fast = true) => {
    const start = rotation.get();
    const speed = fast ? speeds[onHover] || spinDuration : spinDuration;
    controls.start({
      rotate: start + 360,
      scale: onHover === "goBonkers" && fast ? 0.8 : 1,
      transition: getTransition(speed, start),
    });
  };

  return (
    <motion.div
     className="fixed top-20 right-4 w-[140px] h-[140px] rounded-full"


      style={{ rotate: rotation }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <div className="relative w-full h-full">
        {letters.map((char, i) => {
          const angle = (360 / letters.length) * i;
          const radius = 55;
          const center = 70; 
          const x = Math.cos((angle * Math.PI) / 180) * radius + center;
          const y = Math.sin((angle * Math.PI) / 180) * radius + center;

          return (
            <span
              key={i}
              className="absolute text-[14px] font-semibold bg-gradient-to-r from-[#7ca971] to-[#a69b71] bg-clip-text text-transparent"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
    </motion.div>
  );
};

export default CircularText;
