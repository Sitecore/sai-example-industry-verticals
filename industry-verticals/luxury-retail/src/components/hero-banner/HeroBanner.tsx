import {
  Field,
  ImageField,
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  useSitecore,
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
}: HeroBannerProps & { children: React.ReactNode }) => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;
  const isPageEditing = page.mode.isEditing;
  const hideGradientOverlay = styles?.includes('hide-gradient-overlay');

  if (!fields) {
    return isPageEditing ? (
      <div className={`component hero-banner min-h-screen ${styles}`} id={id}>
        [HERO BANNER]
      </div>
    ) : (
      <></>
    );
  }

  return (
    <div
      className={`component hero-banner ${styles} relative flex min-h-screen items-center`}
      id={id}
    >
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
          <ContentSdkImage
            field={fields.Image}
            className="h-full w-full object-cover md:object-bottom"
            priority
          />
        )}
        {/* Gradient overlay */}
        {!hideGradientOverlay && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-85% to-white"></div>
        )}
      </div>

      {children}
    </div>
  );
};

/* ------------------- Default (bottom-left) ------------------- */
export const Default = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const reverseLayout = styles.includes('reversed');

  return (
    <HeroBannerCommon params={params} fields={fields} rendering={rendering}>
      <div className="relative flex h-full w-full items-end">
        <div className="container mx-auto flex h-full items-end px-4 py-6">
          <div
            className={`flex w-full ${
              reverseLayout ? 'justify-end text-right' : 'justify-start text-left'
            }`}
          >
            <div>
              <h1
                className={`font-heading text-background-muted text-4xl tracking-tight capitalize lg:text-7xl ${
                  reverseLayout ? 'text-right' : 'text-left'
                }`}
              >
                <ContentSdkText field={fields.Title} />
              </h1>

              <div
                className={`text-background-muted text-md lg:text-xl ${
                  reverseLayout ? 'text-right' : 'text-left'
                }`}
              >
                <ContentSdkRichText field={fields.Description} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};

/* ------------------- TopContent (top-right) ------------------- */
export const TopContent = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const reverseLayout = styles.includes('reversed');

  return (
    <HeroBannerCommon params={params} fields={fields} rendering={rendering}>
      <div className="relative flex h-full w-full items-start">
        <div className="container mx-auto flex h-full items-start">
          <div
            className={`flex w-full ${
              reverseLayout ? 'justify-start text-left' : 'justify-end text-right'
            }`}
          >
            <div className="">
              <h1
                className={`font-heading text-background-muted text-4xl tracking-tight capitalize lg:text-7xl ${
                  reverseLayout ? 'text-left' : 'text-right'
                }`}
              >
                <ContentSdkText field={fields.Title} />
              </h1>

              <div
                className={`text-background-muted text-md lg:text-xl ${
                  reverseLayout ? 'text-left' : 'text-right'
                }`}
              >
                <ContentSdkRichText field={fields.Description} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};
