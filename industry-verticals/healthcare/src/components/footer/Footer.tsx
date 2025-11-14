'use client';

import React from 'react';
import {
  NextImage as JssImage,
  Link as JssLink,
  Text as JssText,
  RichText as JssRichText,
  ImageField,
  LinkField,
  ComponentRendering,
  ComponentParams,
  Placeholder,
  Field,
  RichTextField,
  withDatasourceCheck,
} from '@sitecore-content-sdk/nextjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

interface Fields {
  LogoLight: ImageField;
  LogoDark: ImageField;
  AddressInfo: RichTextField;
  WorkingHours: RichTextField;
  Copyright: Field<string>;
  TermsOfUse: LinkField;
  PrivacyPolicy: LinkField;
  FbLink: LinkField;
  TwitterLink: LinkField;
  InstagramLink: LinkField;
}

type FooterProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const DefaultFooter = (props: FooterProps) => {
  const id = props.params.RenderingIdentifier;

  const isTopSectionVisible = props.params?.DisplayOptions !== 'Hide Top Section';
  const isBottomSectionVisible = props.params?.DisplayOptions !== 'Hide Bottom Section';

  return (
    <section className={`relative ${props.params.styles} overflow-hidden`} id={id ? id : undefined}>
      {isTopSectionVisible && (
        <div className="bg-background-secondary dark:bg-background-secondary-dark pt-24 pb-16">
          <div className="absolute -top-px left-0 -right-px leading-none text-background dark:text-background-dark pointer-events-none">
            <svg
              viewBox="0 0 1613.26 511.77"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0V319.73H.02c.95-649,1546.56-112.85,1611.06-90.19h1.67V0H0Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="relative container z-20">
            <Link href={'/'} className="inline-block max-w-50 lg:max-w-full mb-12">
              <JssImage
                field={props.fields.LogoLight}
                width={345}
                height={45}
                className="dark:hidden"
                priority
              />
              <JssImage
                field={props.fields.LogoDark}
                width={345}
                height={45}
                className="hidden dark:block"
                priority
              />
            </Link>
            <div className="grid gap-x-4 gap-y-12 lg:grid-cols-4">
              <div>
                <JssRichText field={props.fields.AddressInfo} />
              </div>
              <div>
                <Placeholder
                  name={`footer-column-one-${props?.params?.DynamicPlaceholderId}`}
                  rendering={props.rendering}
                />
              </div>
              <div>
                <Placeholder
                  name={`footer-column-two-${props?.params?.DynamicPlaceholderId}`}
                  rendering={props.rendering}
                />
              </div>
              <div>
                <JssRichText field={props.fields.WorkingHours} />
              </div>
            </div>
          </div>
        </div>
      )}
      {isBottomSectionVisible && (
        <div className="container py-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="mr-auto">
              <p>
                <JssText field={props.fields.Copyright} />
              </p>
            </div>

            <div className="flex flex-wrap gap-4 lg:mx-8">
              <JssLink field={props.fields.TermsOfUse} />
              <JssLink field={props.fields.PrivacyPolicy} />
            </div>

            <div className="flex gap-2">
              <JssLink field={props.fields.FbLink} className="social-icon">
                <FontAwesomeIcon icon={faFacebook} width={16} height={16} />
              </JssLink>
              <JssLink field={props.fields.TwitterLink} className="social-icon">
                <FontAwesomeIcon icon={faTwitter} width={14} height={14} />
              </JssLink>
              <JssLink field={props.fields.InstagramLink} className="social-icon">
                <FontAwesomeIcon icon={faInstagram} width={14} height={14} />
              </JssLink>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export const Default = withDatasourceCheck()<FooterProps>(DefaultFooter);