
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-24 pb-12 px-6 md:px-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
        {/* Left: Brand */}
        <div>
          <Link to="/" className="text-2xl heading-font font-bold tracking-[0.3em]">U N I Q U E</Link>
          <p className="text-gray-400 text-sm font-light leading-relaxed max-w-xs mt-8">
            致力于发现并呈现独立创作者的作品。在这里，每一件器物都承载着指尖的温度与灵感。
          </p>
        </div>

        {/* Center: Links */}
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest mb-6">服务 Service</h3>
            <ul className="text-gray-400 text-[10px] space-y-3 uppercase tracking-widest">
              <li><Link to="/policy" className="hover:text-white transition-colors">配送与退换 Policies</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">常见问题 FAQ</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest mb-6">发现 Explore</h3>
            <ul className="text-gray-400 text-[10px] space-y-3 uppercase tracking-widest">
              <li><Link to="/story" className="hover:text-white transition-colors">品牌故事 Story</Link></li>
              <li><Link to="/artists" className="hover:text-white transition-colors">创作者名录 Artists</Link></li>
              <li><Link to="/bespoke" className="hover:text-white transition-colors">定制服务 Bespoke</Link></li>
            </ul>
          </div>
        </div>

        {/* Right: Contact */}
        <div className="space-y-8">
          <h3 className="text-xs uppercase tracking-widest mb-6">订阅 Subscription</h3>
          <div className="flex border-b border-gray-700 pb-2">
            <input
              type="email"
              placeholder="YOUR EMAIL"
              className="bg-transparent text-xs w-full focus:outline-none placeholder:text-gray-600"
            />
            <button className="text-xs uppercase tracking-widest text-gray-400 hover:text-white transition-colors">Join</button>
          </div>
          <div className="flex space-x-6">
            {['Instagram', '小红书', 'WeChat'].map(social => (
              <span key={social} className="text-[10px] uppercase tracking-tighter text-gray-500 cursor-pointer hover:text-white transition-colors">
                {social}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-24 pt-8 border-t border-gray-800 text-center">
        <p className="text-[9px] text-gray-600 uppercase tracking-[0.2em]">
          &copy; 2024 UNIQUE ORIGINAL SELLER PLATFORM. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
