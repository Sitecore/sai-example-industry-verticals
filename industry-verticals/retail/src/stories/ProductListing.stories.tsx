import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ComponentProps } from 'react';
import { Default as ProductListing } from '../components/product-listing/ProductListing';
import { CommonParams, CommonRendering } from './common/commonData';
import { createIGQLProductItems } from './helpers/createItems';

type StoryProps = ComponentProps<typeof ProductListing> & {
  numberOfProducts: number;
};

const meta = {
  title: 'Products/ProductListing',
  component: ProductListing,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    numberOfProducts: {
      name: 'Number of Products',
      control: { type: 'range', min: 1, max: 50, step: 1 },
    },
  },
  args: {
    numberOfProducts: 20,
  },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'ProductListing',
  params: baseParams,
};

export const Default: Story = {
  render: (args) => {
    const fields = {
      data: {
        contextItem: {
          children: {
            results: createIGQLProductItems(args.numberOfProducts),
          },
        },
      },
    };

    return <ProductListing params={baseParams} rendering={baseRendering} fields={fields} />;
  },
};
