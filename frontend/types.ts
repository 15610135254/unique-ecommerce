// Local UI types - for backward compatibility with existing components
export interface Product {
  id: number | string;
  name: string;
  price: number;
  image: string;
  imageUrl?: string;
  creator: string;
  creatorId?: number;
  category: string;
  categoryId?: number;
  material?: string;
  description: string;
  isCustomizable: boolean;
  isOneOfOne?: boolean;
  isNew?: boolean;
  stock?: number;
}

export interface Creator {
  id?: number;
  name: string;
  avatar?: string;
  studioImg?: string;
  bio?: string;
}

export interface Category {
  id: number | string;
  name: string;
  image?: string;
  imageUrl?: string;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  subtotal: number;
}

export interface User {
  id: number;
  username: string;
  phone: string;
  role: 'CUSTOMER' | 'CREATOR' | 'ADMIN';
}
