
import React, { useState, useEffect } from 'react';

const HERO_IMAGES = [
  {
    url: 'https://picsum.photos/seed/hero1/1600/900',
    text: '寻找指尖的温度',
    sub: 'Craftsmanship in your hands'
  },
  {
    url: 'https://picsum.photos/seed/hero2/1600/900',
    text: '独一无二的纯粹',
    sub: 'The beauty of uniqueness'
  }
];

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[80vh] w-full overflow-hidden px-6 md:px-12 mt-4">
      {HERO_IMAGES.map((img, idx) => (
        <div 
          key={idx}
          className={`absolute inset-x-6 md:inset-x-12 inset-y-0 transition-opacity duration-1000 ease-in-out ${idx === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <img 
            src={img.url} 
            alt="Hero" 
            className="w-full h-full object-cover grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-black/10 flex flex-col justify-center items-center text-white text-center">
            <h1 className="text-4xl md:text-6xl font-light heading-font mb-4 tracking-widest animate-fade-in">
              {img.text}
            </h1>
            <p className="text-sm uppercase tracking-[0.4em] font-extralight opacity-80">
              {img.sub}
            </p>
          </div>
        </div>
      ))}

      {/* Thin Progress Bar */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-white/30">
        <div 
          className="h-full bg-white transition-all duration-[6000ms] linear"
          style={{ width: '100%' }}
          key={current}
        ></div>
      </div>
    </section>
  );
};

export default Hero;
