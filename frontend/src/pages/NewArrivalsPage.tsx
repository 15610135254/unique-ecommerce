
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NewArrivalsPage from '../../components/NewArrivalsPage';
import { Product } from '../../types';

const NewArrivalsPageWrapper: React.FC = () => {
  const navigate = useNavigate();

  return <NewArrivalsPage onSelectProduct={(product: Product) => {
    const id = typeof product.id === 'string' ? product.id : String(product.id);
    navigate(`/product/${id}`);
  }} />;
};

export default NewArrivalsPageWrapper;
