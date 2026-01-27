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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((article, index) => {
            return (
              <div
                key={index}
                className="bg-background flex flex-col overflow-hidden rounded-lg border shadow-lg"
              >
                <ContentSdkImage
                  field={article.fields.Image}
                  className="h-36 w-full shrink-0 object-cover"
                />
                <div className="flex grow flex-col justify-between p-6">
                  <h6 className="mb-4 text-lg">
                    <ContentSdkText field={article.fields.Title} />
                  </h6>
                  <Link
                    href={article.url}
                    className="text-accent-dark inline-flex items-center gap-1 self-start text-sm font-bold transition-colors hover:underline"
                  >
                    {t('read_more') || 'Read More'}
                    <ArrowRight className="h-4 w-5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
