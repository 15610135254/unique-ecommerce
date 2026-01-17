
import React from 'react';
import { CATEGORIES } from '../constants';

const CategoryBubbles: React.FC = () => {
  return (
    <section className="py-20 px-6 md:px-12">
      <div className="flex flex-wrap justify-center gap-8 md:gap-16">
        {CATEGORIES.map((cat) => (
          <div 
            key={cat.id} 
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border border-transparent group-hover:border-black transition-all duration-500 mb-4 p-1">
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <span className="text-xs uppercase tracking-widest font-light">{cat.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryBubbles;
