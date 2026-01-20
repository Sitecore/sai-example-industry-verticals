import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default, Card } from '../components/features/Features';
import { ComponentProps } from 'react';
import { CommonParams, CommonRendering } from './common/commonData';
import {
  BackgroundColorArgs,
  backgroundColorArgTypes,
  defaultBackgroundColorArgs,
} from './common/commonControls';
import { createFeatureItems } from './helpers/createItems';
import { createIGQLData } from './helpers/createIGQLData';
import { createRichTextField, createTextField, createIGQLField } from './helpers/createFields';
import clsx from 'clsx';

type StoryProps = ComponentProps<typeof Default> &
  BackgroundColorArgs & {
    numberOfItems: number;
  };

type FieldsType = ComponentProps<typeof Default>['fields'];

const meta = {
  title: 'Page Content/Features',
  component: Default,
  tags: ['autodocs'],
  argTypes: {
    ...backgroundColorArgTypes,
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
    const featureStyles = clsx(baseParams.styles, args.BackgroundColor);
    const params = {
      ...baseParams,
      styles: featureStyles,
    };

    return (
      <Default
        fields={
          createIGQLData({
            createItems: createFeatureItems,
            count: args.numberOfItems,
            topLevelFields: {
              title: createIGQLField(createTextField('Tips for Energy Conservation')),
              description: createIGQLField(createRichTextField(1)),
            },
          }) as unknown as FieldsType
        }
        params={params}
        rendering={baseRendering}
      />
    );
  },
};

export const CardFeatures: Story = {
  parameters: {
    layout: 'padded',
  },
  render: (args) => {
    const featureStyles = clsx(baseParams.styles, args.BackgroundColor);
    const params = {
      ...baseParams,
      styles: featureStyles,
    };

    return (
      <Card
        fields={
          createIGQLData({
            createItems: createFeatureItems,
            count: args.numberOfItems,
            topLevelFields: {
              title: createIGQLField(createTextField('Quick Actions')),
              description: createIGQLField(createRichTextField(1)),
            },
          }) as unknown as FieldsType
        }
        params={params}
        rendering={baseRendering}
      />
    );
  },
};
