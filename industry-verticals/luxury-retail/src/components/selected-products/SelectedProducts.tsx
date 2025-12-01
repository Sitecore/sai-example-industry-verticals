import React, { JSX, useId } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { Text, Field, LinkField } from '@sitecore-content-sdk/nextjs';
import { SitecoreItem } from '@/types/common';
import { Product } from '@/types/products';
import { ProductCard } from '../non-sitecore/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Keyboard, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Fields {
  Title: Field<string>;
  ProductsLink: LinkField;
  ProductsList: SitecoreItem<Product>[];
}

interface RelatedProductsProps extends ComponentProps {
  fields: Fields;
}

export const Default = (props: RelatedProductsProps): JSX.Element => {
  const { styles, RenderingIdentifier: id } = props.params;

  return (
    <section
      className={`component related-products py-18 [.section-wrapper_&]:py-8 ${styles}`}
      id={id || undefined}
    >
      <div className="container grid grid-cols-2 gap-8 lg:grid-cols-4">
        {props.fields.ProductsList.map(({ id, url, fields }) => (
          <ProductCard key={id} product={fields as Product} url={url} productId={id} />
        ))}
      </div>
    </section>
  );
};

export const Carousel = (props: RelatedProductsProps): JSX.Element => {
  const { styles, RenderingIdentifier: id } = props.params;
  const uid = useId();

  return (
    <section
      className={`component related-products py-18 [.section-wrapper_&]:py-8 ${styles}`}
      id={id || undefined}
    >
      <div className="container">
        <div className="mb-8 flex flex-wrap items-center justify-between">
          <p className="text-xl">
            <Text field={props.fields?.Title} />
          </p>
          <div className="flex gap-4">
            <button
              className={`product-carousel-prev-${uid}`}
              name="previous-product"
              aria-label="Previous product"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              className={`product-carousel-next-${uid}`}
              name="next-product"
              aria-label="Next product"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
        <Swiper
          spaceBetween={32}
          loop={true}
          modules={[Navigation, Keyboard, A11y]}
          navigation={{
            prevEl: `.product-carousel-prev-${uid}`,
            nextEl: `.product-carousel-next-${uid}`,
            disabledClass: 'pointer-events-none opacity-50',
          }}
          slidesPerView={2}
          breakpoints={{
            1024: { slidesPerView: 4 },
          }}
          a11y={{ enabled: true }}
          keyboard={{ enabled: true }}
        >
          {[...props.fields.ProductsList, ...props.fields.ProductsList].map(
            ({ id, url, fields }) => (
              <SwiperSlide key={id}>
                <ProductCard product={fields as Product} url={url} productId={id} />
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </section>
  );
};
