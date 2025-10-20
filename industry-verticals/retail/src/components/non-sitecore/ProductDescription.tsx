import { Text as ContentSdkText, useSitecore } from '@sitecore-content-sdk/nextjs';
import { Product } from '@/types/products';
import StarRating from '../non-sitecore/StarRating';
import { useLocale } from '@/hooks/useLocaleOptions';
import { calculateAverageRating } from '@/helpers/productUtils';

interface ProductDescriptionProps {
  product: Product;
}

export const ProductDescription = ({ product }: ProductDescriptionProps) => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const { currency } = useLocale();

  return (
    <>
      <h1 className="pt-3 text-4xl font-bold lg:pt-0">
        <ContentSdkText field={product.Title} />
      </h1>

      {(product?.Price?.value || isPageEditing) && (
        <p className="text-xl">
          {currency} <ContentSdkText field={product.Price} />
        </p>
      )}

      {(product?.Reviews || isPageEditing) && (
        <StarRating
          rating={calculateAverageRating(product.Reviews || [])}
          className="!text-accent mt-1"
        />
      )}

      {(product?.ShortDescription?.value || isPageEditing) && (
        <p className="text-foreground text-lg">
          <ContentSdkText field={product.ShortDescription} />
        </p>
      )}
    </>
  );
};
