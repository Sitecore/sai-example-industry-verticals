import { isParamEnabled } from '@/helpers/isParamEnabled';
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
} from '@sitecore-content-sdk/nextjs';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import SocialShare from '../non-sitecore/SocialShare';

interface Fields {
  Title: Field<string>;
  ShortDescription: Field<string>;
  Content: RichTextField;
  Image: ImageField;
}

interface ArticleDetailsProps extends ComponentProps {
  fields: Fields;
}

export const Default = ({ params, fields, rendering }: ArticleDetailsProps) => {
  const { page } = useSitecore();
  const [currentUrl, setCurrentUrl] = useState('');
  const { styles, RenderingIdentifier: id, DynamicPlaceholderId } = params;
  const placeholderKey = `article-details-${DynamicPlaceholderId}`;
  const fullWidthPlaceholderKey = `article-details-full-width-${DynamicPlaceholderId}`;
  const isPageEditing = page.mode.isEditing;
  const hideShareWidget = isParamEnabled(params.HideShareWidget);

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

  return (
    <>
      <Head>
        <meta property="og:url" content={currentUrl} />
        <meta property="og:name" content={fields?.Title?.value} />
        <meta property="og:title" content={fields?.Title?.value} />
        <meta property="og:description" content={fields?.ShortDescription?.value} />
        <meta property="og:image" content={fields?.Image?.value?.src} />
        <meta property="og:type" content="article" />
      </Head>

      <article className={`component article-details ${styles}`} id={id}>
        <div className="container">
          <div className="grid grid-cols-12 gap-4 py-11">
            {/* Social Share */}
            {!hideShareWidget && (
              <SocialShare
                url={currentUrl}
                title={fields?.Title?.value || ''}
                description={fields?.ShortDescription?.value || ''}
                mediaUrl={fields?.Image?.value?.src || ''}
                className="col-span-12 size-fit p-3 shadow-xl md:p-4 lg:col-span-1 lg:flex-col"
              />
            )}

            <div className="col-span-12 aspect-video w-full overflow-hidden rounded-lg lg:col-span-10 lg:col-start-2">
              <ContentSdkImage field={fields.Image} className="h-full w-full object-cover" />
            </div>

            <div className="col-span-12 mt-8 lg:col-span-8 lg:col-start-3">
              <h2>
                <ContentSdkText field={fields.Title} />
              </h2>

              <p className="text-foreground-muted mt-5 text-lg font-medium tracking-wide">
                <ContentSdkText field={fields.ShortDescription} />
              </p>

              <div className="rich-text mt-10 text-lg">
                <ContentSdkRichText field={fields.Content} />
              </div>
            </div>

            <div className="col-span-12 mt-12 lg:col-span-10 lg:col-start-2">
              <Placeholder name={placeholderKey} rendering={rendering} />
            </div>
          </div>
        </div>
        <Placeholder name={fullWidthPlaceholderKey} rendering={rendering} />
      </article>
    </>
  );
};
