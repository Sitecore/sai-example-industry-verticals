import { Placeholder, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { useEffect, useState } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { Check, Heart, Plus } from 'lucide-react';
import { isParamEnabled } from '@/helpers/isParamEnabled';
import { useI18n } from 'next-localization';
import { Product } from '@/types/products';
import QuantityControl from '../non-sitecore/QuantityControl';
import { ProductGallery } from '../non-sitecore/ProductGallery';
import { ProductMetaDetals } from '../non-sitecore/ProductMetaDetails';
import { ProductSizeControl } from '../non-sitecore/ProductSizeControl';
import { ProductColorControl } from '../non-sitecore/ProductColorControl';
import { AddToCartButton } from '../non-sitecore/AddToCartButton';
import { useLocale } from '@/hooks/useLocaleOptions';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shadcn/components/ui/accordion';
import { ParentPathLink } from '../non-sitecore/ParentPathLink';
import { ProductReviews } from '../non-sitecore/ProductReviews';

interface ProductDetailsProps extends ComponentProps {
  params: { [key: string]: string };
  fields: Product;
}

export const Default = (props: ProductDetailsProps) => {
  const { page } = useSitecore();
  const { t } = useI18n();
  const { currency } = useLocale();

  const id = props?.params?.RenderingIdentifier;
  const styles = `${props?.params?.styles || ''}`.trim();
  const isPageEditing = page.mode.isEditing;

  const product = props?.fields;
  const productId = page.layout.sitecore.route?.itemId;

  const ShowCompareButton = isParamEnabled(props?.params?.ShowCompareButton);
  const ShowAddtoCartButton = isParamEnabled(props?.params?.ShowAddtoCartButton);
  const ShowAddtoWishlistButton = isParamEnabled(props?.params?.ShowAddtoWishlistButton);

  const relatedProductsPlaceholderKey = `related-products-${props?.params?.DynamicPlaceholderId}`;

  const [selectedColor, setSelectedColor] = useState(product?.Color?.[0]);
  const [selectedSize, setSelectedSize] = useState(product?.Size?.[0]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    setSelectedColor(product?.Color?.[0]);
    setSelectedSize(product?.Size?.[0]);
    setSelectedQuantity(1);
  }, [product?.Color, product?.Size, productId]);

  if (!props.fields?.Title) {
    return isPageEditing ? (
      <div className={`component article-listing py-10 ${styles}`} id={id}>
        [Product Details]
      </div>
    ) : (
      <></>
    );
  }

  return (
    <section className={`component article-listing ${styles}`} id={id}>
      <div className="container py-10">
        <ParentPathLink text={t('return_to_product_list_label') || 'Return to product list'} />
        <div className="relative mt-3 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left image section */}
          <ProductGallery product={product} key={productId} />

          {/* Right product info */}
          <div className="relative">
            <div className="mx-auto max-w-lg space-y-6 py-4 lg:sticky lg:top-0 lg:left-0 lg:py-12">
              <h1 className="text-4xl">
                <Text field={product.Title} />
              </h1>

              {(product?.Price?.value || isPageEditing) && (
                <p className="text-foreground-light text-2xl">
                  {currency} <Text field={product.Price} />
                </p>
              )}

              {/* Sizes */}
              {!!product?.Size?.length && (
                <ProductSizeControl
                  sizes={product.Size}
                  selectedSize={selectedSize}
                  onSelect={setSelectedSize}
                />
              )}

              {/* Colors */}
              {!!product?.Color?.length && (
                <ProductColorControl
                  colors={product.Color}
                  selectedColor={selectedColor}
                  onSelect={setSelectedColor}
                />
              )}

              <QuantityControl quantity={selectedQuantity} onChange={setSelectedQuantity} isLarge />
              {/* Add to cart */}
              {ShowAddtoCartButton && (
                <AddToCartButton
                  productId={productId || ''}
                  product={product}
                  selectedQuantity={selectedQuantity}
                  selectedColor={selectedColor}
                  selectedSize={selectedSize}
                />
              )}

              {/* Action Buttons */}
              {(ShowCompareButton || ShowAddtoWishlistButton) && (
                <div className="mb-8 flex flex-wrap justify-between gap-x-10 gap-y-4">
                  {ShowCompareButton && (
                    <button className="action-btn">
                      <Plus className="size-4" />
                      {t('compare_btn_text') || 'Compare'}
                    </button>
                  )}

                  {ShowAddtoWishlistButton && (
                    <button className="action-btn">
                      <Heart className="size-4" />
                      {t('wishlist_btn_text') || 'Add to Wishlist'}
                    </button>
                  )}
                </div>
              )}

              <p className="flex items-center gap-3">
                <Check className="size-4" />
                <span>{t('available_in_store') || 'Available in store'}</span>
              </p>
              <p className="flex items-center gap-3">
                <Check className="size-4" />
                <span>{t('available_online') || 'Available online'}</span>
              </p>

              <Accordion type="single" defaultValue="description" collapsible className="mt-2">
                {(product?.ShortDescription?.value || isPageEditing) && (
                  <AccordionItem value="description">
                    <AccordionTrigger>
                      {t('description_accordion_label') || 'Description'}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        <Text field={product.ShortDescription} />
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                )}

                <AccordionItem value="details">
                  <AccordionTrigger>{t('details_accordion_label') || 'Details'}</AccordionTrigger>
                  <AccordionContent>
                    <ProductMetaDetals product={product} />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="reviews">
                  <AccordionTrigger>{t('reviews_accordion_label') || 'Reviews'}</AccordionTrigger>
                  <AccordionContent>
                    <ProductReviews reviews={product.Reviews} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      <Placeholder name={relatedProductsPlaceholderKey} rendering={props.rendering} />
    </section>
  );
};
