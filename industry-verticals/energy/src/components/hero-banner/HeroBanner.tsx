import {
  Field,
  ImageField,
  LinkField,
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  useSitecore,
  Link,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

interface Fields {
  Image: ImageField;
  Video: ImageField;
  Title: Field<string>;
  Description: Field<string>;
  CtaLink: LinkField;
  SecondaryCtaLink: LinkField;
}

interface HeroBannerProps extends ComponentProps {
  fields: Fields;
}

export const Default = ({ params, fields }: HeroBannerProps) => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;
  const isPageEditing = page.mode.isEditing;

  if (!fields) {
    return isPageEditing ? (
      <div className={`component hero-banner ${styles}`} id={id}>
        [HERO BANNER]
      </div>
    ) : (
      <></>
    );
  }

  return (
    <div className={`component hero-banner ${styles} relative flex items-center`} id={id}>
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {!isPageEditing && fields?.Video?.value?.src ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={fields.Image?.value?.src}
          >
            <source src={fields.Video?.value?.src} type="video/webm" />
          </video>
        ) : (
          <ContentSdkImage field={fields.Image} className="h-full w-full object-cover" priority />
        )}
        {/* Gradient Overlay using primary color */}
        <div className="to-accent/20 absolute inset-0 bg-linear-to-b from-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto flex flex-col items-center justify-center px-4 py-24">
          {/* Title - styled in accent/primary color */}
          <h1 className="text-accent text-center">
            <ContentSdkText field={fields.Title} />
          </h1>

          {/* Description/Tagline - white text */}
          <div className="**:text-background mt-4 max-w-7/12 text-xl **:text-center">
            <ContentSdkRichText field={fields.Description} />
          </div>

          {/* CTA Buttons */}
          {(fields?.CtaLink || fields?.SecondaryCtaLink) && (
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              {fields?.CtaLink && <Link field={fields.CtaLink} className="main-btn" />}
              {fields?.SecondaryCtaLink && (
                <Link field={fields.SecondaryCtaLink} className="secondary-btn" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
