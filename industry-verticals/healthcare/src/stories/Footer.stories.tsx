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
  LogoLight: createImageField('placeholder'),
  LogoDark: createImageField('placeholder'),
  AddressInfo: createRichTextField(),
  WorkingHours: createRichTextField(),
  Copyright: createTextField('Copyright © 2024. All Rights Reserved.'),
  TermsOfUse: createLinkField('Terms of Use'),
  PrivacyPolicy: createLinkField('Privacy Policy'),
  FbLink: createLinkField('logo'),
  TwitterLink: createLinkField('logo'),
  InstagramLink: createLinkField('logo'),
};

const LinkListRendering = {
  ...CommonRendering,
  componentName: 'LinkList',
  params: {
    ...CommonParams,
    Styles: 'list-vertical',
  },
  fields: createIGQLData({
    createItems: createLinkItems,
    count: 4,
    topLevelFields: {},
  }) as unknown as ComponentFields,
};

export const Default: Story = {
  render: () => {
    return (
      <Footer
        params={baseParams}
        rendering={{
          ...baseRendering,
          placeholders: {
            [`footer-column-one-${baseParams.DynamicPlaceholderId}`]: [
              renderStorybookPlaceholder(),
            ],
            [`footer-column-two-${baseParams.DynamicPlaceholderId}`]: [
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
  render: () => {
    return (
      <Footer
        params={baseParams}
        rendering={{
          ...baseRendering,
          placeholders: {
            [`footer-column-one-${baseParams.DynamicPlaceholderId}`]: [LinkListRendering],
            [`footer-column-two-${baseParams.DynamicPlaceholderId}`]: [LinkListRendering],
          },
        }}
        fields={baseFields}
      />
    );
  },
};
