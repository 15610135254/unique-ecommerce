
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryBubbles from './components/CategoryBubbles';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import ArtistsGallery from './components/ArtistsGallery';
import BespokePage from './components/BespokePage';
import GalleryPage from './components/GalleryPage';
import NewArrivalsPage from './components/NewArrivalsPage';
import StoryPage from './components/StoryPage';
import PolicyPage from './components/PolicyPage';
import FAQPage from './components/FAQPage';
import AuthPage from './components/AuthPage';
import Footer from './components/Footer';
import FilterSidebar from './components/FilterSidebar';
import CartDrawer from './components/CartDrawer';
import { Product } from './types';

type ViewState = 'home' | 'new' | 'gallery' | 'artists' | 'bespoke' | 'story' | 'policy' | 'faq' | 'auth';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState<{name: string} | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
    return () => clearTimeout(timer);
  }, [selectedProduct, currentView]);

  const renderContent = () => {
    if (selectedProduct) {
      return (
        <ProductDetail 
          product={selectedProduct} 
          onBack={() => setSelectedProduct(null)}
          onAddToCart={() => {
            setCartCount(prev => prev + 1);
            setIsCartOpen(true);
          }}
        />
      );
    }

    switch (currentView) {
      case 'auth':
        return <AuthPage onAuthSuccess={(name) => { setUser({name}); setCurrentView('home'); }} />;
      case 'gallery':
        return <GalleryPage onSelectProduct={setSelectedProduct} />;
      case 'new':
        return <NewArrivalsPage onSelectProduct={setSelectedProduct} />;
      case 'artists':
        return <ArtistsGallery />;
      case 'bespoke':
        return <BespokePage />;
      case 'story':
        return <StoryPage />;
      case 'policy':
        return <PolicyPage />;
      case 'faq':
        return <FAQPage />;
      case 'home':
      default:
        return (
          <>
            <Hero />
            <CategoryBubbles />
            <div className="px-6 md:px-12 py-12">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-light heading-font">精心策展</h2>
                  <p className="text-gray-500 mt-2 font-light">Curated Selection</p>
                </div>
                <button 
                  onClick={() => setIsFilterOpen(true)}
                  className="px-4 py-2 border-b border-black text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300"
                >
                  筛选 Filter
                </button>
              </div>
              <ProductGrid onSelectProduct={setSelectedProduct} />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col animate-fade-in overflow-x-hidden">
      <Navbar 
        cartCount={cartCount} 
        onSearchClick={() => setIsFilterOpen(true)} 
        onCartClick={() => setIsCartOpen(true)}
        onAuthClick={() => setCurrentView('auth')}
        user={user}
        onNavigate={(view) => {
          setSelectedProduct(null);
          setCurrentView(view);
        }}
      />
      
      <main className="flex-grow pt-20">
        {renderContent()}
      </main>

      <Footer onNavigate={(view) => {
        setSelectedProduct(null);
        setCurrentView(view);
      }} />
      
      <FilterSidebar 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
      />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        cartCount={cartCount}
      />

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
