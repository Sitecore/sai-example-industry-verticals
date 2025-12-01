import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ComponentProps } from 'react';
import {
  Default as SelectedProducts,
  Carousel as SelectedProductsCarousel,
} from '../components/selected-products/SelectedProducts';
import { CommonParams, CommonRendering } from './common/commonData';
import { generateId } from './helpers/generateId';
import { createProductItems } from './helpers/createItems';
import {
  BackgroundColorArgs,
  backgroundColorArgTypes,
  defaultBackgroundColorArgs,
} from './common/commonControls';
import { createLinkField, createTextField } from './helpers/createFields';

type StoryProps = ComponentProps<typeof SelectedProducts> &
  BackgroundColorArgs & {
    numberOfProducts: number;
    autoPlay: boolean;
    loop: boolean;
    hideAccentLine: boolean;
  };

const meta = {
  title: 'Products/Selected Products',
  component: SelectedProducts,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    ...backgroundColorArgTypes,
    numberOfProducts: {
      name: 'Number of products',
      control: { type: 'range', min: 1, max: 12, step: 1 },
    },
  },
  args: {
    ...defaultBackgroundColorArgs,
    numberOfProducts: 8,
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'Related Products',
  params: baseParams,
};

export const Default: Story = {
  render: (args) => {
    const uid = generateId();

    return (
      <SelectedProducts
        params={{
          ...baseParams,
          styles: `${baseParams.styles} ${args.BackgroundColor}`,
        }}
        rendering={{ ...baseRendering, uid }}
        fields={{
          Title: createTextField('Selected Products'),
          ProductsLink: createLinkField('View All'),
          ProductsList: createProductItems(args.numberOfProducts),
        }}
      />
    );
  },
};

export const Carousel: Story = {
  render: (args) => {
    const uid = generateId();

    return (
      <SelectedProductsCarousel
        params={{
          ...baseParams,
          styles: `${baseParams.styles} ${args.BackgroundColor}`,
        }}
        rendering={{ ...baseRendering, uid }}
        fields={{
          Title: createTextField('Most popular right now'),
          ProductsLink: createLinkField('View All'),
          ProductsList: createProductItems(args.numberOfProducts),
        }}
      />
    );
  },
};
