import type { Meta, StoryObj } from '@storybook/react';
import {
  Default as NavigationIcons,
  NavigationIconsProps,
} from '../components/navigation-icons/NavigationIcons';
import { CommonParams, CommonRendering } from './common/commonData';
import { boolToSitecoreCheckbox } from './helpers/boolToSitecoreCheckbox';
import { createLinkField } from './helpers/createFields';

type StoryProps = NavigationIconsProps & {
  hideAccount: boolean;
  hideWishlist: boolean;
  hideCart: boolean;
};

const meta: Meta<StoryProps> = {
  title: 'Navigation/NavigationIcons',
  component: NavigationIcons,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    hideAccount: {
      control: 'boolean',
      name: 'Hide Account Icon',
    },
    hideWishlist: {
      control: 'boolean',
      name: 'Hide Wishlist Icon',
    },
    hideCart: {
      control: 'boolean',
      name: 'Hide Cart Icon',
    },
  },
  args: {
    hideAccount: false,
    hideWishlist: false,
    hideCart: false,
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'NavigationIcons',
  params: baseParams,
};

const baseFields = {
  AccountPage: createLinkField('Go to Account'),
  WishlistPage: createLinkField('Go to Wishlist'),
  CheckoutPage: createLinkField('Go to Checkout'),
};

export const Default: Story = {
  render: (args) => {
    const params = {
      ...baseParams,
      HideAccountIcon: boolToSitecoreCheckbox(args.hideAccount),
      HideWishlistIcon: boolToSitecoreCheckbox(args.hideWishlist),
      HideCartIcon: boolToSitecoreCheckbox(args.hideCart),
    };
    return <NavigationIcons params={params} rendering={baseRendering} fields={baseFields} />;
  },
};
