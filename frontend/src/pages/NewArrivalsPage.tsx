
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NewArrivalsPage from '../../components/NewArrivalsPage';

const NewArrivalsPageWrapper: React.FC = () => {
  const navigate = useNavigate();

  return <NewArrivalsPage onSelectProduct={(id) => navigate(`/product/${id}`)} />;
};

export default NewArrivalsPageWrapper;
