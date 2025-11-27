import React from 'react';
import { Text } from '@sitecore-content-sdk/nextjs';
import { ReviewFields } from '@/types/review';
import StarRating from './StarRating';
import { useI18n } from 'next-localization';

type ProductReviewsProps = {
  reviews: ReviewFields[];
};

export const ProductReviews = (props: ProductReviewsProps) => {
  const { t } = useI18n();

  if (!props.reviews || props.reviews.length === 0) {
    return (
      <div className="w-full">
        <div className="container pt-10">
          <p className="pb-10 text-center">
            {t('no_reviews_label') || 'No reviews available for this product.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2 space-y-6">
      {props.reviews.map((review) => (
        <div className="grid grid-cols-2 gap-2" key={review.id}>
          <div>
            <h6 className="text-sm">
              <Text field={review.fields.ReviewerName} />
            </h6>
          </div>
          <StarRating
            rating={review.fields.Rating.value}
            starSize={14}
            className="justify-self-end"
          />
          <p className="col-span-2 text-sm">
            <Text field={review.fields.Description} />
          </p>
        </div>
      ))}
    </div>
  );
};
