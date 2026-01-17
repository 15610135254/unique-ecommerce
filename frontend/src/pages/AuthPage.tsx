
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthPage from '../../components/AuthPage';
import { useApp } from '../context/AppContext';
import { User } from '../../types';

const AuthPageWrapper: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser, addToCart, setIsCartOpen, pendingAddToCartProductId, setPendingAddToCartProductId } = useApp();

  // If already logged in, redirect immediately
  useEffect(() => {
    if (user) {
      const redirectTo = (location.state as any)?.redirectTo || '/';
      navigate(redirectTo, { replace: true });
    }
  }, [user, location.state, navigate]);

  const handleAuthSuccess = async (userData: User) => {
    setUser(userData);

    // If there's a pending add to cart action, execute it
    if (pendingAddToCartProductId) {
      try {
        await addToCart(pendingAddToCartProductId, 1);
        setIsCartOpen(true);
        setPendingAddToCartProductId(null);
      } catch (error) {
        console.error('Failed to add to cart after login:', error);
      }
    }

    // Redirect to the page user was trying to access, or home
    const redirectTo = (location.state as any)?.redirectTo || '/';
    navigate(redirectTo, { replace: true });
  };

  return <AuthPage onAuthSuccess={handleAuthSuccess} />;
};

export default AuthPageWrapper;
