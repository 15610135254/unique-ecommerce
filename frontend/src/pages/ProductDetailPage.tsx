
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productApi } from '../api';
import { transformProduct } from '../hooks/useProducts';
import { Product } from '../types';
import ProductDetail from '../../components/ProductDetail';
import { useApp } from '../context/AppContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, addToCart, setIsCartOpen, setPendingAddToCartProductId } = useApp();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await productApi.getById(parseInt(id));
        if (response.code === 200) {
          setProduct(transformProduct(response.data));
        }
        setError(null);
      } catch (err: any) {
        setError(err.message);
        console.error('Failed to fetch product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async (productId: number) => {
    // Check if user is logged in
    if (!user) {
      // Store the product ID and navigate to auth
      setPendingAddToCartProductId(productId);
      navigate('/auth', { state: { redirectTo: `/product/${id}` } });
      return;
    }

    try {
      await addToCart(productId, 1);
      setIsCartOpen(true);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-300"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-6">
        <p className="text-gray-500 mb-4">商品未找到 / Product not found</p>
        <button
          onClick={() => navigate('/')}
          className="text-sm uppercase tracking-widest border-b border-black pb-1 hover:opacity-60 transition-opacity"
        >
          返回首页 Back to Home
        </button>
      </div>
    );
  }

  return (
    <ProductDetail
      product={product}
      onBack={() => navigate(-1)}
      onAddToCart={() => handleAddToCart(product.id as number)}
    />
  );
};

export default ProductDetailPage;
