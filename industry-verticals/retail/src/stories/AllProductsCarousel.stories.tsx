import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ComponentProps } from 'react';
import { Default as AllProductsCarousel } from '../components/all-products-carousel/AllProductsCarousel';
import { CommonParams, CommonRendering } from './common/commonData';
import { generateId } from './helpers/generateId';
import { boolToSitecoreCheckbox } from './helpers/boolToSitecoreCheckbox';
import { createProductItems } from './helpers/createItems';
import {
  BackgroundColorArgs,
  backgroundColorArgTypes,
  defaultBackgroundColorArgs,
} from './common/commonControls';

type StoryProps = ComponentProps<typeof AllProductsCarousel> &
  BackgroundColorArgs & {
    autoPlay: boolean;
    loop: boolean;
    numberOfProducts: number;
  };

const meta = {
  title: 'Products/All Products Carousel',
  component: AllProductsCarousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    ...backgroundColorArgTypes,
    numberOfProducts: {
      name: 'Number of products',
      control: {
        type: 'range',
        min: 1,
        max: 10,
        step: 1,
      },
    },
    autoPlay: {
      name: 'Auto Play',
      control: {
        type: 'boolean',
      },
    },
    loop: {
      name: 'Loop',
      control: {
        type: 'boolean',
      },
    },
  },
  args: {
    ...defaultBackgroundColorArgs,
    numberOfProducts: 5,
    autoPlay: true,
    loop: true,
  },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'All Products Carousel',
  params: baseParams,
};

export const Default: Story = {
  render: (args) => {
    const uid = generateId();
    return (
      <AllProductsCarousel
        params={{
          ...baseParams,
          Autoplay: boolToSitecoreCheckbox(args.autoPlay),
          Loop: boolToSitecoreCheckbox(args.loop),
          styles: `${baseParams.styles} ${args.BackgroundColor}`,
        }}
        rendering={{ ...baseRendering, uid }}
        fields={{
          items: createProductItems(args.numberOfProducts),
        }}
      />
    );
  },
};
