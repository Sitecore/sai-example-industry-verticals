import { NextImage as ContentSdkImage, Text } from '@sitecore-content-sdk/nextjs';
import Link from 'next/link';
import { Product } from '@/types/products';
import { useLocale } from '@/hooks/useLocaleOptions';

interface ProductCardProps {
  product: Product;
  productId: string;
  url: string;
  className?: string;
}

export const ProductCard = ({ product, url, className }: ProductCardProps) => {
  const { currencySymbol } = useLocale();
  const formattedPrice =
    product.Price?.value && !isNaN(product.Price?.value)
      ? product.Price.value.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })
      : product.Price?.value;

  return (
    <div className={`flex flex-col gap-8 ${className}`}>
      <Link href={url || '#'} className="mb-auto">
        <div className="group bg-background-accent relative aspect-3/4">
          <ContentSdkImage field={product.Image1} className="size-full object-cover" priority />
          <ContentSdkImage
            field={product.Image2}
            className="absolute inset-0 z-5 size-full object-cover opacity-0 transition-opacity group-hover:opacity-100"
            priority
          />
        </div>

        <h6 className="font-body mt-8 text-lg font-light">
          <Text field={product.Title} />
        </h6>

        <p className="text-foreground-light mt-3 font-normal">
          <span>{currencySymbol} </span>
          {formattedPrice}
        </p>
      </Link>
      {/* Add to cart button TBD */}
      {/* <AddToCartButton productId={productId} product={product} /> */}
      <Link href={url || '#'} className="outline-btn self-start">
        View
      </Link>
    </div>
  );
};
