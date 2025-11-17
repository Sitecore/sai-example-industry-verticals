import { useId } from 'react';
import React from 'react';
import Link from 'next/link';
import { Text as ContentSdkText, NextImage as ContentSdkImage } from '@sitecore-content-sdk/nextjs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, Pagination } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Doctor } from '@/types/doctors';
import { ComponentProps } from '@/lib/component-props';
import { SitecoreItem } from '@/types/common';

interface DoctorsListingProps extends ComponentProps {
  fields: {
    items: SitecoreItem<Doctor>[];
  };
}

const DoctorCard = ({ url, fields }: { url: string; fields: Doctor }) => {
  return (
    <Link
      href={url}
      className="bg-background-secondary dark:bg-background-secondary-dark shadow-soft block overflow-hidden rounded-lg"
    >
      <div className="placeholder-pattern-background aspect-square">
        <ContentSdkImage field={fields.Photo} className="h-full w-full rounded-t-lg object-cover" />
      </div>
      <div className="p-7 text-center">
        <h5>
          <ContentSdkText field={fields.FullName} />
        </h5>
        <p className="text-accent text-lg lg:text-xl">
          <ContentSdkText field={fields.JobTitle} />
        </p>
      </div>
    </Link>
  );
};

export const Default = (props: DoctorsListingProps) => {
  const id = props.params.RenderingIdentifier;
  const doctors = props.fields.items.filter((item) => item.fields?.FullName);

  return (
    <section className={`relative py-16 ${props.params.styles}`} id={id || undefined}>
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-3">
          {doctors.map((doc) => (
            <DoctorCard key={doc.id} url={doc.url} fields={doc.fields} />
          ))}
        </div>
      </div>
    </section>
  );
};

export const Slider = (props: DoctorsListingProps) => {
  const uid = useId();
  const id = props.params.RenderingIdentifier;
  const doctors = props.fields.items.filter((item) => item.fields?.FullName);

  return (
    <section
      className={`relative overflow-hidden py-8 ${props.params.styles}`}
      id={id || undefined}
    >
      <div className="relative container space-y-8">
        <div className="slider-btn-wrapper">
          <button className={`slider-btn slider-btn-prev-${uid}`}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button className={`slider-btn slider-btn-next-${uid}`}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Keyboard]}
          spaceBetween={48}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          keyboard={{
            enabled: true,
            onlyInViewport: true,
          }}
          navigation={{
            prevEl: `.slider-btn-prev-${uid}`,
            nextEl: `.slider-btn-next-${uid}`,
          }}
          pagination={{
            clickable: true,
            el: '.slider-pagination-wrapper',
            type: 'bullets',
            bulletElement: 'button',
            bulletClass: 'slider-pagination-btn',
            bulletActiveClass: 'active',
          }}
          className="!overflow-visible"
        >
          {doctors.map((doc) => {
            return (
              <SwiperSlide key={doc.id}>
                <DoctorCard url={doc.url} fields={doc.fields} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="slider-pagination-wrapper"></div>
      </div>
    </section>
  );
};
