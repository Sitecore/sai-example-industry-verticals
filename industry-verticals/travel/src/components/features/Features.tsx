import { ComponentProps } from '@/lib/component-props';
import { IGQLField, IGQLTextField } from '@/types/igql';
import { Text, NextImage as Image, LinkField, ImageField } from '@sitecore-content-sdk/nextjs';
import React from 'react';
interface Fields {
  data: {
    datasource: {
      children: {
        results: Feature[];
      };
      title: IGQLTextField;
      description: IGQLTextField;
    };
  };
}

interface Feature {
  featureImage: IGQLField<ImageField>;
  featureTitle: IGQLTextField;
  featureDescription: IGQLTextField;
  featureLink: IGQLField<LinkField>;
}

type FeaturesProps = ComponentProps & {
  fields: Fields;
};

type FeaturesWrapperProps = React.PropsWithChildren<FeaturesProps>;

const FeaturesWrapper = ({ children, ...props }: FeaturesWrapperProps) => {
  const id = props.params.RenderingIdentifier;
  const hideTitleSection = props.params?.styles?.includes('hide-title-section');

  return (
    <section className={`component py-10 lg:py-16 ${props.params.styles}`} id={id ? id : undefined}>
      <div className="@container container in-[.column-splitter]:px-0">
        {!hideTitleSection && (
          <div className="mb-12 text-center">
            <h2 className="mb-4">
              <Text field={props.fields.data.datasource.title.jsonValue} />
            </h2>
            <p>
              <Text field={props.fields.data.datasource.description.jsonValue} />
            </p>
          </div>
        )}
        <div className="-mx-3 flex flex-wrap justify-center gap-y-6">{children}</div>
      </div>
    </section>
  );
};

export const Default = (props: FeaturesProps) => {
  const features = props.fields.data.datasource.children.results;

  return (
    <FeaturesWrapper {...props}>
      {features.map((f, i) => {
        return (
          <div
            className="flex min-w-1/4 grow basis-full flex-col items-center gap-2 px-3 text-center @md:basis-1/2 @3xl:basis-1/4"
            key={i}
          >
            <Image field={f.featureImage.jsonValue} className="size-12 object-contain" />
            <h5 className="mt-2">
              <Text field={f.featureTitle.jsonValue} />
            </h5>
            <p>
              <Text field={f.featureDescription.jsonValue} />
            </p>
          </div>
        );
      })}
    </FeaturesWrapper>
  );
};

export const Simple = (props: FeaturesProps) => {
  const features = props.fields.data.datasource.children.results;

  return (
    <FeaturesWrapper {...props}>
      {features.map((f, i) => {
        return (
          <div
            className="flex min-w-1/6 grow basis-1/2 flex-col items-center gap-2 px-3 text-center @md:basis-1/3 @3xl:basis-1/6"
            key={i}
          >
            <Image field={f.featureImage.jsonValue} className="size-6 object-contain" />
            <h5 className="text-foreground-light text-sm font-semibold">
              <Text field={f.featureTitle.jsonValue} />
            </h5>
          </div>
        );
      })}
    </FeaturesWrapper>
  );
};

export const Stats = (props: FeaturesProps) => {
  const features = props.fields.data.datasource.children.results;

  return (
    <FeaturesWrapper {...props}>
      {features.map((f, i) => {
        return (
          <div className="min-w-1/4 grow basis-full px-3 @md:basis-1/2 @3xl:basis-1/4" key={i}>
            <div className="bg-background-accent flex flex-col items-center gap-2 rounded-md p-6 text-center">
              <h3 className="text-accent">
                <Text field={f.featureTitle.jsonValue} />
              </h3>
              <p>
                <Text field={f.featureDescription.jsonValue} />
              </p>
            </div>
          </div>
        );
      })}
    </FeaturesWrapper>
  );
};

export const Card = (props: FeaturesProps) => {
  const features = props.fields.data.datasource.children.results;

  return (
    <FeaturesWrapper {...props}>
      {features.map((f, i) => {
        return (
          <div className="min-w-1/3 grow basis-full px-3 @3xl:basis-1/3" key={i}>
            <div className="flex h-full flex-col overflow-hidden rounded-lg border shadow-sm">
              <Image field={f.featureImage.jsonValue} className="h-48 w-full object-cover" />
              <div className="space-y-2 p-6">
                <h5>
                  <Text field={f.featureTitle.jsonValue} />
                </h5>
                <p>
                  <Text field={f.featureDescription.jsonValue} />
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </FeaturesWrapper>
  );
};

export const LargeImage = (props: FeaturesProps) => {
  const features = props.fields.data.datasource.children.results;

  return (
    <FeaturesWrapper {...props}>
      {features.map((f, i) => {
        return (
          <div className="min-w-1/2 grow basis-full px-3 @3xl:basis-1/2" key={i}>
            <div className="bg-accent relative flex h-80 items-end overflow-hidden rounded-lg p-6 shadow-lg">
              <Image
                field={f.featureImage.jsonValue}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="*:text-background relative z-10 space-y-2">
                <h4>
                  <Text field={f.featureTitle.jsonValue} />
                </h4>
                <p>
                  <Text field={f.featureDescription.jsonValue} />
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </FeaturesWrapper>
  );
};
