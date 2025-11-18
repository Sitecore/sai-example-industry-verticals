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
import { isParamEnabled } from 'src/helpers/isParamEnabled';

interface Fields {
  PromoImage: ImageField;
  PromoTitle: Field<string>;
  PromoText: RichTextField;
  PromoLink: LinkField;
}

type PromoProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const PromoWrapper = ({
  children,
  props,
}: {
  children: React.ReactNode;
  props: PromoProps;
}) => {
  const id = props.params.RenderingIdentifier;
  const isAccentLine = props.params.Styles?.includes('accent-line');

  return (
    <section
      className={`component promo relative bg-background-secondary dark:bg-background-secondary-dark py-12 sm:py-20 lg:py-32 ${props?.params?.styles}`}
      id={id ? id : undefined}
    >
      {isParamEnabled(props.params.CurvedTop) && <CurvedClip className='top-0' pos="top" />}
      {isParamEnabled(props.params.CurvedBottom) && <CurvedClip className='bottom-0' pos="bottom" />}
      {isAccentLine && (
        <BlobAccent
          size="lg"
          className="absolute top-0 left-0 lg:left-4 lg:[.promo-reversed_&]:left-auto lg:[.promo-reversed_&]:right-4 z-0"
        />
      )}
      <div className="container relative z-10">
        <div className="grid gap-x-24 gap-y-12 items-center lg:grid-cols-2">
          <div className="aspect-square rounded-lg shadow-soft overflow-hidden">
            <ContentSdkImage field={props.fields.PromoImage} className="w-full h-full object-cover" />
          </div>
          <div className="lg:[.promo-reversed_&]:order-first">{children}</div>
        </div>
      </div>
    </section>
  );
};

const DefaultPromo = (props: PromoProps) => {
  console.log(props);
  return (
    <PromoWrapper props={props}>
      <h2>
        <ContentSdkText field={props.fields.PromoTitle} />
      </h2>
      <ContentSdkRichText className="text-lg mb-10" field={props.fields.PromoText} />

      <ContentSdkLink field={props.fields.PromoLink} className="btn btn-icon">
        {props.fields?.PromoLink?.value?.text}
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