import { useState, useMemo } from 'react';
import {
  Field,
  ImageField,
  RichText as ContentSdkRichText,
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  DateField,
  TextField,
  RichTextField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import Link from 'next/link';
import { useI18n } from 'next-localization';
import { Author, Category, Tag } from '@/types/article';
import { newsDateFormatter } from '@/helpers/dateHelper';
import { Calendar, Clock, Heart, Share2, User } from 'lucide-react';
import { TitleSectionFlags } from '@/types/styleFlags';

export interface Article {
  Title: Field<string>;
  ShortDescription: Field<string>;
  Content: RichTextField;
  Image: ImageField;
  PublishedDate: Field<string>;
  Author: Author;
  Tags: Tag[];
  Category: Category;
  ReadTime: TextField;
}

interface ArticleListingProps extends ComponentProps {
  params: { [key: string]: string };
  fields: {
    items: {
      id: string;
      url: string;
      fields: Article;
    }[];
  };
}

const ITEMS_PER_PAGE = 3;

export const Default = (props: ArticleListingProps) => {
  const { t } = useI18n();
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;
  const hideTitleSection = props.params?.styles?.includes(TitleSectionFlags.HideTitleSection);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Filter articles based on selected category
  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'All') {
      return props.fields.items;
    }
    return props.fields.items.filter((article) => {
      const categoryValue = article.fields.Category?.fields?.Category?.value || '';
      return categoryValue === selectedCategory;
    });
  }, [props.fields.items, selectedCategory]);

  const categories = useMemo<string[]>(() => {
    const categorySet = new Set<string>();

    props.fields.items.forEach((article) => {
      const categoryValue = article.fields.Category?.fields?.Category?.value;

      if (categoryValue) {
        categorySet.add(categoryValue);
      }
    });

    return ['All', ...Array.from(categorySet)];
  }, [props.fields.items]);

  const articles = useMemo(() => {
    return props.fields.items.filter(
      (article) => article.fields && Object.keys(article.fields).length > 0
    );
  }, [props.fields.items]);

  const [currentPage, setCurrentPage] = useState(1);
  const displayedArticles = useMemo(() => {
    return articles.slice(0, currentPage * ITEMS_PER_PAGE);
  }, [currentPage, articles]);

  const hasMore = displayedArticles.length < articles.length;

  const handleLoadMore = () => {
    if (hasMore) setCurrentPage((prev) => prev + 1);
  };

  return (
    <section className={`bg-background-muted py-8 ${sxaStyles}`} id={id}>
      <div className="container mx-auto px-4">
        {/* Category Filter */}
        <div className="mx-auto mb-16 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`mb-2 inline-flex h-8 items-center justify-center rounded-md px-3 text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-foreground text-background hover:bg-foreground/90 shadow-xs'
                  : 'text-foreground border-border hover:bg-background-hover border bg-transparent'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {!hideTitleSection && (
          <div className="mb-10">
            <h2 className="mb-2">{t('title') || 'Popular Articles'}</h2>
            <p className="text-foreground-light text-xl">
              {t('description') || 'Fresh travel inspiration and tips'}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article, index) => (
            <div className="info-card flex h-full flex-col overflow-hidden p-0!" key={index}>
              {/* upper section */}
              <div className="group relative">
                <ContentSdkImage
                  field={article?.fields?.Image}
                  width={400}
                  height={300}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <p className="bg-accent absolute top-4 left-4 z-10 max-w-max rounded px-2 py-1 text-xs text-white">
                  <ContentSdkText field={article?.fields?.Category?.fields?.Category} />
                </p>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-6">
                {/* content section */}
                <div>
                  <div className="text-accent-gray mb-3 flex flex-col space-y-1 text-sm xl:flex-row xl:justify-between">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>
                        <ContentSdkText field={article?.fields?.Author?.fields?.AuthorName} />
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>
                        <DateField
                          field={article?.fields?.PublishedDate}
                          render={newsDateFormatter}
                        />
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>
                        <ContentSdkText field={article?.fields?.ReadTime} />
                      </span>
                    </div>
                  </div>
                  <h3 className="text-foreground mb-2 line-clamp-2 text-lg font-semibold">
                    <ContentSdkText field={article?.fields?.Title} />
                  </h3>
                  <div className="text-foreground-muted mb-4 line-clamp-3 text-sm">
                    <ContentSdkRichText field={article?.fields?.ShortDescription} />
                  </div>
                </div>
                {/* card cta section */}
                <div className="mt-auto flex items-center justify-between">
                  {
                    <Link href={article?.url}>
                      <button className="simple-btn">{t('read_more') || 'Read More'}</button>
                    </Link>
                  }
                  <div className="flex items-center space-x-1">
                    <button
                      type="button"
                      role="presentation"
                      aria-hidden="true"
                      tabIndex={-1}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 hover:bg-background-surface items-center justify-center rounded-md p-2 transition-all outline-none"
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      role="presentation"
                      aria-hidden="true"
                      tabIndex={-1}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 hover:bg-background-surface items-center justify-center rounded-md p-2 transition-all outline-none"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* cta section */}
        <div className="flex justify-center py-8">
          <button onClick={handleLoadMore} className="btn-outline w-auto!" disabled={!hasMore}>
            {hasMore
              ? t('load_more_destinations') || 'Load More Articles'
              : t('all_destinations_loaded') || 'All Articles Loaded'}
          </button>
        </div>
      </div>
    </section>
  );
};
