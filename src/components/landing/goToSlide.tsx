"use client"
import { useState, useEffect } from 'react';

export default function HeroImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const images = [
    "https://res.cloudinary.com/dup1lh7xk/image/upload/v1747132558/hero_ehgykt.jpg",
    "https://res.cloudinary.com/dup1lh7xk/image/upload/v1746870103/tennis-7352345_1280_bzdos6.jpg",
    "https://res.cloudinary.com/dup1lh7xk/image/upload/v1747132558/hero_ehgykt.jpg"
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  const goToSlide = (index:number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="absolute object-cover top-0 left-0 z-10 overflow-hidden">
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full " 
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((src, index) => (
          <div key={index} className="min-w-full h-full flex-shrink-0 ">
            <img 
              src={src} 
              alt={`Hero slide ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      <div className="absolute left-26  top-3/4 transform -translate-y-1/2 flex gap-3 items-center   ">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-white w-4 h-4' 
                : 'bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
    </div>
  );
}