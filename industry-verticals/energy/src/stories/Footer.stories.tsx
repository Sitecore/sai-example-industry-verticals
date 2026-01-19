import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as Footer } from '../components/footer/Footer';
import { ComponentProps } from 'react';
import { renderStorybookPlaceholder } from './helpers/renderStorybookPlaceholder';
import { CommonParams, CommonRendering } from './common/commonData';
import {
  createImageField,
  createLinkField,
  createRichTextField,
  createTextField,
} from './helpers/createFields';
import { createIGQLData } from './helpers/createIGQLData';
import { createLinkItems } from './helpers/createItems';
import { ComponentFields } from '@sitecore-content-sdk/nextjs';
import clsx from 'clsx';

type StoryProps = ComponentProps<typeof Footer> & {
  hideTopSection?: boolean;
  hideBottomSection?: boolean;
};

const meta = {
  title: 'Global Components/Footer',
  component: Footer,
  tags: ['autodocs'],
} satisfies Meta<
  StoryProps & {
    hideTopSection: boolean;
    hideBottomSection: boolean;
  }
>;

export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'Container',
  params: baseParams,
};

const baseFields = {
  TitleOne: createTextField('About Gridwell'),
  TitleTwo: createTextField('Contact'),
  TitleThree: createTextField('Quick Links'),
  CopyrightText: createTextField('© 2025 Gridwell. All rights reserved.'),
  PolicyText: createLinkField('Privacy'),
  TermsText: createLinkField('Terms'),
  CookiesText: createLinkField('Cookies'),
  ContactText: createLinkField('Contact Us'),
  Description: createRichTextField(1),
  Logo: createImageField('logo'),
  LogoDark: createImageField('logo'),
};

const SocialFollowRendering = {
  ...CommonRendering,
  componentName: 'SocialFollow',
  params: CommonParams,
  fields: {
    FacebookLink: createLinkField('Facebook'),
    InstagramLink: createLinkField('Instagram'),
    TwitterLink: createLinkField('Twitter'),
    YoutubeLink: createLinkField('Youtube'),
  } as unknown as ComponentFields,
};

const LinkListRendering = {
  ...CommonRendering,
  componentName: 'LinkList',
  params: {
    ...CommonParams,
    Styles: 'list-vertical',
  },
  fields: createIGQLData({
    count: 3,
    topLevelFields: {},
    createItems: createLinkItems,
  }) as unknown as ComponentFields,
};

export const Default: Story = {
  args: {
    hideTopSection: false,
    hideBottomSection: false,
  },

  render: () => {
    const styles = clsx(baseParams.Styles);

    const params = {
      ...baseParams,
      Styles: styles,
    };

    return (
      <Footer
        params={params}
        rendering={{
          ...baseRendering,
          params,
          placeholders: {
            [`footer-list-first-${baseParams.DynamicPlaceholderId}`]: [
              renderStorybookPlaceholder(),
            ],
            [`footer-list-second-${baseParams.DynamicPlaceholderId}`]: [
              renderStorybookPlaceholder(),
            ],
            [`footer-list-third-${baseParams.DynamicPlaceholderId}`]: [
              renderStorybookPlaceholder(),
            ],
            [`footer-list-fourth-${baseParams.DynamicPlaceholderId}`]: [
              renderStorybookPlaceholder(),
            ],
          },
        }}
        fields={baseFields}
      />
    );
  },
};

export const WithPlaceholderData: Story = {
  args: {
    hideTopSection: false,
    hideBottomSection: false,
  },

  render: () => {
    const styles = clsx(baseParams.Styles);

    const params = {
      ...baseParams,
      Styles: styles,
    };

    return (
      <Footer
        params={params}
        rendering={{
          ...baseRendering,
          params,
          placeholders: {
            [`footer-list-first-${baseParams.DynamicPlaceholderId}`]: [LinkListRendering],
            [`footer-list-second-${baseParams.DynamicPlaceholderId}`]: [LinkListRendering],
            [`footer-list-third-${baseParams.DynamicPlaceholderId}`]: [LinkListRendering],
            [`footer-list-fourth-${baseParams.DynamicPlaceholderId}`]: [SocialFollowRendering],
          },
        }}
        fields={baseFields}
      />
    );
  },
};
