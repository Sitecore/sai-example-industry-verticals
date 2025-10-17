import { useEffect, useState } from 'react';
import { useI18n } from 'next-localization';
import { getCart, CartItem } from '@/lib/cart';
import {
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  Link,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import QuantityControl from './QuantityControl';
import { useLocale } from '@/hooks/useLocaleOptions';
import { Heart, X } from 'lucide-react';
import { useCartAction } from '@/hooks/useCartAction';
import { PopoverClose } from '@radix-ui/react-popover';

export const MiniCart = ({
  showWishlist,
  checkoutPage,
}: {
  showWishlist?: boolean;
  checkoutPage: LinkField;
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { t } = useI18n();
  const { currencySymbol } = useLocale();
  const { updatingItemId, handleRemoveFromCart, handleUpdateQuantity } = useCartAction();

  useEffect(() => {
    setCart(getCart());
    const handler = () => setCart(getCart());
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const handleRemove = async (cartItemId: string) => {
    const updatedCart = await handleRemoveFromCart(cartItemId);
    setCart(updatedCart);
  };

  const handleQuantity = async (cartItemId: string, qty: number) => {
    const updatedCart = await handleUpdateQuantity(cartItemId, qty);
    setCart(updatedCart);
  };

  if (!cart.length) {
    return (
      <div>
        <h5>{t('shopping_cart_label') || 'Shopping Cart'}</h5>
        <hr className="mt-4 mb-6" />
        <p>{t('cart-empty') || 'Your cart is empty.'}</p>
      </div>
    );
  }

  const subtotal = cart.reduce((sum, item) => {
    const price = Number(item.product.Price?.value) || 0;
    return sum + price * item.quantity;
  }, 0);
  const vat = subtotal * 0.2;
  const total = subtotal + vat;

  return (
    <div className="flex max-h-[75vh] flex-col">
      <div className="px-2">
        <h5>{t('shopping_cart_label') || 'Shopping Cart'}</h5>
        <hr className="mt-4" />
      </div>
      <ul className="custom-scrollbar shrink space-y-6 overflow-auto px-2 py-6">
        {cart.map((item) => {
          const isUpdating = updatingItemId === item.id;

          return (
            <li
              key={item.id}
              className={`grid grid-cols-[auto_auto_1fr] gap-4 sm:grid-cols-[auto_auto_1fr_auto] ${isUpdating ? 'pointer-events-none opacity-50' : ''}`}
            >
              <div className="space-y-1 self-center">
                {showWishlist && (
                  <button className="surface-btn">
                    <Heart className="size-4" strokeWidth={3} />
                  </button>
                )}
                <button onClick={() => handleRemove(item.id)} className="surface-btn">
                  <X className="size-4" strokeWidth={3} />
                </button>
              </div>
              <div className="bg-background-surface size-19 rounded-sm p-2">
                <ContentSdkImage field={item.product.Image1} className="image-contain" />
              </div>
              <div>
                <h6 className="line-clamp-1 text-lg break-all">
                  <ContentSdkText field={item.product.Title} />
                </h6>
                <p>
                  <span>{item.size?.fields.ProductSize.value}</span>
                  {item.size?.fields.ProductSize.value && item.color?.fields.Name.value && ' | '}
                  <span>{item.color?.fields.Name.value}</span>
                </p>
                <div className="flex flex-wrap justify-between">
                  <QuantityControl
                    quantity={item.quantity}
                    onChange={(q) => handleQuantity(item.id, q)}
                  />
                  <span className="text-lg font-bold sm:hidden">
                    {currencySymbol} {(Number(item.product.Price.value) * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
              <span className="text-lg font-bold max-sm:hidden">
                {currencySymbol} {(Number(item.product.Price.value) * item.quantity).toFixed(2)}
              </span>
            </li>
          );
        })}
      </ul>
      <div className="px-2">
        <hr className="mb-4" />

        <p className="flex justify-between">
          <span>{t('subtotal_label') || 'Subtotal:'}</span>
          <span>
            {currencySymbol}
            {subtotal.toFixed(2)}
          </span>
        </p>
        <p className="flex justify-between">
          <span>{t('vat_label') || 'VAT (20%):'}</span>
          <span>
            {currencySymbol} {vat.toFixed(2)}
          </span>
        </p>
        <p className="mb-6 flex justify-between text-lg font-bold">
          <span>{t('total_label') || 'Total:'}</span>
          <span>
            {currencySymbol} {total.toFixed(2)}
          </span>
        </p>
        <PopoverClose asChild>
          <Link field={checkoutPage} className="main-btn" />
        </PopoverClose>
      </div>
    </div>
  );
};
