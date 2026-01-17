import { useState, useEffect } from 'react';
import { cartApi, CartResponse } from '../api';
import { CartItem } from '../types';

// Transform API cart item to local cart item format
export const transformCartItem = (apiCart: CartResponse): CartItem => ({
  id: apiCart.id,
  product: {
    id: apiCart.product.id,
    name: apiCart.product.name,
    price: apiCart.product.price,
    image: apiCart.product.imageUrl,
    imageUrl: apiCart.product.imageUrl,
    creator: '',
    category: '',
    description: '',
    isCustomizable: false,
  },
  quantity: apiCart.quantity,
  subtotal: apiCart.subtotal,
});

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await cartApi.getCartItems();
      if (response.success) {
        const items = response.data.map(transformCartItem);
        setCartItems(items);
        setCartCount(items.reduce((sum, item) => sum + item.quantity, 0));
      }
      setError(null);
    } catch (err: any) {
      // User not authenticated - clear cart
      if (err.message?.includes('401') || err.message?.includes('403')) {
        setCartItems([]);
        setCartCount(0);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: number, quantity = 1) => {
    try {
      setLoading(true);
      await cartApi.addToCart(productId, quantity);
      await fetchCart();
      setError(null);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    try {
      setLoading(true);
      await cartApi.updateItem(productId, quantity);
      await fetchCart();
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      setLoading(true);
      await cartApi.removeItem(productId);
      await fetchCart();
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      await cartApi.clearCart();
      setCartItems([]);
      setCartCount(0);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return {
    cartItems,
    cartCount,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotal,
    refetch: fetchCart,
  };
};
