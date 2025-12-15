import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as Navigation } from '../components/navigation/Navigation';
import { ComponentProps } from 'react';
import { CommonParams, CommonRendering } from './common/commonData';
import { getNavigationFields, logoParam } from './constants/navFields';
import { boolToSitecoreCheckbox } from './helpers/boolToSitecoreCheckbox';

type StoryProps = ComponentProps<typeof Navigation> & {
  withRoot?: boolean;
  isFlat?: boolean;
  hasLogo?: boolean;
  isSimpleLayout?: boolean;
};

const meta = {
  title: 'Navigation/Navigation',
  component: Navigation,
  tags: ['autodocs'],
  argTypes: {
    withRoot: {
      name: 'Include root page',
      control: 'boolean',
      defaultValue: true,
    },
    isFlat: {
      name: 'Flat structure',
      description: 'all items displayed on the same level',
      control: 'boolean',
      defaultValue: false,
    },
    isSimpleLayout: {
      name: 'Simple Layout',
      description: 'left aligned logo, right aligned menu items',
      control: 'boolean',
      defaultValue: false,
    },
    hasLogo: {
      name: 'Show Logo',
      control: 'boolean',
      defaultValue: true,
    },
  },
  args: {
    withRoot: true,
    isFlat: false,
    hasLogo: true,
    isSimpleLayout: false,
  },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'Navigation',
  params: baseParams,
};

export const Default: Story = {
  render: (args) => {
    const params = {
      ...baseParams,
      ...(args.hasLogo ? { Logo: logoParam } : {}),
      SimpleLayout: boolToSitecoreCheckbox(args.isSimpleLayout),
    };
    const fields = getNavigationFields({ withRoot: args.withRoot, flat: args.isFlat });
    return <Navigation params={params} rendering={baseRendering} fields={fields} />;
  },
};

export const Simple: Story = {
  args: {
    withRoot: true,
    isFlat: false,
    hasLogo: true,
    isSimpleLayout: true,
  },
  render: (args) => {
    const params = {
      ...baseParams,
      ...(args.hasLogo ? { Logo: logoParam } : {}),
      SimpleLayout: boolToSitecoreCheckbox(args.isSimpleLayout),
    };
    const fields = getNavigationFields({ withRoot: args.withRoot, flat: args.isFlat });
    return <Navigation params={params} rendering={baseRendering} fields={fields} />;
  },
};
