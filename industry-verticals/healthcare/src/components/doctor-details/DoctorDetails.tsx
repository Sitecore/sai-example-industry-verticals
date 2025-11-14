import React from 'react';
import {
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  NextImage as ContentSdkImage,
  ImageField,
  Field,
  RichTextField,
  withDatasourceCheck,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

export interface DoctorFields {
  FullName: Field<string>;
  JobTitle: Field<string>;
  Photo: ImageField;
  Bio: RichTextField;
}

interface DoctorDetailsProps extends ComponentProps {
  fields: DoctorFields;
}

const DefaultDoctorDetails = (props: DoctorDetailsProps) => {
  const id = props.params.RenderingIdentifier;

  return (
    <section className={`relative py-16 ${props.params.styles}`} id={id || undefined}>
      <div className="container grid gap-8 lg:grid-cols-3">
        <div className="placeholder-pattern-background shadow-soft relative aspect-square overflow-hidden rounded-lg">
          <ContentSdkImage field={props.fields?.Photo} className="h-full w-full object-cover" />
        </div>
        <div className="lg:col-span-2 xl:p-8">
          <h1 className="mb-3">
            <ContentSdkText field={props.fields?.FullName} />
          </h1>
          <h5 className="text-accent mb-8">
            <ContentSdkText field={props.fields?.JobTitle} />
          </h5>
          <div className="text-lg">
            <ContentSdkRichText field={props.fields?.Bio} />
          </div>
        </div>
      </div>
    </section>
  );
};

export const Default = withDatasourceCheck()<DoctorDetailsProps>(DefaultDoctorDetails);
