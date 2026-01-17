import { httpClient, ApiResponse } from './httpClient';
import { CustomizationRequest } from './types';

export interface CreateCustomizationRequest {
  contactName: string;
  contactPhone: string;
  requirements: string;
  productId?: number;
}

export interface CustomizationResponse {
  id: number;
  contactName: string;
  contactPhone: string;
  requirements: string;
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
}

export const customizationApi = {
  // 创建定制请求（不需要登录）
  createRequest: async (data: CreateCustomizationRequest): Promise<ApiResponse<CustomizationResponse>> => {
    return httpClient.post<ApiResponse<CustomizationResponse>>('/customization/request', data);
  },

  // 获取当前用户的定制请求（需要登录）
  getMyRequests: async (): Promise<ApiResponse<CustomizationResponse[]>> => {
    return httpClient.get<ApiResponse<CustomizationResponse[]>>('/customization/my-requests');
  },

  // 获取单个定制请求详情
  getRequest: async (id: number): Promise<ApiResponse<CustomizationResponse>> => {
    return httpClient.get<ApiResponse<CustomizationResponse>>(`/customization/request/${id}`);
  },
};
