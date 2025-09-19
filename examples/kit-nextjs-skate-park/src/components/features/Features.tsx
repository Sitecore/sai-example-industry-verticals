import { generateIndexes } from '@/helpers/generateIndexes';
import { IGQLTextField } from '@/types/igql';
import { ComponentParams, ComponentRendering, Image, Text } from '@sitecore-content-sdk/nextjs';
import React from 'react';
import { ExploreLink } from '../non-sitecore/ExploreLink';
import AccentLine from '@/assets/icons/accent-line/AccentLine';

interface Fields {
  data: {
    datasource: {
      children: {
        results: Feature[];
      };
      title: IGQLTextField;
    };
  };
}

interface Feature {
  featureImage: { jsonValue: { value: { src: string; alt?: string } } };
  featureTitle: { jsonValue: { value: string } };
  featureDescription: { jsonValue: { value: string } };
  featureLink: { jsonValue: { value: { href: string } } };
}

type FeaturesProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

type FeatureWrapperProps = {
  props: FeaturesProps;
  children: React.ReactNode;
};

const FeatureWrapper = (wrapperProps: FeatureWrapperProps) => {
  // rendering item id
  const id = wrapperProps.props.params.RenderingIdentifier;

  return (
    <section className={`${wrapperProps.props.params.styles}`} id={id ? id : undefined}>
      {wrapperProps.children}
    </section>
  );
};

export const Default = (props: FeaturesProps) => {
  // results of the graphql
  const results = props.fields.data.datasource.children.results;

  // Feature Section Title
  const featureSectionTitle = props.fields.data.datasource.title;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 lg:gap-10 lg:grid-cols-[1fr_2fr] py-20">
        <div className="mb-20 lg:mb-0">
          <h2 className="max-w-md inline-block max-lg:text-[42px] font-bold">
            <Text field={featureSectionTitle.jsonValue} />
            <AccentLine className="w-full max-w-xs" />
          </h2>
        </div>
        {/* <div className="flex flex-col md:flex-row justify-between gap-16 md:gap-8"> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-8">
          {results.map((item, index) => {
            const title = item.featureTitle.jsonValue;
            const description = item.featureDescription.jsonValue;
            const link = item.featureLink.jsonValue;
            return (
              <div className="flex flex-col" key={index}>
                {/* Title, Link and Description */}
                <div className="font-bold text-2xl mb-5">
                  <Text field={title} />
                </div>
                <div className="flex-auto mb-3.5 text-foreground leading-7">
                  <Text field={description} />
                </div>
                {link?.value && link?.value?.href && <ExploreLink linkText={link} />}
              </div>
            );
          })}
        </div>
      </div>
    </FeatureWrapper>
  );
};

export const ImageGrid = (props: FeaturesProps) => {
  // results of the graphql
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 py-9">
        {results.map((item, index) => {
          const imageField = item?.featureImage.jsonValue;
          return (
            <div className="flex items-center justify-center py-9 lg:py-2" key={index}>
              {imageField && <Image field={imageField} className="max-h-20 object-contain" />}
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

export const ThreeColGridCentered = (props: FeaturesProps) => {
  // results of the graphql
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container flex flex-col gap-20 md:flex-row lg:gap-20 justify-evenly flex-wrap">
        {results.map((item, index) => {
          const title = item.featureTitle.jsonValue;
          const description = item.featureDescription.jsonValue;
          const image = item.featureImage.jsonValue;
          return (
            <div className="flex items-center justify-start flex-col 2xl:w-80" key={index}>
              {/* Image */}
              <div className="mb-7 rounded-full bg-accent w-20 h-20 flex items-center justify-center">
                <Image field={image} />
              </div>
              {/* Title and Description */}
              <div className="flex items-center justify-center flex-col">
                <div className="leading-0.5 mb-2">
                  <Text tag="h5" className="text-accent" field={title} />
                </div>
                <div className="text-background-muted-light text-center">
                  <Text field={description} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

export const NumberedGrid = (props: FeaturesProps) => {
  // results of the graphql
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-24">
        {results.map((item, index) => {
          const title = item?.featureTitle.jsonValue;
          const description = item?.featureDescription.jsonValue;
          return (
            <div
              className="group cursor-pointer p-6 rounded-xl text-background hover:bg-accent"
              key={index}
            >
              {/* Generated Number */}
              <h1 className="mb-2 text-7xl leading-24 group-hover:text-background text-background-muted-dark">
                {generateIndexes(index)}
              </h1>
              {/* Title and Description */}
              <div>
                <div className="mb-4 text-accent text-2xl leading-8 font-[700] group-hover:text-background">
                  <Text field={title} />
                </div>
                <div className="text-background-muted-dark leading-7 group-hover:text-background">
                  <Text field={description} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

export const FourColGrid = (props: FeaturesProps) => {
  // results of the graphql
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container py-24 grid grid-cols-1 gap-20 md:grid-cols-2 lg:gap-10 lg:grid-cols-4 ">
        {results.map((item, index) => {
          const title = item.featureTitle.jsonValue;
          const description = item.featureDescription.jsonValue;
          const image = item.featureImage.jsonValue;
          return (
            <div className="grid grid-cols-[1fr_2fr] gap-2.5" key={index}>
              {/* Image */}
              <div className="rounded-full flex items-center justify-center">
                <Image field={image} />
              </div>
              {/* Title and Description */}
              <div className="flex flex-col justify-center">
                <div className="font-bold text-xl leading-9">
                  <Text className="text-foreground" field={title} />
                </div>
                <div className="text-background-muted-light leading-8">
                  <Text field={description} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};
