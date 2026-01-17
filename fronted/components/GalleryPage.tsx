
import React, { useState } from 'react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { Product } from '../types';

interface GalleryPageProps {
  onSelectProduct: (p: Product) => void;
}

const GalleryPage: React.FC<GalleryPageProps> = ({ onSelectProduct }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory || p.material === activeCategory);

  return (
    <div className="animate-fade-in px-6 md:px-12 py-12">
      <header className="mb-20">
        <h1 className="text-4xl font-light heading-font tracking-widest mb-4">分类浏览</h1>
        <p className="text-gray-400 text-xs uppercase tracking-[0.4em]">Gallery & Materials</p>
      </header>

      {/* Material/Category Quick Selection */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-20">
        <div 
          onClick={() => setActiveCategory('All')}
          className={`relative h-32 cursor-pointer overflow-hidden group transition-all duration-500 ${activeCategory === 'All' ? 'ring-1 ring-black ring-offset-4' : ''}`}
        >
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <span className="relative z-10 text-[10px] uppercase tracking-widest">全部作品</span>
          </div>
        </div>
        {CATEGORIES.map(cat => (
          <div 
            key={cat.id}
            onClick={() => setActiveCategory(cat.name)}
            className={`relative h-32 cursor-pointer overflow-hidden group transition-all duration-500 ${activeCategory === cat.name ? 'ring-1 ring-black ring-offset-4' : ''}`}
          >
            <img src={cat.image} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-60 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
              <span className="relative z-10 text-white text-[10px] uppercase tracking-widest drop-shadow-md font-bold">{cat.name}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-12">
        {filteredProducts.map((product) => (
          <div 
            key={product.id}
            className="mb-16 break-inside-avoid group cursor-pointer"
            onClick={() => onSelectProduct(product)}
          >
            <div className="relative overflow-hidden aspect-[4/5] bg-gray-50 mb-6">
              <img 
                src={product.image} 
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
              />
              <div className="absolute top-4 left-4">
                <span className="text-[9px] bg-white/80 backdrop-blur-sm px-2 py-1 tracking-tighter uppercase">{product.material}</span>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-sm font-light tracking-wide">{product.name}</h3>
                <p className="text-[10px] text-gray-400 mt-1 italic uppercase tracking-tighter">By {product.creator}</p>
              </div>
              <span className="text-sm font-extralight">¥{product.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
