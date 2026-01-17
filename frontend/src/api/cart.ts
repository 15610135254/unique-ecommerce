import { httpClient } from './httpClient';
import { ApiResponse, CartResponse } from './types';

// Cart API
export const cartApi = {
  // Get all cart items
  getCartItems: async (): Promise<ApiResponse<CartResponse[]>> => {
    return httpClient.get<ApiResponse<CartResponse[]>>('/cart');
  },

  // Add item to cart
  addToCart: async (productId: number, quantity = 1): Promise<ApiResponse<CartResponse>> => {
    return httpClient.postWithParams<ApiResponse<CartResponse>>('/cart/add', {
      productId,
      quantity,
    });
  },

  // Update cart item quantity
  updateItem: async (productId: number, quantity: number): Promise<ApiResponse<CartResponse>> => {
    return httpClient.putWithParams<ApiResponse<CartResponse>>('/cart/update', {
      productId,
      quantity,
    });
  },

  // Remove item from cart
  removeItem: async (productId: number): Promise<ApiResponse<{ message: string }>> => {
    return httpClient.deleteWithParams<ApiResponse<{ message: string }>>('/cart/remove', {
      productId,
    });
  },

  // Clear cart
  clearCart: async (): Promise<ApiResponse<{ message: string }>> => {
    return httpClient.delete<ApiResponse<{ message: string }>>('/cart/clear');
  },

  // Get cart count
  getCartCount: async (): Promise<ApiResponse<{ count: number }>> => {
    return httpClient.get<ApiResponse<{ count: number }>>('/cart/count');
  },
};
