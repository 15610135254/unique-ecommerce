import { httpClient } from './httpClient';
import { ApiResponse, CreatorResponse } from './types';

// Creator API
export const creatorApi = {
  // Get all creators
  getAll: async (): Promise<ApiResponse<CreatorResponse[]>> => {
    return httpClient.get<ApiResponse<CreatorResponse[]>>('/creators');
  },

  // Get creator by ID
  getById: async (id: number): Promise<ApiResponse<CreatorResponse>> => {
    return httpClient.get<ApiResponse<CreatorResponse>>(`/creators/${id}`);
  },
};
