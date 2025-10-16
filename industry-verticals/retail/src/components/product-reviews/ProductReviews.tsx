import {
  ComponentParams,
  ComponentRendering,
  ImageField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import CarouselButton from '../non-sitecore/CarouselButton';
import ProductReview from '../non-sitecore/ProductReview';
import StarRating from '../non-sitecore/StarRating';
import { getFilteredReviewsById } from '@/helpers/reviewUtils';

interface Fields {
  data: {
    search: {
      results: Review[];
    };
  };
}

export interface Review {
  id: string;
  name: string;
  path: string;
  avatar: ImageField;
  reviewerName: { jsonValue: { value: string } };
  caption: { jsonValue: { value: string } };
  description: { jsonValue: { value: string } };
  product: {
    jsonValue: {
      id: string;
      displayName: string;
    };
  };
  rating: { jsonValue: { value: number } };
}

type ProductReviewsProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: ProductReviewsProps) => {
  const context = useSitecore();
  const id = props.params.RenderingIdentifier;
  const uid = props.rendering.uid;
  const styles = `${props.params.styles || ''}`.trim();
  const reviews = props.fields?.data?.search?.results || [];

  // Current product name
  const currentProductName = context?.page?.layout?.sitecore?.route?.itemId?.trim().toLowerCase();

  // Filter reviews according to the product name
  const filteredReviews = context?.page?.layout?.sitecore?.route?.itemId
    ? getFilteredReviewsById(reviews, currentProductName)
    : reviews;

  if (!filteredReviews || filteredReviews.length === 0) {
    return (
      <div className={`${styles}`} id={id}>
        <div className="container pt-10">
          <p className="pb-10 text-center">No reviews available for this product.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles}`} id={id}>
      <div className="relative pt-10">
        {/* Previous Button */}
        <CarouselButton
          direction="prev"
          name="Previous Review"
          aria-label="Previous Review"
          className={`swiper-btn-prev-${uid} absolute top-1/3 -left-5`}
        />

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={4}
          navigation={{
            prevEl: `.swiper-btn-prev-${uid}`,
            nextEl: `.swiper-btn-next-${uid}`,
            disabledClass: 'pointer-events-none opacity-50',
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="!overflow-visible !overflow-x-clip"
        >
          {filteredReviews.map((review, index) => (
            <SwiperSlide key={index} className="pb-10">
              <ProductReview key={review.id} review={review} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Next Button */}
        <CarouselButton
          direction="next"
          name="Next Review"
          aria-label="Next Review"
          className={`swiper-btn-next-${uid} absolute top-1/3 -right-5`}
        />
      </div>
    </div>
  );
};

export const ReviewStarRating = (props: ProductReviewsProps) => {
  const context = useSitecore();
  const reviews = props.fields?.data?.search?.results || [];

  const currentProductName = context?.page?.layout?.sitecore?.route?.itemId?.trim().toLowerCase();

  // Filter reviews according to the product name
  const filteredReviews = context?.page?.layout?.sitecore?.route?.itemId
    ? getFilteredReviewsById(reviews, currentProductName)
    : reviews;

  const reviewCount = filteredReviews.length;

  const averageRating =
    reviewCount > 0
      ? filteredReviews.reduce((sum, r) => sum + r.rating.jsonValue.value, 0) / reviewCount
      : 0;

  return (
    <div className="flex items-center space-x-3">
      <span className="text-foreground text-lg">{averageRating.toFixed(1)}</span>
      <StarRating rating={averageRating} className="!text-accent" />
      <div className="bg-foreground-muted h-7 w-px" />
      <span className="text-foreground-muted text-sm">
        {reviewCount} Customer Review{reviewCount !== 1 ? 's' : ''}
      </span>
    </div>
  );
};
