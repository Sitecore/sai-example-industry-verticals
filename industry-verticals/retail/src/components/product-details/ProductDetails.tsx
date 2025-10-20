import {
  ImageField,
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  Placeholder,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { useEffect, useState } from 'react';
import { ComponentProps } from '@/lib/component-props';
import SocialShare from '../non-sitecore/SocialShare';
import { Plus, ShoppingCart } from 'lucide-react';
import { isParamEnabled } from '@/helpers/isParamEnabled';
import { useI18n } from 'next-localization';
import { Product } from '@/types/products';
// import StarRating from '../non-sitecore/StarRating';
import { ProductTabs } from '../non-sitecore/ProductTabs';
import { useLocale } from '@/hooks/useLocaleOptions';

interface ProductDetailsProps extends ComponentProps {
  params: { [key: string]: string };
  fields: Product;
}

export const Default = (props: ProductDetailsProps) => {
  const { page } = useSitecore();
  const { t } = useI18n();

  const id = props?.params?.RenderingIdentifier;
  const styles = `${props?.params?.styles || ''}`.trim();
  const isPageEditing = page.mode.isEditing;
  const { currency } = useLocale();

  const product = props?.fields;
  const ShowCompareButton = isParamEnabled(props?.params?.ShowCompareButton);
  const ShowAddtoCartButton = isParamEnabled(props?.params?.ShowAddtoCartButton);

  const relatedProductsPlaceholderKey = `related-products-${props?.params?.DynamicPlaceholderId}`;

  const actionBtnBase =
    'text-accent hover:text-accent/80 flex h-10 items-center gap-2 border-none bg-transparent font-medium underline underline-offset-4 text-lg';

  const images: ImageField[] = [
    product.Image1,
    product.Image2,
    product.Image3,
    product.Image4,
    product.Image5,
  ].filter((img): img is ImageField => Boolean(img?.value?.src));

  const [currentUrl, setCurrentUrl] = useState('');
  const [mainImage, setMainImage] = useState<ImageField>(images[0]);
  const [selectedColor, setSelectedColor] = useState(product?.Color?.[0]);
  const [selectedSize, setSelectedSize] = useState(product?.Size?.[0]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  if (!props.fields.Title) {
    return isPageEditing ? (
      <div className={`component article-listing ${styles}`} id={id}>
        [Product Details]
      </div>
    ) : (
      <></>
    );
  }

  return (
    <section className={`component article-listing py-6 ${styles}`} id={id}>
      <div className="container">
        {/* === MAIN GRID === */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left image section */}
          <div className="flex w-full flex-col gap-3 md:flex-row">
            {/* Thumbnails */}
            <div className="flex gap-3 md:flex-col md:justify-start">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  disabled={img === mainImage}
                  className={`bg-background-muted size-15 overflow-hidden rounded object-center xl:size-18 ${
                    img === mainImage
                      ? 'cursor-not-allowed opacity-50'
                      : 'hover:ring-accent hover:ring-2'
                  }`}
                >
                  <ContentSdkImage field={img} className="object-cover" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="grow">
              <ContentSdkImage
                field={mainImage}
                className="bg-background-muted aspect-square w-full rounded-md object-contain p-4"
              />
            </div>
          </div>

          {/* Right product info */}
          <div className="min-w-0 space-y-4 pb-4 lg:px-10">
            <h1 className="pt-3 text-4xl font-bold lg:pt-0">
              <ContentSdkText field={product.Title} />
            </h1>

            {/* Price */}
            {(product?.Price?.value || isPageEditing) && (
              <p className="text-xl">
                {currency} <ContentSdkText field={product.Price} />
              </p>
            )}

            {/* Rating */}
            {/* {(product?.Rating?.value || isPageEditing) && (
              <StarRating rating={product.Rating.value} className="!text-accent mt-1" />
            )} */}

            {/* Short Description */}
            {(product?.ShortDescription?.value || isPageEditing) && (
              <ContentSdkText
                field={product.ShortDescription}
                className="text-foreground text-base"
              />
            )}

            <div className="flex flex-col gap-4 pb-4 sm:flex-row sm:items-start sm:gap-8">
              {/* Sizes */}
              {Array.isArray(product?.Size) && product.Size.length > 0 && (
                <div className="pr-10">
                  <p className="mb-2 text-sm">{t('product_size_label') || 'Size'}</p>
                  <div className="flex gap-3">
                    {product.Size.map((size) => (
                      <button
                        key={size.id}
                        onClick={() => setSelectedSize(size)}
                        className={`size-8 rounded text-sm ${
                          selectedSize?.id === size.id
                            ? 'bg-accent text-background'
                            : 'bg-background-accent'
                        }`}
                      >
                        {size.fields?.ProductSize?.value ?? '-'}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors */}
              {Array.isArray(product?.Color) && product.Color.length > 0 && (
                <div>
                  <p className="mb-2 text-sm">{t('product_color_label') || 'Color'}</p>
                  <div className="flex gap-3">
                    {product.Color.map((color) => (
                      <button
                        aria-label="Select Color"
                        key={color.id}
                        onClick={() => setSelectedColor(color)}
                        className={`size-8 rounded-full border-2 ${
                          selectedColor?.id === color.id
                            ? 'ring-accent ring-2 ring-offset-2'
                            : 'border-muted'
                        }`}
                        style={{ backgroundColor: color.fields?.HexCode?.value }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-14">
              {ShowCompareButton && (
                <button className={actionBtnBase}>
                  <Plus className="size-5" /> {t('compare_btn_text') || 'Compare'}
                </button>
              )}

              {ShowAddtoCartButton && (
                <button className={actionBtnBase}>
                  <ShoppingCart className="size-5" /> {t('cart_btn_text') || 'Add to Cart'}
                </button>
              )}
            </div>
          </div>

          {/* Meta info */}
          <div className="text-foreground-light mx-0 border-t pt-10 text-sm sm:pb-6 lg:col-start-2 lg:mx-10">
            <dl className="grid grid-cols-[auto_16px_1fr] gap-x-2 gap-y-4">
              {(product?.SKU?.value || isPageEditing) && (
                <>
                  <dt>{t('product_sku_label') || 'SKU'}</dt>
                  <dd className="text-center">:</dd>
                  <dd>
                    <ContentSdkText field={product.SKU} />
                  </dd>
                </>
              )}

              {product.Category?.fields?.CategoryName?.value && (
                <>
                  <dt>{t('product_category_label') || 'Category'}</dt>
                  <dd className="text-center">:</dd>
                  <dd>{product.Category?.fields?.CategoryName?.value}</dd>
                </>
              )}

              {Array.isArray(product?.Tags) && product.Tags.length > 0 && (
                <>
                  <dt>{t('product_tags_label') || 'Tags'}</dt>
                  <dd className="text-center">:</dd>
                  <dd>{product.Tags.map((t) => t.fields.Tag.value).join(', ')}</dd>
                </>
              )}

              <dt className="flex items-center">{t('product_share_label') || 'Share'}</dt>
              <dd className="flex items-center justify-center">:</dd>
              <dd className="mr-1">
                <SocialShare
                  url={currentUrl}
                  title={product.Title?.value ?? ''}
                  round={true}
                  className="flex flex-wrap gap-3"
                  iconClassName="size-8"
                />
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <ProductTabs
        product={product}
        isPageEditing={isPageEditing}
        dynamicPlaceholderId={props.params.DynamicPlaceholderId}
        rendering={props.rendering}
      />
      <Placeholder name={relatedProductsPlaceholderKey} rendering={props.rendering} />
    </section>
  );
};
