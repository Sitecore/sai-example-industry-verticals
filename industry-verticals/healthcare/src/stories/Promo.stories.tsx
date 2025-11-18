import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default, WithPlaceholder } from '../components/promo/Promo';
import { ComponentProps } from 'react';
import { renderStorybookPlaceholder } from 'src/stories/helpers/renderStorybookPlaceholder';
import { boolToSitecoreCheckbox } from 'src/stories/helpers/boolToSitecoreCheckbox';
import { CommonParams, CommonRendering } from './common/commonData';
import { AppearanceArgs, appearanceArgTypes, defaultAppearanceArgs } from './common/commonControls';
import {
  createIGQLField,
  createImageField,
  createLinkField,
  createRichTextField,
  createTextField,
} from './helpers/createFields';
import { createIGQLData } from './helpers/createIGQLData';
import { createFeatureItems } from './helpers/createItems';
import { ComponentFields } from '@sitecore-content-sdk/nextjs';

type StoryProps = ComponentProps<typeof Default> &
  AppearanceArgs & {
    Layout: string;
  };

const meta = {
  title: 'Page Content/Promo',
  component: Default,
  tags: ['autodocs'],
  argTypes: {
    ...appearanceArgTypes,
    Layout: {
      control: 'check',
      options: ['Reversed'],
      mapping: {
        Reversed: 'promo-reversed',
      },
    },
  },
  args: {
    Layout: '',
    ...defaultAppearanceArgs,
  },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseFields = {
  PromoTitle: createTextField('About us'),
  PromoImage: createImageField(),
  PromoLink: createLinkField('Get Started'),
  PromoText: createRichTextField(2),
};

const baseParams = CommonParams;

const baseRendering = {
  ...CommonRendering,
  componentName: 'Promo',
  params: baseParams,
};

export const DefaultPromo: Story = {
  args: {
    Layout: 'Reversed',
    CurvedTop: true,
  },
  render: (args) => {
    return (
      <Default
        fields={baseFields}
        rendering={baseRendering}
        params={{
          ...baseParams,
          CurvedTop: boolToSitecoreCheckbox(args.CurvedTop),
          CurvedBottom: boolToSitecoreCheckbox(args.CurvedBottom),
          BlobAccent: boolToSitecoreCheckbox(args.BlobAccent),
          styles: `${baseParams.styles} ${args.Layout} ${args.BackgroundColor}`,
        }}
      />
    );
  },
};

export const WithPlaceholderPromo: Story = {
  args: {
    CurvedBottom: true,
    BlobAccent: true,
  },
  render: (args) => {
    return (
      <WithPlaceholder
        fields={baseFields}
        rendering={{
          ...baseRendering,
          placeholders: {
            [`promo-content-${baseParams.DynamicPlaceholderId}`]: [renderStorybookPlaceholder()],
          },
        }}
        params={{
          ...baseParams,
          CurvedTop: boolToSitecoreCheckbox(args.CurvedTop),
          CurvedBottom: boolToSitecoreCheckbox(args.CurvedBottom),
          BlobAccent: boolToSitecoreCheckbox(args.BlobAccent),
          styles: `${baseParams.styles} ${args.Layout} ${args.BackgroundColor}`,
        }}
      />
    );
  },
};

export const WithPlaceholderContent: Story = {
  args: {
    CurvedBottom: true,
    BlobAccent: true,
  },
  render: (args) => {
    return (
      <WithPlaceholder
        fields={baseFields}
        rendering={{
          ...baseRendering,
          placeholders: {
            [`promo-content-${baseParams.DynamicPlaceholderId}`]: [
              {
                ...CommonRendering,
                componentName: 'Features',
                params: {
                  ...CommonParams,
                  FieldNames: 'Simple',
                },
                fields: createIGQLData({
                  createItems: createFeatureItems,
                  count: 3,
                  topLevelFields: {
                    heading: createIGQLField(createTextField('Our Special Services')),
                    body: createIGQLField(createRichTextField(1)),
                  },
                }) as unknown as ComponentFields,
              },
            ],
          },
        }}
        params={{
          ...baseParams,
          CurvedTop: boolToSitecoreCheckbox(args.CurvedTop),
          CurvedBottom: boolToSitecoreCheckbox(args.CurvedBottom),
          BlobAccent: boolToSitecoreCheckbox(args.BlobAccent),
          styles: `${baseParams.styles} ${args.Layout} ${args.BackgroundColor}`,
        }}
      />
    );
  },
};