import {
  Field,
  ImageField,
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  useSitecore,
  Placeholder,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

interface Fields {
  Image: ImageField;
  Video: ImageField;
  Title: Field<string>;
  Description: Field<string>;
}

interface HeroBannerProps extends ComponentProps {
  fields: Fields;
}

// Centered variant - Centered content with gradient overlay and search bar
export const Default = ({ params, fields, rendering }: HeroBannerProps) => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;
  const isPageEditing = page.mode.isEditing;
  const showGradientBackground = styles?.includes('show-gradient-background');
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;

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
      {/* Gradient Overlay */}
      {showGradientBackground && (
        <div className="from-accent-dark to-accent absolute inset-0 z-0 bg-gradient-to-r"></div>
      )}

      {/* Content Container */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto flex flex-col items-center justify-center px-4 py-16">
          {/* Title */}
          <h1 className="text-background text-center">
            <ContentSdkText field={fields.Title} />
          </h1>

          {/* Description/Tagline */}
          <div className="text-background/80 mt-4 text-center text-xl">
            <ContentSdkRichText field={fields.Description} className="text-center" />
          </div>

          {/* Search Bar Placeholder */}
          <div className="mt-8 w-full max-w-5xl px-4">
            <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
          </div>
        </div>
      </div>
    </div>
  );
};

// CenteredLarge variant - Centered content with large form area
export const CenteredLarge = ({ params, fields, rendering }: HeroBannerProps) => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;
  const isPageEditing = page.mode.isEditing;
  const flightSearchPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;

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
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto flex flex-col items-center justify-center px-4 py-16">
          {/* Title */}
          <h1 className="text-background text-center">
            <ContentSdkText field={fields.Title} />
          </h1>

          {/* Description/Tagline */}
          <div className="text-background/80 mt-4 text-center text-xl">
            <ContentSdkRichText field={fields.Description} className="text-center" />
          </div>

          {/* Flight Search Form Placeholder */}
          <div className="mt-8 w-full max-w-5xl px-4">
            <Placeholder name={flightSearchPlaceholderKey} rendering={rendering} />
          </div>
        </div>
      </div>
    </div>
  );
};
