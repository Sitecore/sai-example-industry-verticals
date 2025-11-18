import { useEffect, useState } from 'react';
import { useI18n } from 'next-localization';
import {
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  Link,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import QuantityControl from './QuantityControl';
import { useLocale } from '@/hooks/useLocaleOptions';
import { useCartAction } from '@/hooks/useCartAction';
import { CartItem, getCart } from '@/lib/cart';
import { DrawerClose } from '@/shadcn/components/ui/drawer';

export const MiniCart = ({ checkoutPage }: { showWishlist?: boolean; checkoutPage: LinkField }) => {
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
      <div className="lg:mx-18">
        <h4 className="drawer-heading">{t('shopping_cart_label') || 'My Cart'}</h4>
        <p>{t('cart-empty') || 'Your cart is empty.'}</p>
      </div>
    );
  }
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const total = cart.reduce((sum, item) => {
    const price = Number(item.product.Price?.value) || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="flex h-full flex-col">
      <h4 className="drawer-heading mx-5 lg:mx-18">
        {t('shopping_cart_label') || 'My Cart'} <span>({totalItems})</span>
      </h4>
      <ul className="custom-scrollbar mx-3 shrink space-y-6 overflow-auto px-2 pb-6 lg:mx-16">
        {cart.map((item) => {
          const isUpdating = updatingItemId === item.id;

          return (
            <li
              key={item.id}
              className={`flex gap-4 lg:gap-9 ${isUpdating ? 'pointer-events-none opacity-50' : ''}`}
            >
              <div className="size-23 rounded-sm lg:size-30">
                <ContentSdkImage field={item.product.Image1} className="image-cover" />
              </div>
              <div className="flex w-full flex-col">
                <p className="text-lg">
                  <ContentSdkText field={item.product.Title} />
                  <span>
                    {(item.size?.fields.ProductSize.value || item.color?.fields.Name.value) &&
                      ' - '}
                    <span>{item.size?.fields.ProductSize.value}</span>
                    {item.size?.fields.ProductSize.value && item.color?.fields.Name.value && ' | '}
                    <span>{item.color?.fields.Name.value}</span>
                  </span>
                </p>
                <span className="text-foreground-light mt-1">
                  {currencySymbol} {(Number(item.product.Price.value) * item.quantity).toFixed(2)}
                </span>
                <div className="mt-auto flex flex-wrap justify-between">
                  <QuantityControl
                    quantity={item.quantity}
                    onChange={(q) => handleQuantity(item.id, q)}
                  />
                  <button onClick={() => handleRemove(item.id)} className="outline-btn">
                    Remove
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-auto">
        <hr className="mb-6" />
        <div className="mx-5 lg:mx-18">
          <p className="mb-6 flex justify-between text-lg">
            <span>{t('total_label') || 'Total:'}</span>
            <span>
              {currencySymbol} {total.toFixed(2)}
            </span>
          </p>
          <DrawerClose asChild>
            <Link field={checkoutPage} className="main-btn" />
          </DrawerClose>
        </div>
      </div>
    </div>
  );
};
