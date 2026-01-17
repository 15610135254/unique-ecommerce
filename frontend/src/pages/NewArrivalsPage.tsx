
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NewArrivalsPage from '../../components/NewArrivalsPage';
import { Product } from '../../types';
import { generateProductPath } from '../utils/slug';

const NewArrivalsPageWrapper: React.FC = () => {
  const navigate = useNavigate();

  return <NewArrivalsPage onSelectProduct={(product: Product) => {
    const id = typeof product.id === 'string' ? parseInt(product.id) : product.id;
    const path = generateProductPath(
      product.category,
      product.material,
      product.name,
      id
    );
    navigate(path);
  }} />;
};

export default NewArrivalsPageWrapper;
