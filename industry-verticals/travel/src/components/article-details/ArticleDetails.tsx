import { ComponentProps } from '@/lib/component-props';
import {
  Field,
  ImageField,
  RichTextField,
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  Placeholder,
  useSitecore,
  TextField,
  DateField,
} from '@sitecore-content-sdk/nextjs';
import { Calendar, Clock, Heart, Share2 } from 'lucide-react';
import { newsDateFormatter } from '../../helpers/dateHelper';
import { Author } from '../non-sitecore/Author';
import { ParentPathLink } from '../non-sitecore/ParentPathLink';
import { useI18n } from 'next-localization';
import SocialShare from '../non-sitecore/SocialShare';
import { useEffect, useState } from 'react';

interface AuthorFields {
  fields: {
    AuthorName: TextField;
    About: Field<string>;
    Avatar: ImageField;
  };
}

interface CategoryFields {
  fields: {
    Category: TextField;
  };
}

interface Fields {
  Title: Field<string>;
  ShortDescription: Field<string>;
  Content: RichTextField;
  Image: ImageField;
  PublishedDate: Field<string>;
  Author: AuthorFields;
  ReadTime: TextField;
  Likes: TextField;
  Shares: TextField;
  Category: CategoryFields;
}

interface ArticleDetailsProps extends ComponentProps {
  fields: Fields;
}

export const Default = ({ params, fields, rendering }: ArticleDetailsProps) => {
  const { page } = useSitecore();
  const [currentUrl, setCurrentUrl] = useState('');
  const { styles, RenderingIdentifier: id, DynamicPlaceholderId } = params;
  const placeholderAuthorKey = `article-details-author-${DynamicPlaceholderId}`;
  const fullWidthPlaceholderKey = `article-details-full-width-${DynamicPlaceholderId}`;
  const isPageEditing = page.mode.isEditing;
  const { t } = useI18n();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  if (!fields?.Title) {
    return isPageEditing ? (
      <div className={`component article-details ${styles}`} id={id}>
        [ARTICLE DETAILS]
      </div>
    ) : (
      <></>
    );
  }

  return (
    <>
      {/* Back Section */}
      <div
        className={`component article-details container mx-auto flex items-center py-4 ${styles}`}
        id={id}
      >
        <ParentPathLink text={t('back_to_blog') || 'Back to Blog'} />
      </div>

      {/* Article Header */}
      <article className="container">
        <div className="mx-auto max-w-4xl">
          {/* Article Meta */}
          <div className="mb-6">
            {/* Title Section */}
            <div>
              <p className="bg-foreground mb-4 inline-block min-w-fit rounded-md px-2 py-1 text-xs text-white">
                <ContentSdkText field={fields.Category?.fields?.Category} />
              </p>
              <h1 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
                <ContentSdkText field={fields?.Title} />
              </h1>
            </div>

            {/* Meta data Section */}
            <div className="text-foreground-muted mb-6 flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <ContentSdkImage
                  field={fields?.Author?.fields?.Avatar}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <span className="font-medium">
                  <ContentSdkText field={fields?.Author?.fields?.AuthorName} />
                </span>
              </div>
              {(fields?.PublishedDate?.value || isPageEditing) && (
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <DateField
                    tag="p"
                    className="news-date"
                    field={fields?.PublishedDate}
                    render={newsDateFormatter}
                  />
                </div>
              )}
              {(fields?.ReadTime?.value || isPageEditing) && (
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>
                    <ContentSdkText field={fields?.ReadTime} />
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-6 border-y py-4 md:flex md:flex-row md:items-center md:justify-between">
              {/* Social reactions */}
              <div className="flex items-center space-x-4">
                <button className="simple-btn">
                  <Heart className="mr-2 h-4 w-4" />
                  <ContentSdkText field={fields?.Likes} /> Likes
                </button>
                <button className="simple-btn">
                  <Share2 className="mr-2 h-4 w-4" />
                  <ContentSdkText field={fields?.Shares} /> Shares
                </button>
              </div>

              {/* Social Actions */}
              <SocialShare
                useCustomIcons
                url={currentUrl}
                title={fields?.Title?.value || ''}
                description={fields?.ShortDescription?.value || ''}
                mediaUrl={fields?.Image?.value?.src || ''}
              />
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <ContentSdkImage
              field={fields?.Image}
              className="h-64 w-full rounded-lg object-cover md:h-96"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg mb-12 max-w-none">
            <div className="space-y-6 leading-relaxed text-gray-700">
              <ContentSdkRichText field={fields?.Content} />
            </div>
          </div>
        </div>
      </article>

      <div className="container">
        <div className="mx-auto max-w-232">
          <Placeholder rendering={rendering} name={fullWidthPlaceholderKey} />
        </div>
      </div>

      <div className="container py-8">
        <div className="mx-auto max-w-4xl">
          <Author
            params={params}
            placeholderKey={placeholderAuthorKey}
            rendering={rendering}
            fields={fields?.Author?.fields}
          />
        </div>
      </div>
    </>
  );
};
