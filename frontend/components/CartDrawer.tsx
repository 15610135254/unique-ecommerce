
import React, { useEffect } from 'react';
import { useCart } from '../src/hooks/useCart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cartItems, cartCount, loading, updateQuantity, removeFromCart, getTotal, refetch } = useCart();

  // Only refetch when drawer opens, not on every refetch function change
  useEffect(() => {
    if (isOpen) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const total = getTotal();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/20 z-[80] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[90] transition-transform duration-700 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} p-8 md:p-12 flex flex-col`}>
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-xl heading-font font-light uppercase tracking-widest">购物袋 Bag ({cartCount})</h2>
          <button onClick={onClose}>
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto custom-scrollbar space-y-8 pr-4">
          {loading ? (
            <div className="h-full flex justify-center items-center">
              <div className="animate-spin h-6 w-6 border-2 border-black border-t-transparent rounded-full"></div>
            </div>
          ) : cartCount === 0 ? (
            <div className="h-full flex flex-col justify-center items-center text-gray-400 font-light space-y-4">
              <p className="text-sm">您的购物袋还是空的</p>
              <button onClick={onClose} className="text-xs border-b border-gray-400 pb-1">去探索作品</button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-6 animate-fade-in">
                <img src={item.product.image || item.product.imageUrl} className="w-24 h-32 object-cover bg-gray-50" />
                <div className="flex-grow flex flex-col justify-between py-1">
                  <div>
                    <h3 className="text-sm font-normal">{item.product.name}</h3>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">¥{item.product.price}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4 border border-gray-100 px-3 py-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="text-xs"
                      >-</button>
                      <span className="text-xs">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="text-xs"
                      >+</button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black"
                    >移除</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartCount > 0 && (
          <div className="pt-8 border-t border-gray-100 space-y-6">
            <div className="flex justify-between items-end">
              <span className="text-xs text-gray-400 uppercase tracking-widest">小计 Subtotal</span>
              <span className="text-xl font-light">¥{total}</span>
            </div>
            <button className="w-full bg-black text-white py-5 text-xs uppercase tracking-[0.3em] hover:opacity-90">
              结算 Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
