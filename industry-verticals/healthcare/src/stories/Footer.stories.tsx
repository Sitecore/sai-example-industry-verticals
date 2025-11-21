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
import { CommonStyles } from '@/types/styleFlags';

type StoryProps = ComponentProps<typeof Footer> & {
  hideTopSection?: boolean;
  hideBottomSection?: boolean;
};

const meta = {
  title: 'Global Components/Footer',
  component: Footer,
  tags: ['autodocs'],
  argTypes: {
    hideTopSection: {
      name: 'Hide Top Section',
      control: 'boolean',
      description: 'Hide the top section',
      defaultValue: false,
    },
    hideBottomSection: {
      name: 'Hide Bottom Section',
      control: 'boolean',
      description: 'Hide the bottom section',
      defaultValue: false,
    },
  },
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
  TitleOne: createTextField('Contact'),
  TitleTwo: createTextField('About us'),
  TitleThree: createTextField('Our Services'),
  TitleFour: createTextField('Hospital Time'),
  CopyrightText: createTextField('Copyright © 2024. All Rights Reserved.'),
  PolicyText: createLinkField('Privacy Policy'),
  TermsText: createLinkField('Terms of Use'),
  Description: createRichTextField(1),
  Logo: createImageField('logo'),
  LogoDark: createImageField('logo'),
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
    count: 3,
    topLevelFields: {},
  }) as unknown as ComponentFields,
};

const SocialFollowRendering = {
  ...CommonRendering,
  componentName: 'SocialFollow',
  params: CommonParams,
  fields: {
    FacebookLink: createLinkField('Facebook'),
    InstagramLink: createLinkField('Instagram'),
    TwitterLink: createLinkField('Twitter'),
  } as unknown as ComponentFields,
};

const RichTextRendering = {
  ...CommonRendering,
  componentName: 'RichText',
  params: CommonParams,
  fields: {
    Text: createRichTextField(),
  } as unknown as ComponentFields,
};

export const Default: Story = {
  args: {
    hideTopSection: false,
    hideBottomSection: false,
  },

  render: ({ hideTopSection, hideBottomSection }) => {
    const styles = clsx(
      baseParams.Styles,
      hideTopSection && CommonStyles.HideTopSection,
      hideBottomSection && CommonStyles.HideBottomSection
    );

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

export const WithPlaceholderData: Story = {
  args: {
    hideTopSection: false,
    hideBottomSection: false,
  },

  render: ({ hideTopSection, hideBottomSection }) => {
    const styles = clsx(
      baseParams.Styles,
      hideTopSection && CommonStyles.HideTopSection,
      hideBottomSection && CommonStyles.HideBottomSection
    );

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
            [`footer-list-first-${baseParams.DynamicPlaceholderId}`]: [RichTextRendering],
            [`footer-list-second-${baseParams.DynamicPlaceholderId}`]: [LinkListRendering],
            [`footer-list-third-${baseParams.DynamicPlaceholderId}`]: [LinkListRendering],
            [`footer-list-fourth-${baseParams.DynamicPlaceholderId}`]: [RichTextRendering],
            [`footer-list-fifth-${baseParams.DynamicPlaceholderId}`]: [SocialFollowRendering],
          },
        }}
        fields={baseFields}
      />
    );
  },
};
