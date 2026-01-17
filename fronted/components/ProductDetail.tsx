
import React from 'react';
import { Product } from '../types';
import { MOCK_CREATOR } from '../constants';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart }) => {
  return (
    <div className="px-6 md:px-12 py-8 animate-fade-in">
      <button 
        onClick={onBack}
        className="flex items-center text-xs uppercase tracking-widest mb-12 hover:opacity-50 transition-opacity"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
        </svg>
        返回 Back to Gallery
      </button>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Left: Images */}
        <div className="w-full lg:w-2/3 space-y-4">
          <img src={product.image} alt={product.name} className="w-full object-cover grayscale-[10%]" />
          <div className="grid grid-cols-2 gap-4">
            <img src={`https://picsum.photos/seed/${product.id}detail1/800/800`} className="w-full aspect-square object-cover" />
            <img src={`https://picsum.photos/seed/${product.id}detail2/800/800`} className="w-full aspect-square object-cover" />
          </div>
        </div>

        {/* Right: Info (Sticky) */}
        <div className="w-full lg:w-1/3">
          <div className="lg:sticky lg:top-32 space-y-10">
            <div>
              <div className="flex gap-2 mb-4">
                {product.isOneOfOne && (
                  <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-sm tracking-tighter">1/1 独一件</span>
                )}
                {product.isCustomizable && (
                  <span className="text-[10px] border border-black px-2 py-0.5 rounded-sm tracking-tighter">支持定制</span>
                )}
              </div>
              <h1 className="text-4xl font-light heading-font leading-tight">{product.name}</h1>
              <p className="text-2xl mt-4 font-light">¥{product.price}</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-100 py-2">
                <span className="text-xs text-gray-400 uppercase tracking-widest">材质 Material</span>
                <span className="text-xs">{product.material}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 py-2">
                <span className="text-xs text-gray-400 uppercase tracking-widest">分类 Category</span>
                <span className="text-xs">{product.category}</span>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-gray-600 font-light">
              {product.description}
            </p>

            <button 
              onClick={onAddToCart}
              className="w-full bg-black text-white py-5 text-sm uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors"
            >
              加入购物车 Add to Bag
            </button>
          </div>
        </div>
      </div>

      {/* Creator Card Section */}
      <section className="mt-32 border-t border-gray-100 pt-20">
        <h2 className="text-center text-xs uppercase tracking-[0.4em] text-gray-400 mb-16">关于创作者 About Creator</h2>
        <div className="max-w-4xl mx-auto">
          <img src={MOCK_CREATOR.studioImg} className="w-full h-96 object-cover mb-12 grayscale" />
          <div className="flex flex-col md:flex-row gap-12 items-center md:items-start text-center md:text-left">
            <img src={MOCK_CREATOR.avatar} className="w-24 h-24 rounded-full object-cover grayscale" />
            <div>
              <h3 className="text-2xl font-light mb-4">{MOCK_CREATOR.name}</h3>
              <p className="text-sm text-gray-600 leading-8 italic font-light">
                “{MOCK_CREATOR.bio}”
              </p>
              <button className="mt-8 text-xs border-b border-black uppercase tracking-widest pb-1 hover:text-gray-400 hover:border-gray-400 transition-all">
                关注工作室 Follow Studio
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
