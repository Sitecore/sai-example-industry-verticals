import { newsDateFormatter } from '@/helpers/dateHelper';
import { ArticleFields } from '@/types/article';
import {
  NextImage as ContentSdkImage,
  DateField,
  useSitecore,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
} from '@sitecore-content-sdk/nextjs';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { useI18n } from 'next-localization';
import Link from 'next/link';

interface ArticlesProps {
  fields: ArticleFields;
  id: string;
  url: string;
}

const ArticleCard = ({ fields, id, url }: ArticlesProps) => {
  const { t } = useI18n();
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg shadow-md" key={id}>
      <div className="bg-background-accent relative h-72">
        <ContentSdkImage field={fields?.Image} className="h-full w-full object-cover" />
      </div>

      <div className="flex grow flex-col p-6 pt-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          {fields.Category.fields.Category?.value && (
            <span className="bg-background-muted text-foreground-muted rounded-md border px-2 py-1 text-xs font-semibold">
              <ContentSdkText field={fields.Category.fields.Category} />
            </span>
          )}
          <div className="flex items-center gap-2 text-sm">
            {(fields?.PublishedDate?.value || isPageEditing) && (
              <div className="flex items-center gap-1">
                <Calendar className="size-3" />
                <DateField
                  tag="p"
                  className="news-date"
                  field={fields?.PublishedDate}
                  render={newsDateFormatter}
                />
              </div>
            )}
          </div>
        </div>
        {(fields?.Title?.value || isPageEditing) && (
          <div className="mb-3 font-bold wrap-break-word hyphens-auto">
            <ContentSdkText field={fields?.Title} />
          </div>
        )}
        {(fields?.ShortDescription?.value || isPageEditing) && (
          <div className="mb-4 grow text-sm leading-relaxed wrap-break-word hyphens-auto">
            <ContentSdkRichText field={fields?.ShortDescription} />
          </div>
        )}
        <div className="mt-auto flex items-center justify-between border-t pt-4">
          {(fields?.PublishedDate?.value || isPageEditing) && (
            <div className="flex items-center gap-1 text-sm">
              <User className="size-3" />
              <ContentSdkText field={fields?.Author?.fields?.AuthorName} tag="p" />
            </div>
          )}
          <Link
            href={url}
            className="hover:text-accent flex items-center gap-2 text-sm font-medium transition-colors"
            aria-label="Read full article"
          >
            {t('read_more') || 'Read More'}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
