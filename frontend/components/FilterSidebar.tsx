
import React from 'react';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/20 z-[60] transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[70] transition-transform duration-700 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} shadow-2xl p-12 custom-scrollbar overflow-y-auto`}>
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-xl heading-font font-light uppercase tracking-widest">筛选 Filter</h2>
          <button onClick={onClose} className="hover:rotate-90 transition-transform duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-12">
          {/* Categories */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-6">分类 Categories</h3>
            <div className="flex flex-wrap gap-3">
              {['居家装饰', '配饰首饰', '独立刊物', '手工包袋'].map(cat => (
                <button key={cat} className="px-4 py-2 border border-gray-100 text-[10px] hover:border-black transition-colors uppercase">
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Condition */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-6">成色 Condition</h3>
            <div className="space-y-4">
              <label className="flex items-center space-x-3 text-sm font-light cursor-pointer">
                <input type="checkbox" className="form-checkbox h-4 w-4 border-gray-300 rounded focus:ring-black accent-black" />
                <span>原创新品 Original New</span>
              </label>
              <label className="flex items-center space-x-3 text-sm font-light cursor-pointer">
                <input type="checkbox" className="form-checkbox h-4 w-4 border-gray-300 rounded focus:ring-black accent-black" />
                <span>中古孤品 Vintage Unique</span>
              </label>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-6">特色 Features</h3>
            <div className="space-y-4">
              <label className="flex items-center space-x-3 text-sm font-light cursor-pointer">
                <input type="checkbox" className="form-checkbox h-4 w-4 border-gray-300 rounded focus:ring-black accent-black" />
                <span>仅此一件 (1/1)</span>
              </label>
              <label className="flex items-center space-x-3 text-sm font-light cursor-pointer">
                <input type="checkbox" className="form-checkbox h-4 w-4 border-gray-300 rounded focus:ring-black accent-black" />
                <span>支持定制 Customizable</span>
              </label>
            </div>
          </div>

          <button className="w-full bg-black text-white py-4 text-xs uppercase tracking-widest mt-12">
            应用筛选 Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
