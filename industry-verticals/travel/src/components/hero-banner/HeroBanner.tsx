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

const HeroBannerCommon = ({
  params,
  fields,
  children,
}: HeroBannerProps & {
  children: React.ReactNode;
}) => {
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
      </div>

      {children}
    </div>
  );
};

// Centered variant - Centered content with gradient overlay and search bar
export const Centered = ({ params, fields, rendering }: HeroBannerProps) => {
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;

  return (
    <HeroBannerCommon params={params} fields={fields} rendering={rendering}>
      {/* Content Container */}
      <div className="relative z-10 w-full">
        {/* Gradient Background */}
        <div className="from-accent-dark to-accent absolute inset-0 z-0 bg-gradient-to-r"></div>

        {/* Content Container */}
        <div className="relative z-10 w-full">
          <div className="container mx-auto flex flex-col items-center justify-center px-4 py-16">
            {/* Title */}
            <h1 className="text-background text-center text-4xl font-bold md:text-5xl">
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
    </HeroBannerCommon>
  );
};

// CenteredLarge variant - Centered content with large form area
export const CenteredLarge = ({ params, fields, rendering }: HeroBannerProps) => {
  const flightSearchPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;

  return (
    <HeroBannerCommon params={params} fields={fields} rendering={rendering}>
      {/* Content Container */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto flex flex-col items-center justify-center px-4 py-16">
          {/* Title */}
          <h1 className="text-background text-center text-4xl font-bold md:text-5xl">
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
    </HeroBannerCommon>
  );
};

// Default variant - uses Centered as default
export const Default = Centered;
