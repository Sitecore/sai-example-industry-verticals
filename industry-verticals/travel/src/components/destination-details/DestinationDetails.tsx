import { ComponentProps } from '@/lib/component-props';
import { NextImage as Image, Text, RichText, useSitecore } from '@sitecore-content-sdk/nextjs';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import SocialShare from '../non-sitecore/SocialShare';
import { DestinationFields } from '@/types/destination';
import { Heart, Star } from 'lucide-react';
import { DestinationHighlights } from '../non-sitecore/DestinationHighlights';
import { DestinationSidebar } from '../non-sitecore/DestinationSidebar';
import { ParentPathLink } from '../non-sitecore/ParentPathLink';
import { DestinationLinkedContent } from '../non-sitecore/DestinationLinkedContent';
import { useI18n } from 'next-localization';

interface DestinationDetailsProps extends ComponentProps {
  fields: DestinationFields;
}

export const Default = ({ params, fields }: DestinationDetailsProps) => {
  const { page } = useSitecore();
  const [currentUrl, setCurrentUrl] = useState('');
  const { styles, RenderingIdentifier: id } = params;
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
        [DESTINATION DETAILS]
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

      <article className={`component destination-details ${styles}`} id={id}>
        <div className="container">
          <ParentPathLink text={t('back_to_destinations') || 'Back to Destinations'} />
        </div>

        <div className="relative flex min-h-96 flex-col justify-between gap-8 px-4 py-8 sm:px-8 lg:min-h-130">
          <div className="relative z-1 flex justify-end gap-2">
            <button className="simple-btn">
              <Heart /> {t('save_label') || 'Save'}
            </button>
            <SocialShare
              url={currentUrl}
              title={fields?.Title?.value || ''}
              description={fields?.ShortDescription?.value || ''}
              mediaUrl={fields?.Image?.value?.src || ''}
            />
          </div>

          <div className="relative z-2">
            <div className="flex items-center gap-1">
              <Star className="inline size-4 fill-yellow-400 text-yellow-400" />
              <span className="text-background font-bold">
                <Text field={fields.Rating} />
              </span>
              <span className="text-background-muted/80 ml-2">
                <Text field={fields.NumberOfReviews} /> {t('reviews_label') || 'reviews'}
              </span>
            </div>
            <h1 className="text-background">
              <Text field={fields.Title} />
            </h1>
            <p className="text-background-muted/90 text-xl">
              <Text field={fields.Country} />
            </p>
          </div>

          <Image field={fields.Image} className="absolute inset-0 z-0 h-full w-full object-cover" />
        </div>

        <div className="container py-8 lg:py-12">
          <div className="grid gap-x-8 gap-y-12 lg:grid-cols-3">
            <div className="space-y-12 lg:col-span-2">
              <div>
                <h4 className="mb-4">
                  {t('about_label') || 'About'} {fields?.Title?.value}
                </h4>
                <div className="rich-text ck-content">
                  <RichText field={fields.Content} />
                </div>
              </div>
              <DestinationHighlights highlights={fields.Highlights} />
              <DestinationLinkedContent destination={fields} />
            </div>
            <DestinationSidebar destination={fields} />
          </div>
        </div>
      </article>
    </>
  );
};
