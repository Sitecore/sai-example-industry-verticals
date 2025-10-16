import { NextImage as ContentSdkImage, Text } from '@sitecore-content-sdk/nextjs';
import StarRating from './StarRating';
import Link from 'next/link';
import { Product } from '@/types/products';
import { useLocale } from '@/hooks/useLocaleOptions';

interface ProductCardProps {
  product: Partial<Product>;
  url: string;
  showBadges?: boolean;
  className?: string;
}

export const ProductCard = ({ product, url, showBadges = false, className }: ProductCardProps) => {
  const { currencySymbol } = useLocale();
  const formattedPrice =
    product.Price?.value && !isNaN(product.Price?.value)
      ? product.Price.value.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })
      : product.Price?.value;

  return (
    <Link href={url} passHref>
      <div className={`relative ${showBadges ? 'pt-6' : ''}`}>
        {/* Product Badges */}
        {showBadges && (
          <div className="absolute top-0 right-0 z-10 flex space-x-2">
            {product.Discount?.value && (
              <div className="bg-danger flex h-12 min-w-12 items-center justify-center rounded-full p-1.5 text-sm text-white">
                <Text field={product.Discount} />
              </div>
            )}
            {product.Highlight?.value && (
              <div className="bg-success flex h-12 min-w-12 items-center justify-center rounded-full p-1.5 text-sm text-white">
                <Text field={product.Highlight} />
              </div>
            )}
          </div>
        )}
        <div
          className={`flex min-h-123 w-full flex-col overflow-hidden rounded-2xl hover:drop-shadow-sm ${className}`}
        >
          {/* Product Image */}
          <div className="bg-background-card-image flex h-72 w-full items-center justify-center p-6">
            <ContentSdkImage
              field={product.Image1}
              className="max-h-full max-w-full object-contain"
              priority
            />
          </div>

          {/* Product Details */}
          <div className="bg-background flex grow-1 flex-col items-start px-5 pt-3 pb-9 text-left">
            <p className="!text-foreground-light">
              <Text field={product.Category?.fields?.CategoryName} />
            </p>

            <h6 className="!text-foreground mt-1 font-semibold">
              <Text field={product.Title} />
            </h6>

            <StarRating
              rating={product.Rating?.value || 0}
              showOnlyFilled
              className="!text-accent mt-1 mb-5"
            />

            <h6 className="!text-foreground mt-auto font-semibold">
              <span className="mr-1 align-super text-sm">{currencySymbol} </span>
              {formattedPrice}
            </h6>
          </div>
        </div>
      </div>
    </Link>
  );
};
