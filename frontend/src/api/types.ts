// API Types matching backend responses
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

// User & Auth Types
export interface LoginRequest {
  phone: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  phone: string;
  password: string;
  verificationCode: string;
}

export interface SmsLoginRequest {
  phone: string;
  code: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
    phone: string;
    role: 'CUSTOMER' | 'CREATOR' | 'ADMIN';
  };
}

// Product Types
export interface ProductResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: {
    id: number;
    name: string;
  };
  creator: {
    id: number;
    name: string;
    avatar?: string;
  };
  stock: number;
  isCustomizable: boolean;
  isNew: boolean;
  createdAt: string;
}

export interface ProductFilterRequest {
  categoryIds?: number[];
  creatorIds?: number[];
  minPrice?: number;
  maxPrice?: number;
  isCustomizable?: boolean;
  isNew?: boolean;
  keyword?: string;
}

// Category Types
export interface CategoryResponse {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  parentId?: number;
  level: number;
  children?: CategoryResponse[];
}

// Creator Types
export interface CreatorResponse {
  id: number;
  name: string;
  bio?: string;
  avatar?: string;
  studioImages?: string[];
  userId: number;
}

// Cart Types
export interface CartResponse {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
  quantity: number;
  subtotal: number;
}

export interface AddToCartRequest {
  productId: number;
  quantity?: number;
}

// Order Types
export interface OrderResponse {
  id: number;
  orderNumber: string;
  items: OrderItemResponse[];
  totalAmount: number;
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  shippingAddress: string;
  createdAt: string;
}

export interface OrderItemResponse {
  id: number;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface CreateOrderRequest {
  shippingAddress: string;
}

// Customization Types
export interface CustomizationRequest {
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
