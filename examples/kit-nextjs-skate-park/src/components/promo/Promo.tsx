import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  RichText as ContentSdkRichText,
  Field,
  ImageField,
  LinkField,
  RichTextField,
  Text,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { isParamEnabled } from '@/helpers/isParamEnabled';

import clsx from 'clsx';
import AccentLine from '@/assets/icons/accent-line/AccentLine';
import { ExploreLink } from '../non-sitecore/ExploreLink';

interface Fields {
  PromoImageOne: ImageField;
  PromoImageTwo: ImageField;
  PromoImageThree: ImageField;
  PromoTitle: Field<string>;
  PromoDescription: RichTextField;
  PromoSubTitle: Field<string>;
  PromoMoreInfo: LinkField;
}

type PromoImageGroupProps = Partial<
  Pick<Fields, 'PromoImageOne' | 'PromoImageTwo' | 'PromoImageThree'>
> & {
  withShapes?: boolean;
  withShadows?: boolean;
};

export type PromoProps = ComponentProps & {
  fields: Fields;
};

const isShadowClassActive = (val: boolean) => (val ? 'shadow-2xl' : '');

export const SingleImageContainer = ({
  PromoImageOne,
  withShapes,
  withShadows,
}: PromoImageGroupProps): JSX.Element => {
  const shadowClass = isShadowClassActive(withShadows ?? false);
  return (
    <>
      {withShapes && (
        <div className="absolute top-0 left-0 w-2/3 aspect-[495/422] bg-background-muted rounded-2xl z-0"></div>
      )}
      <div>
        <div className={clsx({ 'm-4 md:m-9 md:mb-6 xl:m-15 xl:mb-8': withShapes })}>
          {withShapes && (
            <div className="absolute top-1/2 right-0 w-3/4 aspect-[495/301] bg-background-muted rounded-2xl z-0 transform -translate-y-1/2"></div>
          )}
          <div
            className={`relative z-10 aspect-[608/445] overflow-hidden rounded-2xl w-full max-w-4xl ${shadowClass}`}
          >
            <ContentSdkImage field={PromoImageOne} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </>
  );
};

export const MultipleImageContainer = ({
  PromoImageOne,
  PromoImageTwo,
  PromoImageThree,
  withShapes,
  withShadows,
}: PromoImageGroupProps): JSX.Element => {
  const shadowClass = isShadowClassActive(withShadows ?? false);
  const marginClass = withShapes ? 'mr-4' : '';

  return (
    <>
      <div className="flex items-center flex-col md:flex-row gap-8">
        <div className="flex flex-col gap-10 md:w-1/3">
          <div className="relative aspect-[223/229] rounded-2xl overflow-visible">
            <div
              className={`relative z-10 w-full h-full  overflow-hidden rounded-2xl ${shadowClass}`}
            >
              <ContentSdkImage field={PromoImageTwo} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="relative aspect-[223/317] rounded-2xl overflow-visible">
            <div
              className={`relative z-10 w-full h-full overflow-hidden rounded-2xl ${shadowClass}`}
            >
              <ContentSdkImage
                field={PromoImageThree}
                className="w-full h-full object-cover object-left"
              />
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/3 relative">
          {withShapes && (
            <div className="absolute md:-top-10 xl:-top-15 right-0 w-3/4 aspect-[495/422] bg-background-muted rounded-2xl z-0"></div>
          )}
          <div
            className={`relative aspect-[629/445] rounded-2xl overflow-visible ${marginClass} z-10`}
          >
            <div className={`relative z-10 rounded-2xl overflow-hidden ${shadowClass}`}>
              <ContentSdkImage field={PromoImageOne} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const Default = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const isCurveLineVisible = !isParamEnabled(props.params.HideCurveLine);
  const isPromoReversed = !isParamEnabled(props.params.Reversed) ? '' : 'order-last';
  const showSingleImage = !isParamEnabled(props.params.ShowMultipleImages);
  const withShapes = !isParamEnabled(props.params.HideShapes);
  const withShadows = !isParamEnabled(props.params.HideShadows);

  const firstColumnSize = showSingleImage ? 'lg:col-span-6' : 'lg:col-span-7';
  const secondColumnSize = showSingleImage ? 'lg:col-span-6' : 'lg:col-span-5';

  return (
    <section className={`${props.params.styles}  py-20`} id={id ? id : undefined}>
      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-10 place-items-center">
        <div className={`${isPromoReversed} col-span-full ${firstColumnSize} relative w-full`}>
          {showSingleImage ? (
            <SingleImageContainer
              PromoImageOne={props.fields.PromoImageOne}
              withShapes={withShapes}
              withShadows={withShadows}
            />
          ) : (
            <MultipleImageContainer
              PromoImageOne={props.fields.PromoImageOne}
              PromoImageTwo={props.fields.PromoImageTwo}
              PromoImageThree={props.fields.PromoImageThree}
              withShapes={withShapes}
              withShadows={withShadows}
            />
          )}
        </div>

        <div className={`space-y-5 col-span-full ${secondColumnSize}`}>
          <div className="text-accent uppercase text-sm">
            <Text field={props.fields.PromoSubTitle} />
          </div>

          <h2 className="max-w-md inline-block">
            <Text field={props.fields.PromoTitle} />
            {isCurveLineVisible && <AccentLine className="w-full max-w-xs" />}
          </h2>
          <div className="text-lg max-w-lg">
            <ContentSdkRichText field={props.fields.PromoDescription} />
          </div>

          <ExploreLink linkText={props.fields.PromoMoreInfo} />
        </div>
      </div>
    </section>
  );
};

export const AboutPromo = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const isPromoReversed = !isParamEnabled(props.params.Reversed) ? ' flex-col' : 'flex-col-reverse';

  return (
    <section className={`${props.params.styles}  py-20`} id={id ? id : undefined}>
      <div className={`container flex ${isPromoReversed}`}>
        <div className="relative aspect-[1232/608] overflow-hidden rounded-2xl my-10">
          <ContentSdkImage
            field={props.fields.PromoImageTwo}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-5">
          <div className="uppercase font-semibold text-foreground-light">
            <Text field={props.fields.PromoSubTitle} />
          </div>

          <div className="grid grid-col-1 md:grid-cols-2 gap-5">
            <div className="font-bold">
              <h2 className="max-w-md">
                <Text field={props.fields.PromoTitle} />
              </h2>
            </div>

            <div className="max-w-md flex items-center">
              <ContentSdkRichText className="promo-text" field={props.fields.PromoDescription} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
