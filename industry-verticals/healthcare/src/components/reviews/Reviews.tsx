import { ComponentProps } from '@/lib/component-props';
import { Text, NextImage as ContentSdkImage } from '@sitecore-content-sdk/nextjs';
import BlobAccent from '@/assets/shapes/BlobAccent';
import { ReviewFields } from '@/types/review';
import { CommonStyles } from '@/types/styleFlags';

export interface ReviewsProps extends ComponentProps {
  fields: {
    Reviews: ReviewFields[];
  };
}

export const Default = (props: ReviewsProps) => {
  const id = props.params.RenderingIdentifier;
  const reviews = props.fields?.Reviews || [];
  const isBlobAccent = !props?.params?.styles?.includes(CommonStyles.HideBlobAccent);
  const styles = `${props.params.styles || ''}`.trim();

  return (
    <section className={`relative py-16 ${styles}`} id={id || undefined}>
      {isBlobAccent && (
        <>
          <BlobAccent size="lg" className="absolute top-0 left-0 z-0 lg:left-4" />
          <BlobAccent shape="circle" className="absolute right-0 bottom-0 z-0 lg:right-4" />
        </>
      )}
      <div className="relative z-10 container">
        <div className="mt-16 grid gap-12 lg:grid-cols-3">
          {reviews?.map((review: ReviewFields) => (
            <div key={review.id} className="flex flex-col items-center">
              <div className="placeholder-pattern-background relative z-11 mx-4 aspect-square max-w-sm overflow-hidden rounded-lg lg:mx-10">
                <ContentSdkImage
                  className="relative z-10 h-full w-full object-cover"
                  field={review?.fields?.Avatar}
                />
              </div>
              <div className="bg-background-secondary dark:bg-background-secondary-dark shadow-soft relative z-1 -mt-10 flex grow flex-col gap-6 rounded-lg p-10 pt-20">
                <blockquote className="text-lg">
                  <Text field={review?.fields?.Description} />
                </blockquote>
                <p className="mt-auto flex items-center gap-2">
                  <span className="bg-accent h-0.5 w-7 rounded-full"></span>
                  <span className="font-heading text-sm font-bold">
                    <Text field={review?.fields?.ReviewerName} />
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
