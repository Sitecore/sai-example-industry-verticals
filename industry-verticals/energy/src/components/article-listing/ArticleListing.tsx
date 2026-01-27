import { getArticlesCountsByCategory } from '@/helpers/articleHelpers';
import { ComponentProps } from '@/lib/component-props';
import InfiniteScroll from '@/shadcn/components/ui/infiniteScroll';
import { ArticleFields } from '@/types/article';
import { NextImage as ContentSdkImage } from '@sitecore-content-sdk/nextjs';
import { Loader2 } from 'lucide-react';
import { useI18n } from 'next-localization';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ArticleCard from '../non-sitecore/ArticleCard';

interface ArticleListingProps extends ComponentProps {
  params: { [key: string]: string };
  fields: {
    items: {
      id: string;
      url: string;
      fields: ArticleFields;
    }[];
  };
}

export const Default = (props: ArticleListingProps) => {
  const { t } = useI18n();
  const id = props.params.RenderingIdentifier;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const articles = props.fields?.items.filter(({ fields }) => fields && Object.keys(fields).length);
  const articlesCategoryCounts = getArticlesCountsByCategory(articles);

  const handleSelectAllArticles = () => {
    setSelectedCategory(null);
    setVisibleCount(articles?.length);
  };

  const filteredArticles = useMemo(() => {
    if (!selectedCategory) return articles;
    return articles.filter(
      (article) => article?.fields?.Category?.fields?.Category?.value === selectedCategory
    );
  }, [selectedCategory, articles]);

  const PAGE_SIZE = 6;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(false);

  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + PAGE_SIZE);
      setIsLoading(false);
    }, 500);
  }, [hasMore, isLoading]);

  useEffect(() => {
    if (selectedCategory) {
      setVisibleCount(PAGE_SIZE);
    }
  }, [selectedCategory]);

  return (
    <section className={`${props?.params?.styles?.trimEnd()}`} id={id}>
      <div className="container py-5">
        <div className="py-10">
          <h5>{t('browse_by_category_label') || 'Browse by Category'}</h5>
          <div className="grid grid-cols-2 gap-4 py-5 md:grid-cols-3 lg:grid-cols-6">
            {articlesCategoryCounts.map((category, index) => (
              <div
                key={category.name + index}
                onClick={() => setSelectedCategory(category.name)}
                className={`bg-background flex aspect-square w-full cursor-pointer flex-col items-center justify-center rounded-lg border shadow-md transition-colors hover:shadow-lg ${selectedCategory === category.name ? 'border-accent pointer-events-none shadow-lg' : ''}`}
              >
                <div>
                  <ContentSdkImage
                    field={category.icon}
                    width={50}
                    height={50}
                    className="p-1"
                    priority
                  />
                </div>

                <div className="mt-2 text-center font-bold xl:mt-5">{category.name}</div>
                <div className="border-accent text-accent-dark bg-background-accent mt-2 rounded-md border px-2 text-sm font-medium">
                  {category.count} {t('articles_label') || 'articles'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between">
            <h5>{t('latest_articles_label') || 'Latest Articles'}</h5>
            <button className="simple-btn" onClick={handleSelectAllArticles}>
              {t('view_all_articles_label') || 'View All Articles'}
            </button>
          </div>
          <div className="grid grid-cols-1 gap-5 py-5 md:grid-cols-2 lg:grid-cols-3">
            {visibleArticles?.map(({ fields, id, url }) => (
              <ArticleCard key={id} fields={fields} id={id} url={url} />
            ))}

            <InfiniteScroll isLoading={isLoading} hasMore={hasMore} next={loadMore} threshold={1}>
              {hasMore && (
                <div className="col-span-full flex justify-center py-4">
                  <Loader2 className="text-accent-dark h-8 w-8 animate-spin" />
                </div>
              )}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </section>
  );
};
