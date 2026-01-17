
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GalleryPage from '../../components/GalleryPage';

const GalleryPageWrapper: React.FC = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId?: string }>();

  return <GalleryPage categoryId={categoryId} onSelectProduct={(id) => navigate(`/product/${id}`)} />;
};

export default GalleryPageWrapper;
