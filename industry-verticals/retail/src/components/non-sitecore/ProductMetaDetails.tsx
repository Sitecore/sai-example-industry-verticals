import { Text as ContentSdkText, useSitecore } from '@sitecore-content-sdk/nextjs';
import { useEffect, useState } from 'react';
import SocialShare from '../non-sitecore/SocialShare';
import { useI18n } from 'next-localization';
import { Product } from '@/types/products';

interface ProductMetaDetalsProps {
  product: Product;
}

export const ProductMetaDetals = ({ product }: ProductMetaDetalsProps) => {
  const { page } = useSitecore();
  const { t } = useI18n();

  const isPageEditing = page.mode.isEditing;

  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, [product]);

  return (
    <>
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
    </>
  );
};
