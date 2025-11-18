import { Check, Loader2, Plus, X } from 'lucide-react';
import { useCartAction } from '@/hooks/useCartAction';
import { Color, Product, Size } from '@/types/products';
import { useI18n } from 'next-localization';

interface AddToCartButtonProps {
  productId: string;
  product: Product;
  selectedQuantity?: number;
  selectedColor?: Color;
  selectedSize?: Size;
}

export const AddToCartButton = ({
  productId,
  product,
  selectedQuantity,
  selectedColor,
  selectedSize,
}: AddToCartButtonProps) => {
  const { status, handleAddToCart } = useCartAction();
  const { t } = useI18n();

  return (
    <button
      disabled={status !== 'idle'}
      onClick={() =>
        handleAddToCart(productId, product, selectedQuantity, selectedColor, selectedSize)
      }
      className="main-btn w-full"
      aria-label={t('cart_btn_text') || 'Add to Cart'}
      type="button"
    >
      {status === 'loading' && <Loader2 className="size-6 animate-spin" />}
      {status === 'success' && <Check className="size-6" />}
      {status === 'error' && <X className="size-6" />}
      {status === 'idle' && (
        <>
          <Plus className="size-5" />
          {t('cart_btn_text') || 'Add to Cart'}
        </>
      )}
    </button>
  );
};
