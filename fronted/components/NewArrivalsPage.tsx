
import React from 'react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

interface NewArrivalsPageProps {
  onSelectProduct: (p: Product) => void;
}

const NewArrivalsPage: React.FC<NewArrivalsPageProps> = ({ onSelectProduct }) => {
  // Sort or filter new products (simulated here)
  const newProducts = [...PRODUCTS].reverse();

  return (
    <div className="animate-fade-in pb-24">
      {/* Featured New Section */}
      <section className="h-[60vh] flex flex-col md:flex-row mb-24">
        <div className="w-full md:w-1/2 h-full bg-[#1A1A1A] text-white flex flex-col justify-center px-12 md:px-24">
          <span className="text-[10px] tracking-[0.5em] text-gray-500 mb-6 uppercase">Featured New</span>
          <h1 className="text-5xl font-extralight heading-font mb-8 leading-tight">侘寂之美：本月新品系列</h1>
          <p className="text-sm text-gray-400 font-light leading-relaxed mb-12 max-w-sm">
            本季我们走访了景德镇与苏南的手工作坊，为您带来了十余件带有泥土与草木温度的全新作品。
          </p>
          <button 
            onClick={() => onSelectProduct(newProducts[0])}
            className="w-fit border-b border-white pb-1 text-xs uppercase tracking-widest hover:text-gray-400 hover:border-gray-400 transition-all"
          >
            探索首发作品 Explore
          </button>
        </div>
        <div className="w-full md:w-1/2 h-full">
          <img src={newProducts[0].image} className="w-full h-full object-cover grayscale" />
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center space-x-4 mb-16">
          <div className="h-[1px] w-12 bg-black"></div>
          <span className="text-xs uppercase tracking-[0.3em]">本周上架 / Weekly Drop</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          {newProducts.slice(1).map((product, idx) => (
            <div 
              key={product.id} 
              className={`group cursor-pointer ${idx % 2 !== 0 ? 'md:mt-24' : ''}`}
              onClick={() => onSelectProduct(product)}
            >
              <div className="relative overflow-hidden mb-8">
                <img src={product.image} className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute bottom-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="bg-white text-black text-[10px] px-6 py-3 uppercase tracking-widest shadow-2xl">
                     查看细节 Details
                   </button>
                </div>
              </div>
              <div className="flex justify-between items-start border-l border-gray-100 pl-6">
                <div>
                  <h3 className="text-lg font-light mb-2">{product.name}</h3>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">{product.creator}</p>
                </div>
                <p className="text-lg font-light">¥{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivalsPage;
