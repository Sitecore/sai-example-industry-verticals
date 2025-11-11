import { CommonParams, CommonRendering } from './common/commonData';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ComponentProps } from 'react';
import { Default, FourColGrid } from '@/components/features/Features';
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

type StoryProps = ComponentProps<typeof Default> & BackgroundColorArgs;

const meta = {
  title: 'Page Content/Features',
  component: Default,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    ...backgroundColorArgTypes,
  },
  args: {
    ...defaultBackgroundColorArgs,
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
          styles: `${baseParams.styles}
            ${args.BackgroundColor}
          `,
        }}
        fields={createIGQLData({
          count: 3,
          topLevelFields: {
            title: createIGQLField(createTextField('Features Title')),
            description: createIGQLField(createTextField('Features Description')),
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
            description: createIGQLField(createTextField('Features Description')),
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
