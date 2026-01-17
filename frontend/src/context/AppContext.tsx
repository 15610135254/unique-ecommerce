
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { authApi, getAuthToken } from '../api';
import { User } from '../types';
import { useCart } from '../hooks/useCart';

interface AppContextType {
  // User state
  user: User | null;
  setUser: (user: User | null) => void;

  // Cart state
  cartCount: number;

  // Filter sidebar state
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;

  // Cart drawer state
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Actions
  handleLogout: () => void;
  addToCart: (productId: number, quantity?: number) => Promise<void>;

  // Pending add to cart (for after login redirect)
  pendingAddToCartProductId: number | null;
  setPendingAddToCartProductId: (id: number | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [pendingAddToCartProductId, setPendingAddToCartProductId] = useState<number | null>(null);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  const { cartCount, addToCart } = useCart();

  // Check for existing auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = getAuthToken();
      if (token && !hasCheckedAuth) {
        try {
          const response = await authApi.getCurrentUser();
          if (response.code === 200) {
            setUser(response.data);
          }
        } catch (error) {
          console.error('Failed to get current user:', error);
        } finally {
          setHasCheckedAuth(true);
        }
      } else if (!token) {
        setHasCheckedAuth(true);
      }
    };
    checkAuth();
  }, [hasCheckedAuth]);

  const handleLogout = useCallback(() => {
    authApi.logout();
    setUser(null);
    setIsFilterOpen(false);
    setIsCartOpen(false);
  }, []);

  const contextValue: AppContextType = {
    user,
    setUser,
    cartCount,
    isFilterOpen,
    setIsFilterOpen,
    isCartOpen,
    setIsCartOpen,
    handleLogout,
    addToCart,
    pendingAddToCartProductId,
    setPendingAddToCartProductId,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
