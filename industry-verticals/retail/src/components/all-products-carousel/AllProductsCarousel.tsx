import { ComponentProps } from '@/lib/component-props';
import { useMemo, useState } from 'react';
import { CategoryFields, Product } from '@/types/products';
import ProductCarousel from '../non-sitecore/ProductCarousel';
import { isParamEnabled } from '@/helpers/isParamEnabled';
import { SitecoreItem } from '@/types/common';
import { useI18n } from 'next-localization';

interface ProductCarouselProps extends ComponentProps {
  fields: {
    items: SitecoreItem<Product | CategoryFields>[];
  };
}

export const Default = ({ params, fields }: ProductCarouselProps) => {
  const { t } = useI18n();
  const id = params.RenderingIdentifier;
  const { items } = fields;
  const allProductsCategory = t('all_products_category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState<string>(allProductsCategory);
  const autoPlay = isParamEnabled(params.Autoplay);
  const loop = isParamEnabled(params.Loop);

  // Filter out category items and only keep product items
  const productItems = useMemo(() => {
    return items.filter((item): item is SitecoreItem<Product> => {
      return 'Title' in item.fields && 'Price' in item.fields;
    });
  }, [items]);

  // Get unique categories from products
  const categories = useMemo(() => {
    const productCategories = productItems
      .map((item) => item.fields.Category?.fields?.CategoryName?.value || null)
      .filter((category): category is string => Boolean(category));
    return [allProductsCategory, ...Array.from(new Set(productCategories))];
  }, [productItems, allProductsCategory]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === allProductsCategory) return productItems;
    return productItems.filter(
      (item) => item.fields.Category?.fields?.CategoryName?.value === selectedCategory
    );
  }, [productItems, selectedCategory, allProductsCategory]);

  return (
    <div className={`component all-products-carousel py-5 ${params.styles}`} id={id}>
      <div className="container flex flex-col items-center gap-10 text-center">
        {/* Category Filter */}
        <div className="bg-border flex flex-wrap justify-center rounded-lg p-1 text-lg leading-8">
          {categories.map((category) => (
            <button
              className={`!text-foreground rounded-lg px-8 py-2 ${selectedCategory === category ? 'bg-background' : ''}`}
              onClick={() => setSelectedCategory(category)}
              key={category}
            >
              {category}
            </button>
          ))}
        </div>

        <ProductCarousel products={filteredProducts} autoPlay={autoPlay} loop={loop} />
      </div>
    </div>
  );
};
