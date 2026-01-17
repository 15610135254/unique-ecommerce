import { httpClient } from './httpClient';
import { ApiResponse, OrderResponse, CreateOrderRequest } from './types';

// Order API
export const orderApi = {
  // Create order
  createOrder: async (data: CreateOrderRequest): Promise<ApiResponse<OrderResponse>> => {
    return httpClient.post<ApiResponse<OrderResponse>>('/orders', data);
  },

  // Get order by ID
  getById: async (id: number): Promise<ApiResponse<OrderResponse>> => {
    return httpClient.get<ApiResponse<OrderResponse>>(`/orders/${id}`);
  },

  // Get current user's orders
  getMyOrders: async (): Promise<ApiResponse<OrderResponse[]>> => {
    return httpClient.get<ApiResponse<OrderResponse[]>>('/orders');
  },

  // Cancel order
  cancelOrder: async (id: number): Promise<ApiResponse<{ message: string }>> => {
    return httpClient.post<ApiResponse<{ message: string }>>(`/orders/${id}/cancel`, {});
  },
};
