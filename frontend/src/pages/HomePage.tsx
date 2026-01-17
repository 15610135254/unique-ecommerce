
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../../components/Hero';
import CategoryBubbles from '../../components/CategoryBubbles';
import ProductGrid from '../../components/ProductGrid';
import { Product } from '../../types';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectProduct = (product: Product) => {
    const id = typeof product.id === 'string' ? product.id : String(product.id);
    navigate(`/product/${id}`);
  };

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
        </div>
        <ProductGrid onSelectProduct={handleSelectProduct} />
      </div>
    </>
  );
};

export default HomePage;
