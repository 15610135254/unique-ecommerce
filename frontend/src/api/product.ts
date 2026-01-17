import { httpClient } from './httpClient';
import { ApiResponse, ProductResponse, ProductFilterRequest } from './types';

// Product API
export const productApi = {
  // Get product by ID
  getById: async (id: number): Promise<ApiResponse<ProductResponse>> => {
    return httpClient.get<ApiResponse<ProductResponse>>(`/products/${id}`);
  },

  // Get all products with pagination
  getAll: async (page = 0, size = 20): Promise<ApiResponse<ProductResponse[]>> => {
    const response = await httpClient.get<ApiResponse<{
      content: ProductResponse[];
      totalElements: number;
      totalPages: number;
    }>>(`/products?page=${page}&size=${size}`);
    // Transform Spring Page response to simple array
    return {
      code: response.code,
      message: response.message,
      data: response.data.content,
    };
  },

  // Get new products
  getNewProducts: async (): Promise<ApiResponse<ProductResponse[]>> => {
    return httpClient.get<ApiResponse<ProductResponse[]>>('/products/new');
  },

  // Filter products
  filter: async (filter: ProductFilterRequest, page = 0, size = 20): Promise<ApiResponse<ProductResponse[]>> => {
    const response = await httpClient.post<ApiResponse<{
      content: ProductResponse[];
      totalElements: number;
      totalPages: number;
    }>>(`/products/filter?page=${page}&size=${size}`, filter);
    return {
      code: response.code,
      message: response.message,
      data: response.data.content,
    };
  },

  // Get products by creator
  getByCreator: async (creatorId: number): Promise<ApiResponse<ProductResponse[]>> => {
    return httpClient.get<ApiResponse<ProductResponse[]>>(`/products/creator/${creatorId}`);
  },

  // Get products by category
  getByCategory: async (categoryId: number): Promise<ApiResponse<ProductResponse[]>> => {
    return httpClient.get<ApiResponse<ProductResponse[]>>(`/products/category/${categoryId}`);
  },
};
