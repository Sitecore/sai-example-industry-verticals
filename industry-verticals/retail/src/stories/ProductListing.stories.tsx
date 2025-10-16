import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ComponentProps } from 'react';
import { Default as ProductListing } from '../components/product-listing/ProductListing';
import { CommonParams, CommonRendering } from './common/commonData';
import {
  createIGQLField,
  createImageField,
  createNumberField,
  createTextField,
} from './helpers/createFields';

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
    numberOfProducts: 16,
  },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const createIGQLProductItems = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: `product-${index + 1}`,
    name: `Product ${index + 1}`,
    title: createIGQLField(createTextField(`Product ${index + 1}`)),
    price: createIGQLField(createNumberField(1.99 + index * 10)),
    image1: createIGQLField(createImageField()),
    category: createIGQLField({
      id: `category-${(index % 3) + 1}`,
      displayName: `Category ${(index % 3) + 1}`,
      name: `category${(index % 3) + 1}`,
      url: `/categories/category-${(index % 3) + 1}`,
      fields: {
        CategoryName: createTextField(`Category ${(index % 3) + 1}`),
      },
    }),
    highlight: createIGQLField(
      (index + 1) % 3 === 0
        ? createTextField('New', 0)
        : {
            value: '',
          }
    ),
    discount: createIGQLField(
      (index + 1) % 4 === 0
        ? createTextField('-20%', 0)
        : {
            value: '',
          }
    ),
    url: {
      url: `/products/product-${index + 1}`,
    },
  }));
};

const createIGQLProductReviews = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: `review-${index + 1}`,
    product: {
      targetItem: {
        id: `product-${index + 1}`,
      },
    },
    rating: createIGQLField(createNumberField((index % 5) + 1)),
  }));
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
        products: {
          results: createIGQLProductItems(args.numberOfProducts),
        },
        reviews: {
          results: createIGQLProductReviews(args.numberOfProducts),
        },
      },
    };

    return <ProductListing params={baseParams} rendering={baseRendering} fields={fields} />;
  },
};
