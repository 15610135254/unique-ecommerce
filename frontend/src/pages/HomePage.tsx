
import React from 'react';
import Hero from '../../components/Hero';
import CategoryBubbles from '../../components/CategoryBubbles';
import ProductGrid from '../../components/ProductGrid';

const HomePage: React.FC = () => {
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
        <ProductGrid />
      </div>
    </>
  );
};

export default HomePage;
