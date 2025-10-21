import React from 'react';
import { NextImage as ContentSdkImage, Text } from '@sitecore-content-sdk/nextjs';
import StarRating from './StarRating';
import { ReviewFields } from '@/types/review';
import { User } from 'lucide-react';

interface ReviewProps {
  review: ReviewFields;
  isPageEditing: boolean;
}

const ProductReview = (props: ReviewProps) => {
  const { Avatar, Caption, Description, Rating, ReviewerName } = props.review.fields;

  return (
    <div className="bg-background relative z-20 flex min-h-70 flex-col items-center justify-between rounded-2xl p-8 text-center shadow-xl">
      {/* Avatar */}
      <div className="bg-background absolute -top-10 flex h-[66px] w-[66px] items-center justify-center rounded-full">
        {Avatar.value?.src || props.isPageEditing ? (
          <ContentSdkImage
            width={50}
            height={50}
            field={Avatar}
            className="h-[50px] w-[50px] rounded-full"
          />
        ) : (
          <div className="bg-background-muted flex h-[50px] w-[50px] items-center justify-center rounded-full">
            <User className="size-8" />
          </div>
        )}
        <div className="wavy-bottom-left bg-background absolute top-5 -left-7 h-[30px] w-[30px]"></div>
        <div className="wavy-bottom-right bg-background absolute top-5 -right-7 h-[30px] w-[30px]"></div>
      </div>

      {/* Reviewer name and caption */}
      <div>
        <div className="text-center text-xl leading-normal font-bold capitalize">
          <Text field={ReviewerName} />
        </div>
        <div className="text-background-muted-light text-center text-sm leading-normal font-normal">
          <Text field={Caption} />
        </div>
      </div>

      {/* Description */}
      <div className="text-center text-sm leading-5 font-normal">
        <Text field={Description} />
      </div>

      {/* Rating */}
      <StarRating rating={Rating.value} />
    </div>
  );
};

export default ProductReview;
