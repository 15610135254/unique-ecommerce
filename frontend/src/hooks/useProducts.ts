import { useState, useEffect } from 'react';
import { productApi, categoryApi, ProductResponse, CategoryResponse } from '../api';
import { Product } from '../types';

// Transform API product to local product format
export const transformProduct = (apiProduct: ProductResponse): Product => ({
  id: apiProduct.id,
  name: apiProduct.name,
  price: apiProduct.price,
  image: apiProduct.imageUrl || apiProduct.imageUrl || '',
  imageUrl: apiProduct.imageUrl,
  creator: apiProduct.creator.name,
  creatorId: apiProduct.creator.id,
  category: apiProduct.category.name,
  categoryId: apiProduct.category.id,
  description: apiProduct.description,
  isCustomizable: apiProduct.isCustomizable,
  isNew: apiProduct.isNew,
  stock: apiProduct.stock,
});

export const useProducts = (page = 0, size = 20) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productApi.getAll(page, size);
      if (response.code === 200) {
        setProducts(response.data.map(transformProduct));
      }
      setError(null);
    } catch (err: any) {
      setError(err.message);
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, size]);

  return { products, loading, error, refetch: fetchProducts };
};

export const useNewProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        setLoading(true);
        const response = await productApi.getNewProducts();
        if (response.code === 200) {
          setProducts(response.data.map(transformProduct));
        }
        setError(null);
      } catch (err: any) {
        setError(err.message);
        console.error('Failed to fetch new products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewProducts();
  }, []);

  return { products, loading, error };
};

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await categoryApi.getTopLevel();
        if (response.code === 200) {
          setCategories(response.data);
        }
        setError(null);
      } catch (err: any) {
        setError(err.message);
        console.error('Failed to fetch categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};
