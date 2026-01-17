
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FilterSidebar from './components/FilterSidebar';
import CartDrawer from './components/CartDrawer';
import { useApp } from './src/context/AppContext';

const App: React.FC = () => {
  const location = useLocation();
  const {
    cartCount,
    isFilterOpen,
    setIsFilterOpen,
    isCartOpen,
    setIsCartOpen,
  } = useApp();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Listen for custom event to open cart drawer (from ProductDetailPage)
  useEffect(() => {
    const handleOpenCart = () => setIsCartOpen(true);
    window.addEventListener('open-cart', handleOpenCart);
    return () => window.removeEventListener('open-cart', handleOpenCart);
  }, [setIsCartOpen]);

  return (
    <div className="min-h-screen flex flex-col animate-fade-in overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-20">
        <Outlet />
      </main>

      <Footer />

      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      {/* Mobile floating cart button */}
      <div className="fixed bottom-8 right-8 z-40 md:hidden">
        <button
          onClick={() => setIsCartOpen(true)}
          className="bg-black text-white p-4 rounded-full shadow-xl relative"
        >
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
           </svg>
           {cartCount > 0 && (
             <span className="absolute -top-1 -right-1 bg-[#556B2F] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
               {cartCount}
             </span>
           )}
        </button>
      </div>
    </div>
  );
};

export default App;
