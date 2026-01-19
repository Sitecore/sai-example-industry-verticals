import { ComponentProps } from '@/lib/component-props';
import {
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  Placeholder,
  useSitecore,
  DateField,
} from '@sitecore-content-sdk/nextjs';
import { Bookmark, Calendar, User } from 'lucide-react';
import { ParentPathLink } from '../non-sitecore/ParentPathLink';
import { useI18n } from 'next-localization';
import { useEffect, useState } from 'react';
import SocialShare from '../non-sitecore/SocialShare';
import { newsDateFormatter } from '@/helpers/dateHelper';
import { ArticleFields } from '@/types/article';

interface ArticleDetailsProps extends ComponentProps {
  fields: ArticleFields;
}

export const Default = ({ params, fields, rendering }: ArticleDetailsProps) => {
  const { page } = useSitecore();
  const [currentUrl, setCurrentUrl] = useState('');
  const { styles, RenderingIdentifier: id, DynamicPlaceholderId } = params;
  const fullWidthPlaceholderKey = `article-details-full-width-${DynamicPlaceholderId}`;
  const isPageEditing = page.mode.isEditing;
  const { t } = useI18n();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  if (!fields) {
    return isPageEditing ? (
      <div className={`component article-details ${styles}`} id={id}>
        [ARTICLE DETAILS]
      </div>
    ) : (
      <></>
    );
  }

  console.log('Article Details Fields:', fields);

  return (
    <div className={`w-full space-y-6 py-6 ${styles}`} id={id}>
      <div className="container">
        <ParentPathLink text={t('back_to_articles') || 'Back to Articles'} />
      </div>

      <article className="container">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <ContentSdkText
              field={fields.Category?.fields?.Category}
              tag="span"
              className="border-accent text-accent-dark bg-background-accent rounded-md border px-2 py-0.5 font-medium"
            />

            {(fields?.PublishedDate?.value || isPageEditing) && (
              <div className="flex items-center gap-1">
                <User className="size-4" />
                <ContentSdkText field={fields?.Author?.fields?.AuthorName} tag="p" />
              </div>
            )}
            {(fields?.PublishedDate?.value || isPageEditing) && (
              <div className="flex items-center gap-1">
                <Calendar className="size-4" />
                <DateField
                  tag="p"
                  className="news-date"
                  field={fields?.PublishedDate}
                  render={newsDateFormatter}
                />
              </div>
            )}
          </div>

          <h1>
            <ContentSdkText field={fields?.Title} />
          </h1>

          <div className="flex gap-4">
            <SocialShare
              url={currentUrl}
              title={fields?.Title?.value || ''}
              description={fields?.ShortDescription?.value || ''}
              mediaUrl={fields?.Image?.value?.src || ''}
            />
            <button className="simple-btn">
              <Bookmark />
              {t('save_label') || 'Save'}
            </button>
          </div>

          <ContentSdkImage field={fields?.Image} className="h-auto w-full rounded-lg" />

          <div>
            <ContentSdkRichText field={fields?.Content} />
          </div>
        </div>
      </article>

      <Placeholder rendering={rendering} name={fullWidthPlaceholderKey} />

      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="bg-background w-full space-y-4 rounded-lg border p-6 shadow-md">
            <h6>{t('tags_label') || 'Tags'}</h6>
            <div className="flex flex-wrap gap-4">
              {fields.Tags.map((tag) => (
                <span key={tag.id} className="bg-background-muted rounded-sm px-2 py-0.5 text-sm">
                  <ContentSdkText field={tag.fields.Tag} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
