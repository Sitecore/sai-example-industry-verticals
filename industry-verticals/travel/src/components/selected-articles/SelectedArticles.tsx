import { ComponentProps } from '@/lib/component-props';
import {
  Field,
  LinkField,
  Link as ContentSdkLink,
  RichTextField,
  RichText as ContentSdkRichText,
  Image as ContentSdkImage,
  Text as ContentSdkText,
  DateField,
} from '@sitecore-content-sdk/nextjs';
import { Article } from '@/types/article';
import { newsDateFormatter } from '@/helpers/dateHelper';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from 'next-localization';

interface Fields {
  Title: Field<string>;
  Description: RichTextField;
  ExploreLink: LinkField;
  Articles: Array<Article>;
}

export type CarouselProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: CarouselProps) => {
  const { t } = useI18n();
  const id = props.params.RenderingIdentifier;
  const styles = props.params.styles || [];
  const articles = props.fields?.Articles || [];

  return (
    <section className={`py-16 ${styles}`} id={id}>
      <div className="container px-4">
        {/* title section */}
        <div className="container in-[.column-splitter]:px-0">
          <div className="mb-12 text-center">
            <h2 className="mb-4">
              <ContentSdkText field={props.fields.Title} />
            </h2>
            <p className="text-foreground-light text-xl">
              <ContentSdkRichText field={props.fields.Description} />
            </p>
          </div>
        </div>

        {/* article list section */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {articles.map((article, index) => {
            return (
              <div className="info-card flex h-full flex-col overflow-hidden p-0!" key={index}>
                <div className="relative shrink-0">
                  <p className="bg-accent text-background absolute top-4 left-4 z-10 max-w-max rounded px-2 py-1 text-xs">
                    <ContentSdkText field={article.fields.Category.fields.Category} />
                  </p>
                  <ContentSdkImage
                    field={article.fields.Image}
                    className="h-48 w-full object-cover"
                  />
                </div>

                <div className="flex min-h-0 flex-1 flex-col gap-4 p-6">
                  <div className="flex flex-col gap-4">
                    <h6 className="font-bold" role="heading" aria-level={3}>
                      <ContentSdkText field={article.fields.Title} />
                    </h6>
                    <p className="text-foreground-muted line-clamp-2">
                      <ContentSdkRichText field={article.fields.ShortDescription} />
                    </p>
                  </div>

                  <div className="mt-auto flex flex-col gap-4">
                    <div className="flex items-center justify-end">
                      <DateField
                        tag="p"
                        className="news-date text-foreground-muted text-xs"
                        field={article.fields.PublishedDate}
                        render={newsDateFormatter}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-foreground-muted text-xs">
                        <ContentSdkText field={article.fields.ReadTime} />
                      </p>
                      <p className="text-accent font-semibold">
                        <Link
                          href={article.url}
                          className="text-accent inline-flex items-center text-sm font-medium transition-colors"
                        >
                          {t('read_more') || 'Read More'}
                          <ArrowRight className="h-4 w-5" />
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* cta section */}
        <div className="container mt-12 flex items-center justify-center">
          <ContentSdkLink
            field={props.fields.ExploreLink}
            className="btn-outline text-foreground max-w-max"
            aria-label={`link to ${props.fields.ExploreLink?.value?.text || 'explore more'}`}
          />
        </div>
      </div>
    </section>
  );
};
