'use client';

import React from 'react';
import {
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  Text as ContentSdkText,
  ImageField,
  LinkField,
  ComponentRendering,
  ComponentParams,
  Placeholder,
  RichTextField,
  withDatasourceCheck,
  TextField,
  Text,
} from '@sitecore-content-sdk/nextjs';
import Link from 'next/link';
import { CommonStyles } from '@/types/styleFlags';

interface Fields {
  Logo: ImageField;
  LogoDark: ImageField;
  CopyrightText: RichTextField;
  PolicyText: LinkField;
  TermsText: LinkField;
  TitleOne: TextField;
  TitleTwo: TextField;
  TitleThree: TextField;
  TitleFour: TextField;
}

type FooterProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const DefaultFooter = (props: FooterProps) => {
  const id = props.params.RenderingIdentifier;

  // placeholders keys
  const phKeyOne = `footer-list-first-${props?.params?.DynamicPlaceholderId}`;
  const phKeyTwo = `footer-list-second-${props?.params?.DynamicPlaceholderId}`;
  const phKeyThree = `footer-list-third-${props?.params?.DynamicPlaceholderId}`;
  const phKeyFour = `footer-list-fourth-${props?.params?.DynamicPlaceholderId}`;
  const phKeyFive = `footer-list-fifth-${props?.params?.DynamicPlaceholderId}`;

  // footer sections data
  const sections = [
    {
      key: 'first_nav',
      title: <Text field={props.fields.TitleOne} />,
      content: <Placeholder name={phKeyOne} rendering={props.rendering} />,
    },
    {
      key: 'second_nav',
      title: <Text field={props.fields.TitleTwo} />,
      content: <Placeholder name={phKeyTwo} rendering={props.rendering} />,
    },
    {
      key: 'third_nav',
      title: <Text field={props.fields.TitleThree} />,
      content: <Placeholder name={phKeyThree} rendering={props.rendering} />,
    },
    {
      key: 'fourth_nav',
      title: <Text field={props.fields.TitleFour} />,
      content: <Placeholder name={phKeyFour} rendering={props.rendering} />,
    },
  ];

  // styles to hide and show sections
  const hideTopSection = props.params?.Styles?.includes(CommonStyles.HideTopSection) || undefined;
  const hideBottomSection =
    props.params?.Styles?.includes(CommonStyles.HideBottomSection) || undefined;

  return (
    <section className={`relative ${props.params.styles} overflow-hidden`} id={id ? id : undefined}>
      {/* footer top section */}
      {!hideTopSection && (
        <div className="bg-background-secondary dark:bg-background-secondary-dark pt-24 pb-16">
          {/* svg accent background */}
          <div className="text-background dark:text-background-dark pointer-events-none absolute -top-px -right-px left-0 leading-none">
            <svg
              viewBox="0 0 1613.26 511.77"
              xmlns="http://www.w3.org/2000/svg"
              className="h-auto w-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0V319.73H.02c.95-649,1546.56-112.85,1611.06-90.19h1.67V0H0Z"
                fill="currentColor"
              />
            </svg>
          </div>
          {/* footer top section */}
          <div className="relative z-20 container">
            {/* logo section */}
            <Link href={'/'} className="mb-12 inline-block max-w-50">
              <ContentSdkImage
                field={props.fields.Logo}
                width={345}
                height={45}
                className="dark:hidden"
                priority
              />
              <ContentSdkImage
                field={props.fields.LogoDark}
                width={345}
                height={45}
                className="hidden dark:block"
                priority
              />
            </Link>
            {/* content section */}
            <div className="grid gap-x-4 gap-y-12 lg:grid-cols-4">
              {sections.map(({ key, title, content }) => (
                <div key={key}>
                  <div className="mb-8 text-lg font-bold">{title}</div>
                  <div>{content}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* footer bottom section */}
      {!hideBottomSection && (
        <div className="container py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            {/* copyright section */}
            <div className="mr-auto">
              <p>
                <ContentSdkText field={props.fields.CopyrightText} />
              </p>
            </div>

            {/* policy and terms section */}
            <div className="flex flex-wrap gap-4 lg:mx-8">
              <ContentSdkLink field={props.fields.TermsText} />
              <ContentSdkLink field={props.fields.PolicyText} />
            </div>

            {/* social icons section */}
            <div>
              <Placeholder name={phKeyFive} rendering={props.rendering} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export const Default = withDatasourceCheck()<FooterProps>(DefaultFooter);
