import { CommonParams, CommonRendering } from './common/commonData';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ComponentProps } from 'react';
import {
  Default,
  FourColGrid,
  ImageGrid,
  NumberedGrid,
  ThreeColGridCentered,
} from '@/components/features/Features';
import { createIGQLData } from './helpers/createIGQLData';
import {
  createIGQLField,
  createImageField,
  createLinkField,
  createTextField,
} from './helpers/createFields';
import {
  BackgroundColorArgs,
  backgroundColorArgTypes,
  defaultBackgroundColorArgs,
} from './common/commonControls';
import { boolToSitecoreCheckbox } from './helpers/boolToSitecoreCheckbox';
import { CommonStyles } from '@/types/styleFlags';
import clsx from 'clsx';

type StoryProps = ComponentProps<typeof Default> &
  BackgroundColorArgs & {
    hideAccentLine?: boolean;
  };

const meta = {
  title: 'Page Content/Features',
  component: Default,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    ...backgroundColorArgTypes,
    hideAccentLine: {
      name: 'Hide Accent Line',
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
  },
  args: {
    ...defaultBackgroundColorArgs,
    hideAccentLine: false,
  },
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

export const FeatureDefault: Story = {
  render: (args) => {
    return (
      <Default
        rendering={baseRendering}
        params={{
          ...baseParams,
          HideAccentLine: boolToSitecoreCheckbox(args.hideAccentLine),
          styles: clsx(
            baseParams.styles,
            args.BackgroundColor,
            args.hideAccentLine && CommonStyles.HideAccentLine
          ),
        }}
        fields={createIGQLData({
          count: 3,
          topLevelFields: {
            title: createIGQLField(createTextField('Features Title')),
          },
          createItems: (count) =>
            Array.from({ length: count }, () => ({
              featureTitle: createIGQLField(createTextField('Title')),
              featureDescription: createIGQLField(createTextField()),
              featureImage: createIGQLField(createImageField('placeholder')),
              featureLink: createIGQLField(createLinkField('More Info')),
            })),
        })}
      />
    );
  },
};

export const FeatureImageGrid: Story = {
  render: (args) => {
    return (
      <ImageGrid
        rendering={baseRendering}
        params={{
          ...baseParams,
          styles: `${baseParams.styles}
            ${args.BackgroundColor}
          `,
        }}
        fields={createIGQLData({
          count: 5,
          topLevelFields: {
            title: createIGQLField(createTextField('Features Title')),
          },
          createItems: (count) =>
            Array.from({ length: count }, () => ({
              featureTitle: createIGQLField(createTextField('Title')),
              featureDescription: createIGQLField(createTextField('Description')),
              featureImage: createIGQLField(createImageField('placeholder')),
              featureLink: createIGQLField(createLinkField('More Info')),
            })),
        })}
      />
    );
  },
};

export const FeatureNumberedGrid: Story = {
  render: (args) => {
    return (
      <NumberedGrid
        rendering={baseRendering}
        params={{
          ...baseParams,
          styles: `${baseParams.styles}
            ${args.BackgroundColor}
          `,
        }}
        fields={createIGQLData({
          count: 3,
          topLevelFields: {
            title: createIGQLField(createTextField('Features Title')),
          },
          createItems: (count) =>
            Array.from({ length: count }, () => ({
              featureTitle: createIGQLField(createTextField('Title')),
              featureDescription: createIGQLField(createTextField()),
              featureImage: createIGQLField(createImageField('placeholder')),
              featureLink: createIGQLField(createLinkField('More Info')),
            })),
        })}
      />
    );
  },
};

export const FeatureThreeColGridCentered: Story = {
  render: (args) => {
    return (
      <ThreeColGridCentered
        rendering={baseRendering}
        params={{
          ...baseParams,
          styles: `${baseParams.styles}
            ${args.BackgroundColor}
          `,
        }}
        fields={createIGQLData({
          count: 3,
          topLevelFields: {
            title: createIGQLField(createTextField('Features Title')),
          },
          createItems: (count) =>
            Array.from({ length: count }, () => ({
              featureTitle: createIGQLField(createTextField('Title')),
              featureDescription: createIGQLField(createTextField('Description')),
              featureImage: createIGQLField(createImageField('placeholder')),
              featureLink: createIGQLField(createLinkField('More Info')),
            })),
        })}
      />
    );
  },
};

export const FeatureFourColGrid: Story = {
  render: (args) => {
    return (
      <FourColGrid
        rendering={baseRendering}
        params={{
          ...baseParams,
          styles: `${baseParams.styles}
            ${args.BackgroundColor}
          `,
        }}
        fields={createIGQLData({
          count: 4,
          topLevelFields: {
            title: createIGQLField(createTextField('Features Title')),
          },
          createItems: (count) =>
            Array.from({ length: count }, () => ({
              featureTitle: createIGQLField(createTextField('Title')),
              featureDescription: createIGQLField(createTextField('Description')),
              featureImage: createIGQLField(createImageField('placeholder')),
              featureLink: createIGQLField(createLinkField('More Info')),
            })),
        })}
      />
    );
  },
};
