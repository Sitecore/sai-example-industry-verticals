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

type StoryProps = ComponentProps<typeof Footer>;

const meta = {
  title: 'Global Elements/Footer',
  component: Footer,
  tags: ['autodocs'],
} satisfies Meta<StoryProps>;
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
  TitleOne: createTextField('Furniture'),
  TitleTwo: createTextField('Services'),
  TitleThree: createTextField('Support'),
  TitleFour: createTextField('Follow Us'),
  TitleFive: createTextField('Install App'),
  CopyrightText: createTextField('Copyright © 2025'),
  PolicyText: createLinkField('Privacy Policy'),
  TermsText: createLinkField('Terms & Conditions'),
  Description: createRichTextField(),
  Logo: createImageField('logo'),
};

const baseLinkList = {
  componentName: 'LinkList',
  dataSource: '',
  params: {
    ...baseParams,
    Styles: 'list-vertical',
  },
  fields: createIGQLData({
    createItems: createLinkItems,
    count: 3,
    topLevelFields: {},
  }),
  placeholders: {},
};

const baseRichText = {
  componentName: 'RichText',
  dataSource: '',
  params: baseParams,
  fields: {
    Text: createRichTextField(1),
  },
  placeholders: {},
};

const baseContainer = {
  componentName: 'Container',
  dataSource: '',
  params: baseParams,
  fields: baseFields,
  placeholders: {
    'container-{*}': [baseRichText, baseRichText],
  },
};

const baseSocialFollowFields = {
  FacebookLink: createLinkField('Facebook'),
  InstagramLink: createLinkField('Instagram'),
  TwitterLink: createLinkField('Twitter'),
  PinterestLink: createLinkField('Pinterest'),
};

const baseSocialFollow = {
  componentName: 'SocialFollow',
  dataSource: '',
  params: baseParams,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: baseSocialFollowFields as any,
  placeholders: {},
};

export const WithPlaceholders: Story = {
  render: () => {
    return (
      <Footer
        params={baseParams}
        rendering={{
          ...baseRendering,
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
            [`footer-list-fifth-${baseParams.DynamicPlaceholderId}`]: [
              renderStorybookPlaceholder(),
            ],
          },
        }}
        fields={baseFields}
      />
    );
  },
};

export const WithData: Story = {
  render: () => {
    return (
      <Footer
        params={baseParams}
        rendering={{
          ...baseRendering,
          placeholders: {
            [`footer-list-first-${baseParams.DynamicPlaceholderId}`]: [baseLinkList],
            [`footer-list-second-${baseParams.DynamicPlaceholderId}`]: [baseLinkList],
            [`footer-list-third-${baseParams.DynamicPlaceholderId}`]: [baseLinkList],
            [`footer-list-fourth-${baseParams.DynamicPlaceholderId}`]: [baseSocialFollow],
            [`footer-list-fifth-${baseParams.DynamicPlaceholderId}`]: [baseContainer],
          },
        }}
        fields={baseFields}
      />
    );
  },
};
