'use client';

import React from 'react';
import {
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  ImageField,
  Field,
  LinkField,
  RichTextField,
  ComponentRendering,
  ComponentParams,
  Placeholder,
  withDatasourceCheck,
} from '@sitecore-content-sdk/nextjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import BlobAccent from '../non-sitecore/BlobAccent';
import CurvedClip from '../non-sitecore/CurvedClip';
import { CommonStyles } from '@/types/styleFlags';

interface Fields {
  PromoImageOne: ImageField;
  PromoTitle: Field<string>;
  PromoDescription: RichTextField;
  PromoMoreInfo: LinkField;
}

type PromoProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const PromoWrapper = ({ children, props }: { children: React.ReactNode; props: PromoProps }) => {
  const id = props.params.RenderingIdentifier;
  const hideBlobAccent = props.params.styles?.includes(CommonStyles.HideBlobAccent);
  const curvedTop = props.params.styles?.includes(CommonStyles.CurvedTop);
  const curvedBottom = props.params.styles?.includes(CommonStyles.CurvedBottom);

  return (
    <section
      className={`component promo bg-background-secondary dark:bg-background-secondary-dark relative py-12 sm:py-20 lg:py-32 ${props?.params?.styles}`}
      id={id ? id : undefined}
    >
      {curvedTop && <CurvedClip className="top-0" pos="top" />}
      {curvedBottom && <CurvedClip className="bottom-0" pos="bottom" />}
      {!hideBlobAccent && (
        <BlobAccent
          size="lg"
          className="absolute top-0 left-0 z-0 lg:left-4 lg:[.promo-reversed_&]:right-4 lg:[.promo-reversed_&]:left-auto"
        />
      )}
      <div className="relative z-10 container">
        <div className="grid items-center gap-x-24 gap-y-12 lg:grid-cols-2">
          <div className="shadow-soft aspect-square overflow-hidden rounded-lg">
            <ContentSdkImage
              field={props.fields.PromoImageOne}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="lg:[.promo-reversed_&]:order-first">{children}</div>
        </div>
      </div>
    </section>
  );
};

const DefaultPromo = (props: PromoProps) => {
  return (
    <PromoWrapper props={props}>
      <h2>
        <ContentSdkText field={props.fields.PromoTitle} />
      </h2>
      <ContentSdkRichText className="mb-10 text-lg" field={props.fields.PromoDescription} />

      <ContentSdkLink field={props.fields.PromoMoreInfo} className="btn btn-icon">
        {props.fields?.PromoMoreInfo?.value?.text}
        <FontAwesomeIcon icon={faArrowRight} />
      </ContentSdkLink>
    </PromoWrapper>
  );
};

const WithPlaceholderPromo = (props: PromoProps) => {
  return (
    <PromoWrapper props={props}>
      <h2>
        <ContentSdkText field={props.fields.PromoTitle} />
      </h2>
      <Placeholder
        name={`promo-content-${props?.params?.DynamicPlaceholderId}`}
        rendering={props.rendering}
      />
    </PromoWrapper>
  );
};

export const Default = withDatasourceCheck()<PromoProps>(DefaultPromo);
export const WithPlaceholder = withDatasourceCheck()<PromoProps>(WithPlaceholderPromo);
