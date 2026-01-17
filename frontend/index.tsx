
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './src/context/AppContext';
import App from './App';

// Import page components
import HomePage from './src/pages/HomePage';
import NewArrivalsPage from './src/pages/NewArrivalsPage';
import GalleryPage from './src/pages/GalleryPage';
import ProductDetailPage from './src/pages/ProductDetailPage';
import ArtistsGalleryPage from './src/pages/ArtistsGalleryPage';
import BespokePage from './src/pages/BespokePage';
import StoryPage from './src/pages/StoryPage';
import PolicyPage from './src/pages/PolicyPage';
import FAQPage from './src/pages/FAQPage';
import AuthPage from './src/pages/AuthPage';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <Routes>
          {/* App Layout Route - contains Navbar, Footer, etc. */}
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />

            {/* Product routes - SEO friendly: /bags/leather/slug-123 */}
            <Route path=":category/:material/:slug" element={<ProductDetailPage />} />

            {/* Legacy product route for backward compatibility */}
            <Route path="product/:id" element={<ProductDetailPage />} />

            {/* New arrivals */}
            <Route path="new" element={<NewArrivalsPage />} />

            {/* Gallery with optional category filter */}
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="gallery/:categoryId" element={<GalleryPage />} />

            {/* Artists */}
            <Route path="artists" element={<ArtistsGalleryPage />} />

            {/* Bespoke / Customization */}
            <Route path="bespoke" element={<BespokePage />} />

            {/* Story */}
            <Route path="story" element={<StoryPage />} />

            {/* Policy */}
            <Route path="policy" element={<PolicyPage />} />

            {/* FAQ */}
            <Route path="faq" element={<FAQPage />} />

            {/* Auth */}
            <Route path="auth" element={<AuthPage />} />
          </Route>

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
