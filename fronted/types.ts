
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  creator: string;
  category: string;
  material: string;
  description: string;
  isCustomizable: boolean;
  isOneOfOne: boolean;
}

export interface Creator {
  name: string;
  avatar: string;
  studioImg: string;
  bio: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}
