import React from 'react';
import { Image, Text } from '@sitecore-content-sdk/nextjs';
import StarRating from './StarRating';
import { Review } from '../product-reviews/ProductReviews';

interface ProductReviewProps extends Review {}

const ProductReview: React.FC<ProductReviewProps> = (props) => {
  const avatarField = props.avatar;
  const reviewerNameField = props.reviewerName;
  const captionField = props.caption;
  const descriptionField = props.description;
  const ratingValue = props.rating?.jsonValue?.value || 0;

  return (
    <div className="bg-background relative z-20 flex min-h-70 flex-col items-center justify-between rounded-2xl p-8 text-center shadow-xl">
      {/* Avatar */}
      <div className="bg-background absolute -top-10 flex h-[66px] w-[66px] items-center justify-center rounded-full">
        {avatarField && (
          <div>
            <Image field={avatarField} className="h-[50px] w-[50px] rounded-full" />
          </div>
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
