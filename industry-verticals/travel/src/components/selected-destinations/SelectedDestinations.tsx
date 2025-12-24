'use client';

import { ComponentProps } from '@/lib/component-props';
import { Field, NextImage as ContentSdkImage, Text } from '@sitecore-content-sdk/nextjs';
import { Destination } from '@/types/destination';
import Link from 'next/link';
import { useI18n } from 'next-localization';
import { ArrowRight } from 'lucide-react';
import { LayoutStyles } from '@/types/styleFlags';

interface Fields {
  Title: Field<string>;
  Description: Field<string>;
  Destinations: Array<Destination>;
}

export type SelectedDestinationsProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: SelectedDestinationsProps) => {
  const { t } = useI18n();
  const id = props.params.RenderingIdentifier;
  const destinations = props.fields?.Destinations || [];
  const hasJustifyAround = props?.params?.styles?.includes(LayoutStyles.JustyfyAround);

  return (
    <section className={`${props.params.styles} py-10`} id={id ? id : undefined}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-14 text-center">
          <h2 className="mb-4">
            <Text field={props.fields?.Title} />
          </h2>

          <p className="text-foreground-light text-xl">
            <Text field={props.fields.Description} />
          </p>
        </div>

        {/* Cards */}
        <div className={`${hasJustifyAround ? 'my-10 flex w-full justify-around' : ''}`}>
          <div className="grid gap-x-5 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((destination, index) => (
              <div
                key={index}
                className="flex h-full flex-col overflow-hidden rounded-md bg-white shadow-md transition-transform duration-300 focus-within:scale-102 focus-within:transition-all focus-within:duration-300 focus-within:ease-linear hover:-translate-y-1 hover:scale-102 hover:shadow-lg hover:transition-all hover:duration-300 hover:ease-linear focus-within:hover:shadow-lg"
              >
                {destination.fields.Image && (
                  <div className="aspect-h-1 aspect-w-1 sm:aspect-none bg-accent-light/40 h-32 w-full overflow-hidden rounded-t-md">
                    <ContentSdkImage
                      field={destination.fields.Image}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <div className="m-4 flex flex-1 flex-col">
                  <h6 className="text-foreground mb-4 font-semibold">
                    <Text field={destination.fields.Title} />
                  </h6>

                  <div className="mt-auto">
                    <Link
                      href={destination.url}
                      className="text-accent inline-flex items-center text-sm font-medium transition-colors"
                    >
                      {t('read_more') || 'Read More'}
                      <ArrowRight className="h-4 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const WithStartingPrice = (props: SelectedDestinationsProps) => {
  const id = props.params.RenderingIdentifier;
  const destinations = props.fields?.Destinations || [];
  const hasJustifyAround = props?.params?.styles?.includes(LayoutStyles.JustyfyAround);

  return (
    <section className={`${props.params.styles} py-10`} id={id ? id : undefined}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-14 text-center">
          <h2 className="mb-4">
            <Text field={props.fields.Title} />
          </h2>

          <p className="text-foreground-light text-xl">
            <Text field={props.fields.Description} />
          </p>
        </div>

        {/* Cards */}
        <div className={`${hasJustifyAround ? 'my-10 flex w-full justify-around' : ''}`}>
          <div className="grid gap-x-5 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((destination, index) => (
              <Link
                key={index}
                href={destination.url}
                className="group flex h-full flex-col gap-5 overflow-hidden rounded-md shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {destination.fields.Image && (
                  <div
                    className={`bg-accent-light/40 aspect-w-1 relative w-full overflow-hidden ${hasJustifyAround ? 'h-32' : 'h-48'}`}
                  >
                    <ContentSdkImage
                      field={destination.fields.Image}
                      className="h-full w-full object-cover"
                    />

                    {destination.fields.Price && (
                      <div className="bg-accent text-background absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold shadow">
                        <Text field={destination.fields.Price} />
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-1 flex-col gap-3 p-4">
                  <h6 className="text-foreground font-semibold">
                    <Text field={destination.fields.Title} />
                  </h6>

                  {destination.fields.Country && (
                    <span className="text-foreground-light text-sm">
                      <Text field={destination.fields.Country} />
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
