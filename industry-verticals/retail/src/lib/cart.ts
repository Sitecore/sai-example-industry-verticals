import { Color, Product, Size } from '@/types/products';

export type CartProduct = Pick<Product, 'Title' | 'Price' | 'Image1'>;

export type CartItem = {
  id: string; // cart item ID
  product: CartProduct;
  quantity: number;
  color?: Color;
  size?: Size;
};

const CART_KEY = 'sitecore-demo-cart';

export function generateCartItemId(productId: string, color?: Color, size?: Size): string {
  const colorPart = color ? `_${color.id}` : '';
  const sizePart = size ? `_${size.id}` : '';
  return `${productId}${colorPart}${sizePart}`;
}

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Failed to read cart from localStorage:', err);
    return [];
  }
}

export function saveCart(cart: CartItem[]) {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (err) {
    console.warn('Failed to save cart to localStorage:', err);
  }
}

export function addToCart(
  productId: string,
  product: Product,
  quantity: number = 1,
  color?: Color,
  size?: Size
): boolean {
  try {
    const cart = getCart();
    const uniqueId = generateCartItemId(productId, color, size);

    const idx = cart.findIndex((item) => item.id === uniqueId);

    const cartProduct: CartProduct = {
      Title: product.Title,
      Price: product.Price,
      Image1: product.Image1,
    };

    if (idx > -1) {
      cart[idx].quantity += quantity;
    } else {
      cart.push({
        id: uniqueId,
        product: cartProduct,
        quantity,
        color,
        size,
      });
    }

    saveCart(cart);
    return true;
  } catch (err) {
    console.error('Failed to add item to cart:', err);
    return false;
  }
}

export function removeFromCart(cartItemId: string): boolean {
  try {
    const cart = getCart().filter((item) => item.id !== cartItemId);
    saveCart(cart);
    return true;
  } catch (err) {
    console.error('Failed to remove item from cart:', err);
    return false;
  }
}

export function updateCartQuantity(cartItemId: string, quantity: number) {
  try {
    const cart = getCart();
    const idx = cart.findIndex((item) => item.id === cartItemId);
    if (idx > -1) {
      cart[idx].quantity = quantity;
      saveCart(cart);
    }
  } catch (err) {
    console.error('Failed to update cart quantity:', err);
  }
}
