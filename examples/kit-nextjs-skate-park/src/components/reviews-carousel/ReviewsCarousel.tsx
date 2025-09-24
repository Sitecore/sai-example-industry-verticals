import { ComponentProps } from '@/lib/component-props';
import {
  ComponentParams,
  ComponentRendering,
  Field,
  ImageField,
  TextField,
} from '@sitecore-content-sdk/nextjs';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import AccentLine from '@/assets/icons/accent-line/AccentLine';
import ArrowIcon from '../non-sitecore/ArrowIcon';

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
          <p className="eyebrow pb-4">{/* <Text field={sectionEyebrow} /> */}TESTIMONIALS</p>
          <div>
            {/* <Text field={sectionTitle} /> */}
            <h2>Our client reviews</h2>
            <h2 className="inline-block font-bold max-lg:text-5xl">
              <AccentLine className="w-full max-w-xs" />
            </h2>
          </div>
        </div>

        {/* Slider Section */}
        <div className="relative mt-11">
          {/* Slider Component */}
          <button
            className={`reviews_carousel_btn 3xl:-left-5 left-0 z-10 swiper-btn-prev-${uid}`}
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
            centeredSlides={true}
            slidesPerView={4}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="bg-accent mx-0! w-full transition-all"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id} className="">
                <h1>asdasd</h1>
                <h1>asdasd</h1>
                <h1>asdasd</h1>
                <h1>asdasd</h1>
                {/* <Text field={review.fields.ReviewerName} /> */}
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            className={`reviews_carousel_btn 3xl:-right-5 right-0 swiper-btn-next-${uid}`}
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
