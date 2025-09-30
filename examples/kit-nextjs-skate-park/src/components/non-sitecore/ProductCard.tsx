import {
  Field,
  ImageField,
  NextImage as ContentSdkImage,
  Text,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import StarRating from './StarRating';
import Link from 'next/link';
import { localeOptions } from '@/constants/localeOptions';

interface ProductCardProps {
  image: ImageField;
  name: Field<string>;
  category: Field<string>;
  price: Field<number>;
  rating: number;
  url: string;
  className?: string;
}

export const ProductCard = ({
  image,
  name,
  category,
  price,
  rating,
  url,
  className,
}: ProductCardProps) => {
  const { page } = useSitecore();

  const currencySymbol = localeOptions.find((l) => l.code === page.locale)?.currencySymbol;
  const formattedPrice =
    price?.value && !isNaN(price?.value)
      ? price.value.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })
      : price?.value;

  return (
    <Link href={url} passHref>
      <div
        className={`flex min-h-123 w-full flex-col overflow-hidden rounded-2xl hover:drop-shadow-sm ${className}`}
      >
        {/* Product Image */}
        <div className="bg-background-card-image flex h-72 w-full items-center justify-center p-6">
          <ContentSdkImage
            field={image}
            className="max-h-full max-w-full object-contain"
            priority
          />
        </div>

        {/* Product Details */}
        <div className="bg-background flex grow-1 flex-col items-start px-5 pt-3 pb-9 text-left">
          <p className="!text-foreground-light">
            <Text field={category} />
          </p>

          <h6 className="!text-foreground mt-1 font-semibold">
            <Text field={name} />
          </h6>

          <StarRating rating={rating} showOnlyFilled className="!text-accent mt-1 mb-5" />

          <h6 className="!text-foreground mt-auto font-semibold">
            <span className="mr-1 align-super text-sm">{currencySymbol} </span>
            {formattedPrice}
          </h6>
        </div>
      </div>
    </Link>
  );
};
