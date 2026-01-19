import React, { JSX } from 'react';
import {
  ComponentParams,
  ComponentRendering,
  ImageField,
  LinkField,
  Placeholder,
  RichTextField,
  TextField,
  Text as ContentSdkText,
  Link as ContentSdkLink,
  RichText,
  NextImage as ContentSdkImage,
} from '@sitecore-content-sdk/nextjs';

interface Fields {
  TitleOne: TextField;
  TitleTwo: TextField;
  TitleThree: TextField;
  CopyrightText: TextField;
  PolicyText: LinkField;
  CookiesText: LinkField;
  ContactText: LinkField;
  TermsText: LinkField;
  Logo: ImageField;
  Description: RichTextField;
}

type FooterProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const Footer = (props: FooterProps): JSX.Element => {
  // styles
  const sxaStyles = `${props.params?.styles || ''}`;

  // rendering item id
  const id = props.params.RenderingIdentifier;

  // placeholders keys
  const phKeyOne = `footer-list-first-${props?.params?.DynamicPlaceholderId}`;
  const phKeyTwo = `footer-list-second-${props?.params?.DynamicPlaceholderId}`;
  const phKeyThree = `footer-list-third-${props?.params?.DynamicPlaceholderId}`;
  const phKeyFour = `footer-list-fourth-${props?.params?.DynamicPlaceholderId}`;

  const sections = [
    {
      key: 'first_nav',
      title: <ContentSdkText field={props.fields.TitleOne} />,
      content: <Placeholder name={phKeyOne} rendering={props.rendering} />,
    },
    {
      key: 'second_nav',
      title: <ContentSdkText field={props.fields.TitleTwo} />,
      content: <Placeholder name={phKeyTwo} rendering={props.rendering} />,
    },
    {
      key: 'third_nav',
      title: <ContentSdkText field={props.fields.TitleThree} />,
      content: <Placeholder name={phKeyThree} rendering={props.rendering} />,
    },
  ];

  return (
    <div className={`bg-foreground py-12 text-white ${sxaStyles}`} id={id}>
      <div className="container mx-auto">
        {/* content section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* footer content data */}
          <div>
            <div className="mb-4 flex max-w-40 space-x-2">
              <ContentSdkImage field={props.fields.Logo} width={200} />
            </div>
            <div className="**:text-foreground-secondary mb-4">
              <RichText field={props.fields.Description} />
            </div>
            <Placeholder name={phKeyFour} rendering={props.rendering} />
          </div>

          {/* footer link lists */}
          {sections.map(({ key, title, content }) => (
            <div key={key}>
              <div className="mb-4 text-lg font-semibold">{title}</div>
              <div className="text-foreground-secondary">{content}</div>
            </div>
          ))}
        </div>

        {/* seperator */}
        <hr className="border-foreground-light my-8" />

        {/* copyright section */}
        <div className="flex flex-col items-center justify-between md:flex-row">
          <p className="text-foreground-secondary order-2 mt-8 text-sm md:order-1 md:mt-0">
            <ContentSdkText field={props.fields.CopyrightText} />
          </p>
          <div className="mt-4 grid grid-cols-2 justify-between gap-6 md:order-2 md:mt-0 md:flex">
            <ContentSdkLink
              className="text-foreground-secondary hover:text-background text-sm"
              field={props.fields.PolicyText}
            />
            <ContentSdkLink
              className="text-foreground-secondary hover:text-background text-sm"
              field={props.fields.TermsText}
            />
            <ContentSdkLink
              className="text-foreground-secondary hover:text-background text-sm"
              field={props.fields.CookiesText}
            />
            <ContentSdkLink
              className="text-foreground-secondary hover:text-background text-sm"
              field={props.fields.ContactText}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Default = Footer;
