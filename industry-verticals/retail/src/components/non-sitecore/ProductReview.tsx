import React from 'react';
import { NextImage as ContentSdkImage, Text } from '@sitecore-content-sdk/nextjs';
import StarRating from './StarRating';
import { Review } from '../product-reviews/ProductReviews';
interface ReviewProps {
  review: Review;
}

const ProductReview = (props: ReviewProps) => {
  const avatarField = props.review.avatar;
  const reviewerNameField = props.review.reviewerName;
  const captionField = props.review.caption;
  const descriptionField = props.review.description;
  const ratingValue = props.review.rating?.jsonValue?.value || 0;

  return (
    <div className="bg-background relative z-20 flex min-h-70 flex-col items-center justify-between rounded-2xl p-8 text-center shadow-xl">
      {/* Avatar */}
      <div className="bg-background absolute -top-10 flex h-[66px] w-[66px] items-center justify-center rounded-full">
        {avatarField && (
          <ContentSdkImage
            width={50}
            height={50}
            field={avatarField}
            className="h-[50px] w-[50px] rounded-full"
          />
        )}
        <div className="wavy-bottom-left bg-background absolute top-5 -left-7 h-[30px] w-[30px]"></div>
        <div className="wavy-bottom-right bg-background absolute top-5 -right-7 h-[30px] w-[30px]"></div>
      </div>

      {/* Reviewer name and caption */}
      <div>
        <div className="text-center text-xl leading-normal font-bold capitalize">
          <Text field={reviewerNameField.jsonValue} />
        </div>
        <div className="text-background-muted-light text-center text-sm leading-normal font-normal">
          <Text field={captionField.jsonValue} />
        </div>
      </div>

      {/* Description */}
      <div className="text-center text-sm leading-5 font-normal">
        <Text field={descriptionField.jsonValue} />
      </div>

      {/* Rating */}
      <StarRating rating={ratingValue} />
    </div>
  );
};

export default ProductReview;
