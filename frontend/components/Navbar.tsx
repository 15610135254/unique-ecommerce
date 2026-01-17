
import React, { useState, useEffect, useRef } from 'react';
import { authApi } from '../src/api';

interface NavbarProps {
  cartCount: number;
  onSearchClick: () => void;
  onCartClick: () => void;
  onAuthClick: () => void;
  user: { id: number; username: string; phone: string; role: string } | null;
  onNavigate: (view: 'home' | 'new' | 'gallery' | 'artists' | 'bespoke') => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onSearchClick,
  onCartClick,
  onAuthClick,
  user,
  onNavigate,
  onLogout
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    authApi.logout();
    setShowUserMenu(false);
    onLogout();
  };

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

          {/* User Avatar / Login Button */}
          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="hover:opacity-60 transition-opacity flex items-center gap-2"
              >
                {/* User Avatar */}
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-medium">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 shadow-lg py-2">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium">{user.username}</p>
                    <p className="text-xs text-gray-400">{user.phone}</p>
                  </div>
                  <button
                    onClick={() => { setShowUserMenu(false); onNavigate('gallery'); }}
                    className="w-full text-left px-4 py-2 text-xs hover:bg-gray-50 transition-colors"
                  >
                    我的订单
                  </button>
                  <button
                    onClick={() => { setShowUserMenu(false); onNavigate('bespoke'); }}
                    className="w-full text-left px-4 py-2 text-xs hover:bg-gray-50 transition-colors"
                  >
                    定制请求
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-gray-50 transition-colors"
                  >
                    退出登录
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={onAuthClick} className="hover:opacity-60 transition-opacity">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          )}

          <button onClick={onCartClick} className="relative hover:opacity-60 transition-opacity">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
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
