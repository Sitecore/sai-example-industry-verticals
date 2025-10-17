import { Placeholder, useSitecore } from '@sitecore-content-sdk/nextjs';
import { useEffect, useState } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { Heart, Plus } from 'lucide-react';
import { isParamEnabled } from '@/helpers/isParamEnabled';
import { useI18n } from 'next-localization';
import { Product } from '@/types/products';
import { ProductTabs } from '../non-sitecore/ProductTabs';
import QuantityControl from '../non-sitecore/QuantityControl';
import { AddToCartButton } from '../non-sitecore/AddToCartButton';
import { ProductGallery } from '../non-sitecore/ProductGallery';
import { ProductMetaDetals } from '../non-sitecore/ProductMetaDetails';
import { ProductDescription } from '../non-sitecore/ProductDescription';
import { ProductSizeControl } from '../non-sitecore/ProductSizeControl';
import { ProductColorControl } from '../non-sitecore/ProductColorControl';

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
      <div className={`component article-listing py-6 ${styles}`} id={id}>
        [Product Details]
      </div>
    ) : (
      <></>
    );
  }

  return (
    <section className={`component article-listing py-6 ${styles}`} id={id}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left image section */}
          <ProductGallery product={product} key={productId} />

          {/* Right product info */}
          <div className="max-w-xl space-y-4 pb-4 lg:px-10">
            <ProductDescription product={product} />

            <div className="flex flex-wrap justify-between gap-4 py-5">
              {/* Sizes */}
              {!!product?.Size?.length && (
                <div>
                  <p className="mb-2 text-sm">{t('product_size_label') || 'Size'}</p>
                  <ProductSizeControl
                    sizes={product.Size}
                    selectedSize={selectedSize}
                    onSelect={setSelectedSize}
                  />
                </div>
              )}

              {/* Colors */}
              {!!product?.Color?.length && (
                <div>
                  <p className="mb-2 text-sm">{t('product_color_label') || 'Color'}</p>
                  <ProductColorControl
                    colors={product.Color}
                    selectedColor={selectedColor}
                    onSelect={setSelectedColor}
                  />
                </div>
              )}

              {/* Quantity */}
              <div>
                <p className="mb-2 text-sm">{t('product_quantity_label') || 'Quantity'}</p>
                <QuantityControl
                  quantity={selectedQuantity}
                  onChange={setSelectedQuantity}
                  isLarge
                />
              </div>
            </div>

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
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              {ShowCompareButton && (
                <button className="action-btn">
                  <Plus className="size-5" strokeWidth={3} />
                  {t('compare_btn_text') || 'Compare'}
                </button>
              )}

              {ShowAddtoWishlistButton && (
                <button className="action-btn">
                  <Heart className="size-5" strokeWidth={3} />
                  {t('wishlist_btn_text') || 'Add to Wishlist'}
                </button>
              )}
            </div>
          </div>

          <ProductMetaDetals product={product} />
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
