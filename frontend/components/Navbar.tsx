
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../src/context/AppContext';

const Navbar: React.FC = () => {
  const { user, cartCount, isFilterOpen, setIsFilterOpen, isCartOpen, setIsCartOpen, handleLogout } = useApp();
  const navigate = useNavigate();
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

  const handleLogoutClick = () => {
    setShowUserMenu(false);
    handleLogout();
    navigate('/');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 glass-nav ${isScrolled ? 'py-4 shadow-sm border-b border-gray-100' : 'py-8'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl heading-font font-bold tracking-[0.2em] select-none"
        >
          U N I Q U E
        </Link>

        {/* Menu Items (Desktop) */}
        <div className="hidden md:flex space-x-12 text-xs uppercase tracking-widest font-light">
          <Link to="/new" className="hover:text-gray-400 transition-colors">新品 New</Link>
          <Link to="/gallery" className="hover:text-gray-400 transition-colors">分类 Gallery</Link>
          <Link to="/artists" className="hover:text-gray-400 transition-colors">创作者 Artists</Link>
          <Link to="/bespoke" className="hover:text-gray-400 transition-colors">定制 Bespoke</Link>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="hover:opacity-60 transition-opacity">
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
                <div className="absolute right-0 mt-4 w-56 bg-white/95 backdrop-blur-sm shadow-xl animate-fade-in">
                  <div className="p-6 border-b border-gray-100">
                    <p className="text-sm heading-font tracking-wide">{user.username}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">{user.phone}</p>
                  </div>
                  <div className="py-2">
                    <button
                      onClick={() => { setShowUserMenu(false); navigate('/gallery'); }}
                      className="w-full text-left px-6 py-3 text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-colors border-l-2 border-transparent hover:border-black"
                    >
                      我的订单 Orders
                    </button>
                    <button
                      onClick={() => { setShowUserMenu(false); navigate('/bespoke'); }}
                      className="w-full text-left px-6 py-3 text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-colors border-l-2 border-transparent hover:border-black"
                    >
                      定制请求 Customization
                    </button>
                    <button
                      onClick={handleLogoutClick}
                      className="w-full text-left px-6 py-3 text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-colors border-l-2 border-transparent hover:border-black text-gray-600"
                    >
                      退出登录 Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate('/auth')}
              className="hover:opacity-60 transition-opacity"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          )}

          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative hover:opacity-60 transition-opacity"
          >
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
