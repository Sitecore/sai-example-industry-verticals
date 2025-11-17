import React from 'react';
import {
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  NextImage as ContentSdkImage,
  ImageField,
  Field,
  RichTextField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

export interface DoctorFields {
  Title: Field<string>;
  FullName: Field<string>;
  JobTitle: Field<string>;
  Photo: ImageField;
  Bio: RichTextField;
}

interface DoctorDetailsProps extends ComponentProps {
  fields: DoctorFields;
}

export const Default = (props: DoctorDetailsProps) => {
  const { page } = useSitecore();

  const id = props.params.RenderingIdentifier;
  const styles = `${props?.params?.styles || ''}`.trim();
  const isPageEditing = page.mode.isEditing;

  if (!props.fields?.Title) {
    return isPageEditing ? (
      <div className={`component article-listing py-6 ${styles}`} id={id}>
        [Doctor Details]
      </div>
    ) : (
      <></>
    );
  }

  return (
    <section className={`relative py-16 ${styles}`} id={id || undefined}>
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
