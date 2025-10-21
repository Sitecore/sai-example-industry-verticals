import { usePagination } from '@/hooks/usePagination';
import { ComponentProps } from '@/lib/component-props';
import { useI18n } from 'next-localization';
import { useState } from 'react';
import { ProductCard } from '@/components/non-sitecore/ProductCard';
import { Pagination } from '../non-sitecore/Pagination';
import { ChevronDown } from 'lucide-react';
import { ProductIGQL } from '@/types/products';
import { calculateAverageRatingFromIGQL } from '@/helpers/productUtils';

interface ProductCategory {
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
          results: ProductCategory[] | ProductIGQL[];
        };
      };
    };
  };
}

export const Default = (props: ProductListingProps) => {
  const { t } = useI18n();
  const id = props.params.RenderingIdentifier;
  const items = props.fields.data.contextItem.children.results;

  const unformattedProducts = items
    .filter((item) => Object.keys(item).length !== 0)
    .flatMap((item) => {
      // Check if the item has children property (ProductCategory)
      if ('children' in item && item.children?.results) {
        return item.children.results;
      }
      // Otherwise, it's a Product itself
      return [item as ProductIGQL];
    });

  const products = unformattedProducts.map((product) => {
    return {
      Title: product.title.jsonValue,
      Price: product.price.jsonValue,
      Image1: product.image1.jsonValue,
      Category: product.category.jsonValue,
      Rating: calculateAverageRatingFromIGQL(product.reviews?.targetItems || []),
      id: product.id,
      url: product.url.path,
    };
  });

  const sortOptions = [
    { value: 'default', label: t('product-listing-sort-default') || 'Default' },
    { value: 'price-asc', label: t('product-listing-sort-price-asc') || 'Price: Low to High' },
    { value: 'price-desc', label: t('product-listing-sort-price-desc') || 'Price: High to Low' },
    { value: 'name-asc', label: t('product-listing-sort-name-asc') || 'Name: A to Z' },
    { value: 'name-desc', label: t('product-listing-sort-name-desc') || 'Name: Z to A' },
  ];

  const [displayCount, setDisplayCount] = useState(12);
  const [sortOption, setSortOptions] = useState(sortOptions[0].value);
  const [currentPage, setCurrentPage] = useState(1);

  const { getPageSlice } = usePagination({
    totalItems: products.length,
    currentPage,
    itemsPerPage: displayCount,
    windowSize: 3,
  });

  const [startIndex, endIndex] = getPageSlice();

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return (a.Price?.value || 0) - (b.Price?.value || 0);
      case 'price-desc':
        return (b.Price?.value || 0) - (a.Price?.value || 0);
      case 'name-asc':
        return (a.Title?.value || '').localeCompare(b.Title?.value || '');
      case 'name-desc':
        return (b.Title?.value || '').localeCompare(a.Title?.value || '');
      default:
        return 0;
    }
  });

  const currentPageProducts = sortedProducts.slice(startIndex, endIndex);

  const handleDisplayCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= 100) {
      setDisplayCount(value);
      setCurrentPage(1);
    }
  };

  return (
    <section className={`component product-listing ${props?.params.styles.trimEnd()}`} id={id}>
      {/* Sort and Filter */}
      <div className="bg-background-accent">
        <div className="container flex flex-col justify-between gap-5 py-5 sm:flex-row sm:items-center">
          <div>
            {t('product-listing-showing') || 'Showing'} {Math.min(products.length, startIndex + 1)}{' '}
            - {Math.min(endIndex, products.length)} {t('product-listing-of') || 'of'}{' '}
            {products.length} {t('product-listing-results') || 'results'}
          </div>

          {/* Sort Options */}
          <div className="gap flex items-center gap-x-7">
            <div>
              <label htmlFor="items-per-page" className="me-4 text-lg">
                {t('product-listing-show') || 'Show'}
              </label>
              <input
                type="number"
                id="items-per-page"
                className="bg-background outline-border text-foreground-light size-14 rounded-md text-center text-lg [&::-webkit-inner-spin-button]:appearance-none"
                value={displayCount}
                onChange={handleDisplayCountChange}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center">
              <label htmlFor="sort-by" className="me-4 text-lg">
                {t('product-listing-sort-by') || 'Sort by'}
              </label>
              <div className="relative">
                <select
                  id="sort-by"
                  className="bg-background text-foreground-light outline-border h-14 w-full appearance-none rounded-md px-7 pr-17 text-lg"
                  value={sortOption}
                  onChange={(e) => setSortOptions(e.target.value)}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="text-foreground-light pointer-events-none absolute top-1/2 right-7 size-7 -translate-y-1/2 transform" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="container mt-14 mb-20">
        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-10 2xl:grid-cols-6">
          {currentPageProducts.map(({ id, url, ...rest }) => (
            <ProductCard key={id} product={rest} url={url} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          totalItems={products.length}
          itemsPerPage={displayCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </section>
  );
};
