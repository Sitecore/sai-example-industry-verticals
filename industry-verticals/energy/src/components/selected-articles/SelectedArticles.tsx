import { ComponentProps } from '@/lib/component-props';
import {
  Field,
  RichTextField,
  RichText as ContentSdkRichText,
  Image as ContentSdkImage,
  Text as ContentSdkText,
} from '@sitecore-content-sdk/nextjs';
import { Article } from '@/types/article';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from 'next-localization';

interface Fields {
  Title: Field<string>;
  Description: RichTextField;
  Articles: Array<Article>;
}

export type SelectedArticlesProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: SelectedArticlesProps) => {
  const { t } = useI18n();
  const id = props.params.RenderingIdentifier;
  const styles = props.params.styles || [];
  const articles = props.fields?.Articles || [];

  return (
    <section className={`py-16 ${styles}`} id={id}>
      <div className="container">
        {/* header */}
        <div className="in-[.column-splitter]:px-0">
          <div className="mb-12 text-center">
            <h2 className="mb-4">
              <ContentSdkText field={props.fields.Title} />
            </h2>
            <div className="text-foreground-light text-xl">
              <ContentSdkRichText field={props.fields.Description} />
            </div>
          </div>
        </div>

        {/* article list section */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((article, index) => {
            return (
              <div
                key={index}
                className="bg-background overflow-hidden rounded-lg border shadow-lg"
              >
                <ContentSdkImage
                  field={article.fields.Image}
                  alt="thumbnail"
                  className="h-48 w-full object-cover"
                />
                <div className="flex min-h-40 flex-col justify-between p-6">
                  <h6 className="line-clamp-2">
                    <ContentSdkText
                      field={article.fields.Title}
                      className="text-foreground mb-4 text-lg font-semibold"
                    />
                  </h6>
                  <p className="flex items-center font-bold hover:underline">
                    <Link
                      href={article.url}
                      className="text-accent-dark inline-flex items-center gap-1 text-sm font-bold transition-colors"
                    >
                      {t('read_more') || 'Read More'}
                      <ArrowRight className="h-4 w-5" />
                    </Link>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
