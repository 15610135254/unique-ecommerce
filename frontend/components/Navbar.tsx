
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  cartCount: number;
  onSearchClick: () => void;
  onCartClick: () => void;
  onAuthClick: () => void;
  user: {name: string} | null;
  onNavigate: (view: 'home' | 'new' | 'gallery' | 'artists' | 'bespoke') => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onSearchClick, onCartClick, onAuthClick, user, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 glass-nav ${isScrolled ? 'py-4 shadow-sm border-b border-gray-100' : 'py-8'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <div 
          onClick={() => onNavigate('home')}
          className="cursor-pointer text-2xl heading-font font-bold tracking-[0.2em] select-none"
        >
          U N I Q U E
        </div>

        {/* Menu Items (Desktop) */}
        <div className="hidden md:flex space-x-12 text-xs uppercase tracking-widest font-light">
          <button onClick={() => onNavigate('new')} className="hover:text-gray-400 transition-colors">新品 New</button>
          <button onClick={() => onNavigate('gallery')} className="hover:text-gray-400 transition-colors">分类 Gallery</button>
          <button onClick={() => onNavigate('artists')} className="hover:text-gray-400 transition-colors">创作者 Artists</button>
          <button onClick={() => onNavigate('bespoke')} className="hover:text-gray-400 transition-colors">定制 Bespoke</button>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <button onClick={onSearchClick} className="hover:opacity-60 transition-opacity">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          <button onClick={onAuthClick} className="hover:opacity-60 transition-opacity flex items-center gap-2">
            {user ? (
              <span className="text-[10px] uppercase tracking-widest font-medium border-b border-black">{user.name}</span>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
          </button>

          <button onClick={onCartClick} className="relative hover:opacity-60 transition-opacity">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 text-[10px] font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
