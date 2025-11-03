import { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as ProductDetails } from '../components/product-details/ProductDetails';
import { CommonParams, CommonRendering } from './common/commonData';
import { renderStorybookPlaceholder } from './helpers/renderStorybookPlaceholder';
import { createProductItems } from './helpers/createItems';
import {
  BackgroundColorArgs,
  backgroundColorArgTypes,
  defaultBackgroundColorArgs,
} from './common/commonControls';
import { ProductDetailFlags } from '@/types/styleFlags';
import clsx from 'clsx';

type StoryProps = ComponentProps<typeof ProductDetails> &
  BackgroundColorArgs & {
    showCompareButton?: boolean;
    showAddToCartButton?: boolean;
    showAddtoWishlistButton?: boolean;
  };

const meta = {
  title: 'Products/Product Details',
  component: ProductDetails,
  tags: ['autodocs'],
  argTypes: {
    ...backgroundColorArgTypes,
    showCompareButton: {
      control: { type: 'boolean' },
      defaultValue: true,
    },
    showAddToCartButton: {
      control: { type: 'boolean' },
      defaultValue: true,
    },
    showAddtoWishlistButton: {
      control: { type: 'boolean' },
      defaultValue: true,
    },
  },
  args: {
    ...defaultBackgroundColorArgs,
    showCompareButton: true,
    showAddToCartButton: true,
    showAddtoWishlistButton: true,
  },
  parameters: {},
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'Product Details',
  params: baseParams,
  placeholders: {
    [`product-reviews-${baseParams.DynamicPlaceholderId}`]: [renderStorybookPlaceholder()],
    [`related-products-${baseParams.DynamicPlaceholderId}`]: [renderStorybookPlaceholder()],
  },
};

const [mockProduct] = createProductItems(1);

export const Default: Story = {
  render: (args) => {
    const activeButtons = clsx(
      args.showCompareButton && ProductDetailFlags.ShowCompareButton,
      args.showAddToCartButton && ProductDetailFlags.ShowAddtoCartButton,
      args.showAddtoWishlistButton && ProductDetailFlags.ShowAddtoWishlistButton
    );

    const params = {
      ...baseParams,
      styles: clsx(baseParams.styles, args.BackgroundColor, activeButtons),
    };

    return <ProductDetails params={params} rendering={baseRendering} fields={mockProduct.fields} />;
  },
};
