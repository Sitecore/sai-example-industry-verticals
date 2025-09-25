import { ComponentProps } from '@/lib/component-props';
import {
  ComponentParams,
  ComponentRendering,
  Field,
  ImageField,
  Text,
  TextField,
} from '@sitecore-content-sdk/nextjs';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import AccentLine from '@/assets/icons/accent-line/AccentLine';
import ArrowIcon from '../non-sitecore/ArrowIcon';
import ReviewCard from '../non-sitecore/ReviewCard';

interface ProductFields {
  id: string;
  displayName: string;
  name: string;
  url: string;
  fields: {
    Image1?: ImageField;
  };
}

interface ReviewFields {
  id: string;
  displayName: string;
  name: string;
  url: string;
  fields: {
    Avatar: ImageField;
    ReviewerName: TextField;
    Caption: TextField;
    Description: TextField;
    Product: ProductFields;
    Rating: Field<number>;
  };
}

interface ReviewsProps extends ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: {
    Title: TextField;
    Eyebrow: TextField;
    Reviews: ReviewFields[];
  };
}

export const Default = (props: ReviewsProps) => {
  console.log(props);

  const id = props.params.RenderingIdentifier;
  const uid = props.rendering.uid;
  const reviews = props.fields?.Reviews || [];
  const sectionTitle = props.fields?.Title || '';
  const sectionEyebrow = props.fields?.Eyebrow || '';
  const styles = `${props.params.styles || ''}`.trim();

  return (
    <div className={`${styles}`} id={id}>
      <div className="container py-20">
        {/* Heading Section */}
        <div className="text-center">
          <p className="eyebrow pb-4">
            <Text field={sectionEyebrow} />
          </p>
          <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="inline-block font-bold max-lg:text-5xl">
              <Text field={sectionTitle} />
            </h2>
            <h2 className="inline-block font-bold max-lg:text-5xl">
              <AccentLine className="w-full max-w-xs" />
            </h2>
          </div>
        </div>

        {/* Slider Section */}
        <div className="relative mt-11">
          {/* Slider Component */}
          <button
            className={`reviews_carousel_btn reviews_carousel_btn_left swiper-btn-prev-${uid}`}
            name="previous-review"
            aria-label="Previous Review"
          >
            <ArrowIcon direction="left" />
          </button>

          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: `.swiper-btn-prev-${uid}`,
              nextEl: `.swiper-btn-next-${uid}`,
            }}
            spaceBetween={20}
            slidesPerView={4}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <ReviewCard {...review} />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            className={`reviews_carousel_btn_right reviews_carousel_btn swiper-btn-next-${uid}`}
            name="next-review"
            aria-label="Next Review"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>
    </div>
  );
};
