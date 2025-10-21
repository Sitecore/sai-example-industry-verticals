import {
  Field,
  ImageField,
  Text,
  TextField,
  NextImage as ContentSdkImage,
} from '@sitecore-content-sdk/nextjs';
import React from 'react';
import StarRating from './StarRating';
import { SitecoreItem } from '@/types/common';
import { User } from 'lucide-react';

type ReviewCardProps = SitecoreItem<{
  Avatar: ImageField;
  ReviewerName: TextField;
  Caption: TextField;
  Description: TextField;
  ReviewImage: ImageField;
  Rating: Field<number>;
}> & { isPageEditing?: boolean };

const ReviewCard = (props: ReviewCardProps) => {
  return (
    <>
      <div className="aspect-square min-h-96 w-full rounded-2xl">
        <ContentSdkImage className="image-cover rounded-2xl" field={props.fields.ReviewImage} />
      </div>
      <div className="px-5">
        <div className="bg-background relative -top-15 flex min-h-70 flex-col items-center justify-between rounded-2xl p-8 text-center shadow-xl">
          {/* Image */}
          <div className="bg-background absolute -top-10 flex h-[66px] w-[66px] items-center justify-center rounded-full">
            {props.fields.Avatar.value?.src || props.isPageEditing ? (
              <ContentSdkImage
                width={50}
                height={50}
                field={props.fields.Avatar}
                className="h-[50px] w-[50px] rounded-full"
              />
            ) : (
              <div className="!text-foreground bg-background-muted flex h-[50px] w-[50px] items-center justify-center rounded-full">
                <User className="size-8" />
              </div>
            )}
            <div className="wavy-bottom-left bg-background absolute top-5 -left-7 h-[30px] w-[30px]"></div>
            <div className="wavy-bottom-right bg-background absolute top-5 -right-7 h-[30px] w-[30px]"></div>
          </div>
          <div className="!text-background-muted-light">
            <div className="text-center text-xl leading-normal font-bold capitalize">
              <Text field={props.fields.ReviewerName} />
            </div>
            <div className="text-center text-sm leading-normal font-normal">
              <Text field={props.fields.Caption} />
            </div>
          </div>
          <div className="!text-background-muted-light text-center text-sm leading-5 font-normal">
            <Text field={props.fields.Description} />
          </div>
          <StarRating rating={props.fields.Rating.value} />
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
