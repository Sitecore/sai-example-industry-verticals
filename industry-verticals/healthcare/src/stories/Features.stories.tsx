import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default, Simple } from '../components/features/Features';
import { ComponentProps } from 'react';
import { CommonParams, CommonRendering } from './common/commonData';
import {
  BackgroundColorArgs,
  backgroundColorArgTypes,
  BlobAccentArgs,
  blobAccentArgTypes,
  defaultBackgroundColorArgs,
  defaultBlobAccentArgs,
} from './common/commonControls';
import { createFeatureItems } from './helpers/createItems';
import { boolToSitecoreCheckbox } from './helpers/boolToSitecoreCheckbox';
import { createIGQLData } from './helpers/createIGQLData';
import { createIGQLField, createRichTextField, createTextField } from './helpers/createFields';

type StoryProps = ComponentProps<typeof Default> &
  BackgroundColorArgs &
  BlobAccentArgs & {
    numberOfItems: number;
  };

const meta = {
  title: 'Page Content/Features',
  component: Default,
  tags: ['autodocs'],
  argTypes: {
    ...backgroundColorArgTypes,
    ...blobAccentArgTypes,
    numberOfItems: {
      name: 'Number of features',
      control: {
        type: 'range',
        min: 1,
        max: 21,
        step: 1,
      },
    },
  },
  args: {
    numberOfItems: 3,
    ...defaultBackgroundColorArgs,
    ...defaultBlobAccentArgs,
  },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = CommonParams;

const baseRendering = {
  ...CommonRendering,
  componentName: 'Features',
  params: CommonParams,
};

export const DefaultFeatures: Story = {
  render: (args) => {
    return (
      <Default
        fields={createIGQLData({
          createItems: createFeatureItems,
          count: args.numberOfItems,
          topLevelFields: {
            heading: createIGQLField(createTextField('Our Special Services')),
            body: createIGQLField(createRichTextField(1)),
          },
        })}
        params={{
          ...baseParams,
          BlobAccent: boolToSitecoreCheckbox(args.BlobAccent),
          styles: `${baseParams.styles} ${args.BackgroundColor}`,
        }}
        rendering={baseRendering}
      />
    );
  },
};

export const SimpleFeatures: Story = {
  parameters: {
    layout: 'padded',
  },
  render: (args) => {
    return (
      <Simple
        fields={createIGQLData({
          createItems: createFeatureItems,
          count: args.numberOfItems,
          topLevelFields: {
            heading: createIGQLField(createTextField('Our Special Services')),
            body: createIGQLField(createRichTextField(1)),
          },
        })}
        params={{
          ...baseParams,
          BlobAccent: boolToSitecoreCheckbox(args.BlobAccent),
          styles: `${baseParams.styles} ${args.BackgroundColor}`,
        }}
        rendering={baseRendering}
      />
    );
  },
};
