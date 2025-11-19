import * as React from 'react';
import { Loader2 } from 'lucide-react';
import InfiniteScroll from '@/shadcn/components/ui/infiniteScroll';
import { ComponentProps } from '@/lib/component-props';
import { ProductCard } from '@/components/non-sitecore/ProductCard';
import { Category, Product, ProductIGQL } from '@/types/products';
import { useI18n } from 'next-localization';

interface ProductCategoryPage {
  id: string;
  name: string;
  children: {
    results: ProductIGQL[];
  };
}

interface ProductListingProps extends ComponentProps {
  params: { [key: string]: string };
  fields: {
    data: {
      contextItem: {
        children: {
          results: ProductCategoryPage[] | ProductIGQL[];
        };
      };
    };
  };
}

export const Default = (props: ProductListingProps) => {
  const id = props.params.RenderingIdentifier;
  const items = props.fields.data.contextItem.children.results;

  const { t } = useI18n();

  const unformattedProducts = items
    .filter((item) => Object.keys(item).length !== 0)
    .flatMap((item) => {
      // Check if the item has children property (ProductCategoryPage)
      if ('children' in item && item.children?.results) {
        return item.children.results;
      } else {
        // Otherwise, it's a Product itself
        return [item as ProductIGQL];
      }
    });

  const products = unformattedProducts
    .map((product) => {
      return {
        Title: product?.title?.jsonValue,
        Price: product?.price?.jsonValue,
        Image1: product?.image1?.jsonValue,
        Image2: product?.image2?.jsonValue,
        Category: product?.category?.jsonValue,
        id: product?.id,
        url: product?.url?.path,
      };
    })
    .filter((product) => product.id);

  // Filtering logic
  const categories: Category[] = [];
  products.forEach((product) => {
    const category = product.Category?.fields.CategoryName.value;
    if (!categories.find((cat) => cat?.fields.CategoryName.value === category)) {
      categories.push(product.Category);
    }
  });

  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const filteredProducts = React.useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter((p) => p.Category?.fields.CategoryName.value === selectedCategory);
  }, [selectedCategory, products]);

  // Infinite scroll state
  const PAGE_SIZE = 8;
  const [visibleCount, setVisibleCount] = React.useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = React.useState(false);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const loadMore = React.useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + PAGE_SIZE);
      setIsLoading(false);
    }, 500);
  }, [hasMore, isLoading]);

  React.useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [selectedCategory]);

  return (
    <section
      className={`component product-listing py-18 ${props?.params.styles.trimEnd()}`}
      id={id}
    >
      <div className="container">
        {categories.length > 0 && (
          <div className="mb-8 flex flex-wrap items-center gap-6 text-xl font-light">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`hover:text-accemt transition-colors ${
                !selectedCategory ? 'text-accent underline' : 'text-foreground'
              }`}
            >
              {t('all_label') || 'All'}
            </button>

            {categories.map((cat) => (
              <button
                key={cat?.id}
                onClick={() => setSelectedCategory(cat?.fields.CategoryName.value)}
                className={`hover:text-accent transition-colors ${
                  selectedCategory === cat?.fields.CategoryName.value
                    ? 'text-accent underline'
                    : 'text-foreground'
                }`}
              >
                {cat?.fields.CategoryName.value}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {visibleProducts.map(({ id, url, ...rest }) => (
            <ProductCard key={id} product={rest as Product} url={url} productId={id} />
          ))}

          <InfiniteScroll isLoading={isLoading} hasMore={hasMore} next={loadMore} threshold={1}>
            {hasMore && (
              <div className="col-span-full flex justify-center py-4">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
              </div>
            )}
          </InfiniteScroll>
        </div>
      </div>
    </section>
  );
};
