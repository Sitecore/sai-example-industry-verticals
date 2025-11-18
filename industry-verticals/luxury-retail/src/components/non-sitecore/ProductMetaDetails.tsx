import { Text as ContentSdkText, useSitecore } from '@sitecore-content-sdk/nextjs';
import { useI18n } from 'next-localization';
import { Product } from '@/types/products';

interface ProductMetaDetalsProps {
  product: Product;
}

export const ProductMetaDetals = ({ product }: ProductMetaDetalsProps) => {
  const { page } = useSitecore();
  const { t } = useI18n();

  const isPageEditing = page.mode.isEditing;

  return (
    <>
      <div>
        <dl className="grid grid-cols-[auto_16px_1fr] gap-x-2 gap-y-3 text-sm">
          {(product?.SKU?.value || isPageEditing) && (
            <>
              <dt>{t('product_sku_label') || 'SKU'}</dt>
              <dd className="text-center">:</dd>
              <dd className="font-light">
                <ContentSdkText field={product.SKU} />
              </dd>
            </>
          )}

          {product.Category?.fields?.CategoryName?.value && (
            <>
              <dt>{t('product_category_label') || 'Category'}</dt>
              <dd className="text-center">:</dd>
              <dd className="font-light">{product.Category?.fields?.CategoryName?.value}</dd>
            </>
          )}

          {Array.isArray(product?.Tags) && product.Tags.length > 0 && (
            <>
              <dt>{t('product_tags_label') || 'Tags'}</dt>
              <dd className="text-center">:</dd>
              <dd className="font-light">
                {product.Tags.map((t) => t.fields.Tag.value).join(', ')}
              </dd>
            </>
          )}
        </dl>
      </div>
    </>
  );
};
