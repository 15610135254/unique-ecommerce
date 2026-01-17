
import React from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';

interface ProductGridProps {
  onSelectProduct: (p: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onSelectProduct }) => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-8">
      {PRODUCTS.map((product) => (
        <div 
          key={product.id}
          className="mb-12 break-inside-avoid group cursor-pointer"
          onClick={() => onSelectProduct(product)}
        >
          <div className="relative overflow-hidden bg-gray-100">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
              <button className="bg-white text-black px-6 py-3 text-xs uppercase tracking-widest shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                加入购物车 Add to Cart
              </button>
            </div>
          </div>
          
          <div className="mt-4 flex justify-between items-start">
            <div>
              <h3 className="text-sm tracking-wide font-normal">{product.name}</h3>
              <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter italic">
                By {product.creator}
              </p>
            </div>
            <p className="text-sm font-light">¥{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
