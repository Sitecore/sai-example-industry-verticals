'use client';

import { useState, useMemo } from 'react';
import {
  Field,
  ImageField,
  RichText as ContentSdkRichText,
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  DateField,
  TextField,
  LinkField,
  RichTextField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import Link from 'next/link';
import { useI18n } from 'next-localization';
import { Author, Category, Tag } from '@/types/article';
import { newsDateFormatter } from '@/helpers/dateHelper';
import { Calendar, Clock, Heart, Share2, User } from 'lucide-react';

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
  ReadMoreLink: LinkField;
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

const CATEGORIES = [
  'All',
  'Destinations',
  'Travel Tips',
  'Food & Culture',
  'Sustainable Travel',
  'Family Travel',
  'Nightlife',
  'Culture',
];

export const Default = (props: ArticleListingProps) => {
  const { t } = useI18n();
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;
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

  console.log(props);

  return (
    <section className={`bg-background-muted py-8 ${sxaStyles}`} id={id}>
      <div className="container mx-auto px-4">
        {/* Category Filter */}
        <div className="mx-auto mb-16 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((category) => (
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

        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-bold text-foreground">
            {t('title') || 'Latest Articles'}
          </h2>
          <p className="text-foreground-muted">{t('description') || 'Fresh travel inspiration and tips'}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article, index) => (
            <div className="info-card flex h-full flex-col p-0! overflow-hidden" key={index}>
              {/* upper section */}
              <div className="relative">
                <ContentSdkImage
                  field={article.fields.Image}
                  width={400}
                  height={300}
                  className="h-48 w-full object-cover"
                />
                <p className="bg-accent absolute top-4 left-4 z-10 max-w-max rounded px-2 py-1 text-xs text-white">
                  <ContentSdkText field={article.fields.Category.fields.Category} />
                </p>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-6">
                {/* content section */}
                <div className="">
                  <div className="mb-3 flex items-center space-x-4 text-sm text-accent-gray">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>
                        <ContentSdkText field={article.fields.Author.fields.AuthorName} />
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>
                        <DateField
                          field={article.fields.PublishedDate}
                          render={newsDateFormatter}
                        />
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>
                        <ContentSdkText field={article.fields.ReadTime} />
                      </span>
                    </div>
                  </div>
                  <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-foreground">
                    <ContentSdkText field={article.fields.Title} />
                  </h3>
                  <div className="mb-4 line-clamp-3 text-sm text-foreground-muted">
                    <ContentSdkRichText field={article.fields.ShortDescription} />
                  </div>
                </div>
                {/* card cta section */}
                <div className="mt-auto flex items-center justify-between">
                  {
                    <Link href={article.url}>
                      <button className="simple-btn">
                        {t('read_more') || 'Read More'}
                      </button>
                    </Link>
                  }
                  <div className="flex items-center space-x-1">
                    <button
                      type="button"
                      role="presentation"
                      aria-hidden="true"
                      tabIndex={-1}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 items-center justify-center rounded-md p-2 transition-all outline-none hover:bg-background-surface"
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      role="presentation"
                      aria-hidden="true"
                      tabIndex={-1}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 items-center justify-center rounded-md p-2 transition-all outline-none hover:bg-background-surface"
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
        <div className="mt-12 flex items-center justify-center text-center">
          <button className="btn-outline text-foreground max-w-max">
            {t('cta') || 'Load More Articles'}
          </button>
        </div>
      </div>
    </section>
  );
};
