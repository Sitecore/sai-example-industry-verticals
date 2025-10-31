import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  RichText as ContentSdkRichText,
  Field,
  ImageField,
  Link,
  LinkField,
  RichTextField,
  Text,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { isParamEnabled } from '@/helpers/isParamEnabled';

interface Fields {
  PromoImageOne: ImageField;
  PromoImageTwo: ImageField;
  PromoImageThree: ImageField;
  PromoTitle: Field<string>;
  PromoDescription: RichTextField;
  PromoSubTitle: Field<string>;
  PromoMoreInfo: LinkField;
}

export type PromoProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const isPromoReversed = !isParamEnabled(props.params.Reversed) ? '' : 'order-last';

  return (
    <section className={`${props.params.styles} py-20`} id={id ? id : undefined}>
      <div className="container grid grid-cols-1 place-items-center gap-10 lg:grid-cols-2">
        <div className={`${isPromoReversed} relative w-full`}>
          <div
            className={`relative z-10 aspect-4/3 w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl`}
          >
            <ContentSdkImage
              field={props.fields.PromoImageOne}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-5">
          <div className="eyebrow">
            <Text field={props.fields.PromoSubTitle} />
          </div>

          <h2 className="inline-block max-w-md">
            <Text field={props.fields.PromoTitle} />
          </h2>

          <div className="max-w-lg text-lg">
            <ContentSdkRichText field={props.fields.PromoDescription} />
          </div>

          <Link field={props.fields.PromoMoreInfo} className="main-btn" />
        </div>
      </div>
    </section>
  );
};
