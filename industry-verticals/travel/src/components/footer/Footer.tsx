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
  Image as ContentSdkImage,
} from '@sitecore-content-sdk/nextjs';

interface Fields {
  TitleOne: TextField;
  TitleTwo: TextField;
  TitleThree: TextField;
  CopyrightText: TextField;
  PolicyText: LinkField;
  CookiesText: LinkField;
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

  console.log(props);

  return (
    <footer className={`bg-gray-900 py-12 text-white ${sxaStyles}`} id={id}>
      <div className="container mx-auto">
        
        {/* content section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* footer content data */}
          <div>
            <div className="flex space-x-2 mb-4 max-w-40">
              <ContentSdkImage field={props.fields.Logo} />
            </div>
            <p className="text-sm [&_*]:text-gray-400 mb-4">
              <RichText field={props.fields.Description} />
            </p>
            <Placeholder name={phKeyFour} rendering={props.rendering} />
          </div>

          {/* footer link lists */}
          {sections.map(({ key, title, content }) => (
            <div key={key}>
              <div className="text-lg font-semibold mb-4">{title}</div>
              <div>{content}</div>
            </div>
          ))}
        </div>

        {/* seperator */}
        <hr className="my-8 bg-gray-700" />

        {/* copyright section */}
        <div className="flex flex-col items-center justify-between md:flex-row">
          <p className="text-sm text-gray-400">
            <ContentSdkText field={props.fields.CopyrightText} />
          </p>
          <div className="mt-4 flex justify-between gap-6 md:mt-0">
            <ContentSdkLink
              className="text-sm text-gray-400 hover:text-white"
              field={props.fields.PolicyText}
            />
            <ContentSdkLink
              className="text-sm text-gray-400 hover:text-white"
              field={props.fields.TermsText}
            />
            <ContentSdkLink
              className="text-sm text-gray-400 hover:text-white"
              field={props.fields.CookiesText}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Default = Footer;
