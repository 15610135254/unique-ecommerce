
import React from 'react';
import { Product } from '../types';
import { useProducts } from '../src/hooks/useProducts';

interface ProductGridProps {
  onSelectProduct: (p: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onSelectProduct }) => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-2 border-black border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-xs text-gray-400 uppercase tracking-widest">加载中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-24">
        <p className="text-xs text-red-400">加载失败: {error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center py-24">
        <p className="text-xs text-gray-400">暂无商品</p>
      </div>
    );
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="mb-12 break-inside-avoid group cursor-pointer"
          onClick={() => onSelectProduct(product)}
        >
          <div className="relative overflow-hidden bg-gray-100">
            <img
              src={product.image || product.imageUrl}
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
