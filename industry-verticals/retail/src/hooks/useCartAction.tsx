import { useState } from 'react';
import {
  getCart,
  addToCart as addToCartUtil,
  removeFromCart as removeFromCartUtil,
  updateCartQuantity as updateCartQuantityUtil,
} from '@/lib/cart';
import { Color, Product, Size } from '@/types/products';

type CartActionStatus = 'idle' | 'loading' | 'success' | 'error';

export function useCartAction() {
  const [status, setStatus] = useState<CartActionStatus>('idle');
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);

  const handleAddToCart = async (
    productId: string,
    product: Product,
    quantity = 1,
    color?: Color,
    size?: Size
  ) => {
    setStatus('loading');
    try {
      await new Promise((r) => setTimeout(r, 300));
      addToCartUtil(productId, product, quantity, color, size);
      setStatus('success');
      return getCart();
    } catch {
      setStatus('error');
      return getCart();
    } finally {
      setTimeout(() => setStatus('idle'), 1200);
    }
  };

  const handleRemoveFromCart = async (cartItemId: string) => {
    setStatus('loading');
    setUpdatingItemId(cartItemId);
    try {
      await new Promise((r) => setTimeout(r, 300));
      removeFromCartUtil(cartItemId);
      setStatus('success');
      return getCart();
    } catch {
      setStatus('error');
      return getCart();
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setUpdatingItemId(null);
      }, 1200);
    }
  };

  const handleUpdateQuantity = async (cartItemId: string, quantity: number) => {
    setStatus('loading');
    setUpdatingItemId(cartItemId);
    try {
      await new Promise((r) => setTimeout(r, 300));
      updateCartQuantityUtil(cartItemId, quantity);
      setStatus('success');
      return getCart();
    } catch {
      setStatus('error');
      return getCart();
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setUpdatingItemId(null);
      }, 1200);
    }
  };

  return {
    status,
    updatingItemId,
    handleAddToCart,
    handleRemoveFromCart,
    handleUpdateQuantity,
  };
}
