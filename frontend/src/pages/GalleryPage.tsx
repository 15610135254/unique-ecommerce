
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GalleryPage from '../../components/GalleryPage';
import { Product } from '../../types';
import { generateProductPath } from '../utils/slug';

const GalleryPageWrapper: React.FC = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId?: string }>();

  return <GalleryPage categoryId={categoryId} onSelectProduct={(product: Product) => {
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

export default GalleryPageWrapper;
