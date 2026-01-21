import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as GridConditions } from '../components/grid-conditions/GridConditions';
import { ComponentProps } from 'react';
import { CommonParams, CommonRendering } from './common/commonData';
import { boolToSitecoreCheckbox } from './helpers/boolToSitecoreCheckbox';

type StoryProps = ComponentProps<typeof GridConditions> & {
  HideGridSection: boolean;
  HideTemperatureSection: boolean;
  HideOutagesSection: boolean;
};

const meta = {
  title: 'Grid/Grid Conditions',
  component: GridConditions,
  tags: ['autodocs'],
  argTypes: {
    HideGridSection: {
      control: 'boolean',
      name: 'Hide Grid Section',
    },
    HideTemperatureSection: {
      control: 'boolean',
      name: 'Hide Temperature Section',
    },
    HideOutagesSection: {
      control: 'boolean',
      name: 'Hide Outages Section',
    },
  },
  args: {
    HideGridSection: false,
    HideTemperatureSection: false,
    HideOutagesSection: false,
  },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'GridConditions',
  params: baseParams,
};

export const Default: Story = {
  render: (args) => {
    const params = {
      ...baseParams,
      HideGridSection: boolToSitecoreCheckbox(args.HideGridSection),
      HideTemperatureSection: boolToSitecoreCheckbox(args.HideTemperatureSection),
      HideOutagesSection: boolToSitecoreCheckbox(args.HideOutagesSection),
    };
    return <GridConditions params={params} rendering={baseRendering} />;
  },
};
