import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default, Simple } from '../components/features/Features';
import { ComponentProps } from 'react';
import { CommonParams, CommonRendering } from './common/commonData';
import {
  BackgroundColorArgs,
  backgroundColorArgTypes,
  defaultBackgroundColorArgs,
} from './common/commonControls';
import { createFeatureItems } from './helpers/createItems';
import { createIGQLData } from './helpers/createIGQLData';
import { createIGQLField, createRichTextField, createTextField } from './helpers/createFields';
import clsx from 'clsx';
import { CommonStyles } from '@/types/styleFlags';

type StoryProps = ComponentProps<typeof Default> &
  BackgroundColorArgs & {
    numberOfItems: number;
    HideBlobAccent: boolean;
  };

const meta = {
  title: 'Page Content/Features',
  component: Default,
  tags: ['autodocs'],
  argTypes: {
    ...backgroundColorArgTypes,
    HideBlobAccent: {
      control: 'boolean',
      name: 'Hide Blob Accent',
    },
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
    HideBlobAccent: true,
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
    const promoStyles = clsx(
      baseParams.styles,
      args.BackgroundColor,
      args.HideBlobAccent && CommonStyles.HideBlobAccent
    );
    const params = {
      ...baseParams,
      styles: promoStyles,
    };

    return (
      <Default
        fields={createIGQLData({
          createItems: createFeatureItems,
          count: args.numberOfItems,
          topLevelFields: {
            title: createIGQLField(createTextField('Our Special Services')),
            description: createIGQLField(createRichTextField(1)),
          },
        })}
        params={params}
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
    const featureStyles = clsx(
      baseParams.styles,
      args.BackgroundColor,
      args.HideBlobAccent && CommonStyles.HideBlobAccent
    );
    const params = {
      ...baseParams,
      styles: featureStyles,
    };

    return (
      <Simple
        fields={createIGQLData({
          createItems: createFeatureItems,
          count: args.numberOfItems,
          topLevelFields: {
            title: createIGQLField(createTextField('Our Special Services')),
            description: createIGQLField(createRichTextField(1)),
          },
        })}
        params={params}
        rendering={baseRendering}
      />
    );
  },
};
