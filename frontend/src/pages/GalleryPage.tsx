
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GalleryPage from '../../components/GalleryPage';
import { Product } from '../../types';

const GalleryPageWrapper: React.FC = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId?: string }>();

  return <GalleryPage categoryId={categoryId} onSelectProduct={(product: Product) => {
    const id = typeof product.id === 'string' ? product.id : String(product.id);
    navigate(`/product/${id}`);
  }} />;
};

export default GalleryPageWrapper;
