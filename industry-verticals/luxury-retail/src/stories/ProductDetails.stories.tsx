import { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as ProductDetails } from '../components/product-details/ProductDetails';
import { CommonParams, CommonRendering } from './common/commonData';
import { renderStorybookPlaceholder } from './helpers/renderStorybookPlaceholder';
import { boolToSitecoreCheckbox } from './helpers/boolToSitecoreCheckbox';
import { createProductItems } from './helpers/createItems';
import {
  BackgroundColorArgs,
  backgroundColorArgTypes,
  defaultBackgroundColorArgs,
} from './common/commonControls';

type StoryProps = ComponentProps<typeof ProductDetails> &
  BackgroundColorArgs & {
    showAddToCartButton?: boolean;
    showCompareButton?: boolean;
    showAddToWishlistButton?: boolean;
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
  },
  args: {
    ...defaultBackgroundColorArgs,
    showAddToCartButton: true,
    showCompareButton: true,
    showAddToWishlistButton: true,
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
    [`related-products-${baseParams.DynamicPlaceholderId}`]: [renderStorybookPlaceholder()],
  },
};

const [mockProduct] = createProductItems(1);

export const Default: Story = {
  render: (args) => {
    const params = {
      ...baseParams,
      ShowAddtoCartButton: boolToSitecoreCheckbox(args.showAddToCartButton),
      ShowCompareButton: boolToSitecoreCheckbox(args.showCompareButton),
      ShowAddtoWishlistButton: boolToSitecoreCheckbox(args.showAddToWishlistButton),
      styles: `${baseParams.styles} ${args.BackgroundColor}`,
    };

    return <ProductDetails params={params} rendering={baseRendering} fields={mockProduct.fields} />;
  },
};
