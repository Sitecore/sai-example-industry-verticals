'use client';

import React from 'react';
import { useI18n } from 'next-localization';
import {
  ImageField,
  NextImage as ContentSdkImage,
  withDatasourceCheck,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import BlobAccent from '@/assets/shapes/BlobAccent';
import HeroClip from '@/assets/shapes/HeroClip';

interface Fields {
  Image: ImageField;
}

interface HeroBannerProps extends ComponentProps {
  fields: Fields;
}

export const DefaultHeroBanner = (props: HeroBannerProps) => {
  const id = props.params.RenderingIdentifier;
  const { t } = useI18n();

  return (
    <section className={`relative pb-12 ${props?.params?.styles}`} id={id || undefined}>
      <div className="relative">
        <div className="absolute inset-0 z-0 mask-[var(--background-image-hero-clip)] mask-cover">
          <ContentSdkImage field={props.fields.Image} className="h-full w-full object-cover" />
        </div>
        <HeroClip />
        <BlobAccent className="absolute bottom-14 left-0 z-1 lg:left-4" />
        <div className="pointer-events-none relative z-10 container flex min-h-[80vh] flex-col">
          <div className="mt-auto flex items-end justify-end">
            <div className="pointer-events-auto relative flex basis-full items-end justify-center pt-14 lg:basis-1/2">
              <BlobAccent
                size="full"
                fill="solid"
                colorScheme="secondary"
                mirrored
                className="relative z-1"
              />
              <BlobAccent
                size="lg"
                className="absolute top-0 left-1/2 z-2 !max-w-3/5 -translate-x-1/2"
              />
              <BlobAccent
                shape="circle"
                size="sm"
                fill="solid"
                colorScheme="tertiary"
                className="absolute -bottom-12 left-1/2 z-2 -translate-x-1/2"
              />
              <BlobAccent
                shape="circle"
                size="sm"
                className="absolute top-4 right-4 z-0 lg:right-16"
              />
              <div className="absolute top-1/2 left-1/2 z-3 w-3/4 -translate-x-1/2 -translate-y-1/2 sm:w-2/3 xl:w-1/2">
                <form action="" className="mt-12 flex flex-col gap-4 md:ml-12">
                  <input
                    type="text"
                    name="your-name"
                    id="your-name"
                    placeholder={t('your_name') || 'Your Name'}
                    className="form-input"
                  />
                  <input
                    type="email"
                    name="your-email"
                    id="your-email"
                    placeholder={t('your_email') || 'Your Email'}
                    className="form-input"
                  />
                  <input
                    type="text"
                    name="select-doctor"
                    id="select-doctor"
                    placeholder={t('select_doctor') || 'Select a Doctor'}
                    className="form-input"
                  />
                  <input
                    type="text"
                    name="select-date"
                    id="select-date"
                    placeholder={t('select_date') || 'Select a Date'}
                    className="form-input"
                  />

                  <input
                    type="submit"
                    value={t('make_appointment') || 'Make an appointment'}
                    className="btn self-center"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Default = withDatasourceCheck()<HeroBannerProps>(DefaultHeroBanner);
