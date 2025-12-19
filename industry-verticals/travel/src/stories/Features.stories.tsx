import { CommonParams, CommonRendering } from './common/commonData';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ComponentProps } from 'react';
import {
  Default as FeaturesDefault,
  Card as FeaturesCard,
  LargeImage as FeaturesLargeImage,
  Simple as FeaturesSimple,
  Stats as FeaturesStats,
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

type StoryProps = ComponentProps<typeof FeaturesDefault> &
  BackgroundColorArgs & {
    numberOfItems: number;
    hideTitleSection?: boolean;
  };

const meta = {
  title: 'Page Content/Features',
  component: FeaturesDefault,
  tags: ['autodocs'],
  argTypes: {
    ...backgroundColorArgTypes,
    numberOfItems: {
      name: 'Number of Features',
      control: {
        type: 'range',
        min: 1,
        max: 12,
        step: 1,
      },
    },
    hideTitleSection: {
      name: 'Hide Title Section',
      control: { type: 'boolean' },
      defaultValue: false,
    },
  },
  args: {
    ...defaultBackgroundColorArgs,
    numberOfItems: 4,
    hideTitleSection: false,
  },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'Features',
  params: baseParams,
};

export const Default: Story = {
  render: (args) => {
    return (
      <FeaturesDefault
        rendering={baseRendering}
        params={{
          ...baseParams,
          styles: `${baseParams.styles}
            ${args.BackgroundColor} ${args.hideTitleSection ? 'hide-title-section' : ''}
          `,
        }}
        fields={createIGQLData({
          count: args.numberOfItems,
          topLevelFields: {
            title: createIGQLField(createTextField('Why Choose Skywings?')),
            description: createIGQLField(
              createTextField('Experience the difference with our premium services')
            ),
          },
          createItems: (count) =>
            Array.from({ length: count }, () => ({
              featureTitle: createIGQLField(createTextField('Feature Title')),
              featureDescription: createIGQLField(createTextField('Feature Description')),
              featureImage: createIGQLField(createImageField('icon')),
              featureLink: createIGQLField(createLinkField('')),
            })),
        })}
      />
    );
  },
};

export const Simple: Story = {
  args: {
    numberOfItems: 6,
  },
  render: (args) => {
    return (
      <FeaturesSimple
        rendering={baseRendering}
        params={{
          ...baseParams,
          styles: `${baseParams.styles}
            ${args.BackgroundColor} ${args.hideTitleSection ? 'hide-title-section' : ''}
          `,
        }}
        fields={createIGQLData({
          count: args.numberOfItems,
          topLevelFields: {
            title: createIGQLField(createTextField('Why Choose Skywings?')),
            description: createIGQLField(
              createTextField('Experience the difference with our premium services')
            ),
          },
          createItems: (count) =>
            Array.from({ length: count }, () => ({
              featureTitle: createIGQLField(createTextField('Feature Title')),
              featureDescription: createIGQLField(createTextField('')),
              featureImage: createIGQLField(createImageField('icon')),
              featureLink: createIGQLField(createLinkField('')),
            })),
        })}
      />
    );
  },
};

export const Stats: Story = {
  render: (args) => {
    return (
      <FeaturesStats
        rendering={baseRendering}
        params={{
          ...baseParams,
          styles: `${baseParams.styles}
            ${args.BackgroundColor} ${args.hideTitleSection ? 'hide-title-section' : ''}
          `,
        }}
        fields={createIGQLData({
          count: args.numberOfItems,
          topLevelFields: {
            title: createIGQLField(createTextField('Why Choose Skywings?')),
            description: createIGQLField(
              createTextField('Experience the difference with our premium services')
            ),
          },
          createItems: (count) =>
            Array.from({ length: count }, () => ({
              featureTitle: createIGQLField(createTextField('100%')),
              featureDescription: createIGQLField(createTextField('Client Satisfaction')),
              featureImage: createIGQLField(createImageField()),
              featureLink: createIGQLField(createLinkField('')),
            })),
        })}
      />
    );
  },
};

export const Card: Story = {
  args: {
    numberOfItems: 3,
  },
  render: (args) => {
    return (
      <FeaturesCard
        rendering={baseRendering}
        params={{
          ...baseParams,
          styles: `${baseParams.styles}
            ${args.BackgroundColor} ${args.hideTitleSection ? 'hide-title-section' : ''}
          `,
        }}
        fields={createIGQLData({
          count: args.numberOfItems,
          topLevelFields: {
            title: createIGQLField(createTextField('Why Choose Skywings?')),
            description: createIGQLField(
              createTextField('Experience the difference with our premium services')
            ),
          },
          createItems: (count) =>
            Array.from({ length: count }, () => ({
              featureTitle: createIGQLField(createTextField('Feature Title')),
              featureDescription: createIGQLField(createTextField(undefined, 2)),
              featureImage: createIGQLField(createImageField()),
              featureLink: createIGQLField(createLinkField('')),
            })),
        })}
      />
    );
  },
};

export const LargeImage: Story = {
  args: {
    numberOfItems: 2,
  },
  render: (args) => {
    return (
      <FeaturesLargeImage
        rendering={baseRendering}
        params={{
          ...baseParams,
          styles: `${baseParams.styles}
            ${args.BackgroundColor} ${args.hideTitleSection ? 'hide-title-section' : ''}
          `,
        }}
        fields={createIGQLData({
          count: args.numberOfItems,
          topLevelFields: {
            title: createIGQLField(createTextField('Why Choose Skywings?')),
            description: createIGQLField(
              createTextField('Experience the difference with our premium services')
            ),
          },
          createItems: (count) =>
            Array.from({ length: count }, () => ({
              featureTitle: createIGQLField(createTextField('Feature Title')),
              featureDescription: createIGQLField(
                createTextField('Feature description goes here.')
              ),
              featureImage: createIGQLField(createImageField()),
              featureLink: createIGQLField(createLinkField('')),
            })),
        })}
      />
    );
  },
};
