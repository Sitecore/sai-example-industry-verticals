import { ComponentProps } from '@/lib/component-props';
import {
  ComponentParams,
  ComponentRendering,
  Field,
  Image,
  ImageField,
  Text,
  TextField,
} from '@sitecore-content-sdk/nextjs';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import AccentLine from '@/assets/icons/accent-line/AccentLine';
import ArrowIcon from '../non-sitecore/ArrowIcon';
import StarRating from '../non-sitecore/StarRating';

interface ProductSize {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: {
    ProductSize: {
      value: string;
    };
  };
}

interface Tag {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: {
    Tag: {
      value: string;
    };
  };
}

interface Category {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: {
    CategoryName: {
      value: string;
    };
  };
}

interface Color {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: {
    HexCode: {
      value: string;
    };
    Name: {
      value: string;
    };
  };
}

interface ProductFields {
  id: string;
  displayName: string;
  name: string;
  url: string;
  fields: {
    Image1?: ImageField;
    Image2?: ImageField;
    Image3?: ImageField;
    Image4?: ImageField;
    Image5?: ImageField;

    Title: TextField;
    ShortDescription: TextField;
    LongDescription: TextField;

    Price: Field<number>;
    Rating: Field<number>;
    SKU: TextField;

    Size: ProductSize[];
    Color: Color[];
    Tags: Tag[];
    Category: Category;

    Width: TextField;
    Height: TextField;
    Depth: TextField;
    Weight: TextField;
    SeatHeight: TextField;
    LegHeight: TextField;

    NavigationTitle: TextField;
    NavigationClass: string | null;
    NavigationFilter: any[];
    PageDesign: any | null;
    SxaTags: any[];
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
            className=""
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id} className="">
                <div className="aspect-square rounded-2xl bg-amber-600">
                  <Image field={review.fields.Product.fields.Image1} />
                </div>
                <div className="px-5">
                  <div className="bg-background relative -top-15 flex min-h-70 flex-col items-center justify-between gap-4 rounded-2xl p-8 text-center shadow-xl">
                    {/* Image */}
                    <div className="bg-background absolute -top-10 flex h-[66px] w-[66px] items-center justify-center rounded-full">
                      <div>
                        <Image
                          field={review.fields.Avatar}
                          className="h-[50px] w-[50px] rounded-full"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-bg- font-gilroy text-center text-xl leading-normal font-bold capitalize">
                        <Text field={review.fields.ReviewerName} />
                      </div>
                      <div className="text-md font-gilroy text-background-muted-light text-center leading-normal font-normal">
                        <Text field={review.fields.Caption} />
                      </div>
                    </div>
                    <div className="font-gilroy text-center leading-[22px] font-normal text-[#1E1E1E]">
                      <Text field={review.fields.Description} />
                    </div>
                    <StarRating rating={review.fields.Rating.value} />
                  </div>
                </div>
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
