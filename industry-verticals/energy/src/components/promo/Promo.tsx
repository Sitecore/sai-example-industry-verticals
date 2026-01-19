import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  RichText as ContentSdkRichText,
  Link as ContentSdkLink,
  ImageField,
  LinkField,
  RichTextField,
  Text as ContentSdkText,
  TextField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { LayoutStyles } from '@/types/styleFlags';

interface Fields {
  PromoImageOne: ImageField;
  PromoTitle: TextField;
  PromoSubTitle: TextField;
  PromoDescription: RichTextField;
  PromoMoreInfo: LinkField;
}

export type PromoProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;
  const isPromoReversed = sxaStyles?.includes(LayoutStyles.Reversed) ? 'lg:order-last' : '';

  return (
    <div className={`${sxaStyles}`} id={id}>
      <div className="container">
        <div
          className={`my-12 grid cursor-pointer overflow-hidden rounded-xl border shadow transition-shadow hover:shadow-lg lg:max-h-120 lg:grid-cols-2`}
        >
          {/* Image Section */}
          <div className={`flex items-stretch lg:max-h-120 ${isPromoReversed}`}>
            <ContentSdkImage
              field={props.fields.PromoImageOne}
              alt={props.fields.PromoImageOne.value?.src}
              width={600}
              height={400}
              loading="lazy"
              className="w-full object-cover"
            />
          </div>
          {/* Content Section */}
          <div className="flex flex-col justify-center gap-5 p-6 lg:max-h-120 lg:px-12 lg:py-6 xl:pl-20">
            {/* Eyebrow */}
            <ContentSdkText
              field={props.fields.PromoSubTitle}
              className="text-foreground-light p-0 text-sm font-medium"
            />
            {/* Title */}
            <h4>
              <ContentSdkText
                field={props.fields.PromoTitle}
                className="text-foreground mb-2 p-0 text-2xl font-bold"
              />
            </h4>
            {/* Description */}
            <ContentSdkRichText
              field={props.fields.PromoDescription}
              className="text-foreground-light mb-4 p-0"
            />
            {/* Link */}
            <ContentSdkLink field={props.fields.PromoMoreInfo} className="main-btn" />
          </div>
        </div>
      </div>
    </div>
  );
};
