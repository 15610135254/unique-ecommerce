import { httpClient } from './httpClient';
import { ApiResponse, CategoryResponse } from './types';

// Category API
export const categoryApi = {
  // Get all categories
  getAll: async (): Promise<ApiResponse<CategoryResponse[]>> => {
    return httpClient.get<ApiResponse<CategoryResponse[]>>('/categories');
  },

  // Get top-level categories
  getTopLevel: async (): Promise<ApiResponse<CategoryResponse[]>> => {
    return httpClient.get<ApiResponse<CategoryResponse[]>>('/categories/top');
  },

  // Get category by ID
  getById: async (id: number): Promise<ApiResponse<CategoryResponse>> => {
    return httpClient.get<ApiResponse<CategoryResponse>>(`/categories/${id}`);
  },
};
