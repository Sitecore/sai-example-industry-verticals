import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as GridConditions } from '../components/grid-conditions/GridConditions';
import { ComponentProps } from 'react';
import { CommonParams, CommonRendering } from './common/commonData';

type StoryProps = ComponentProps<typeof GridConditions> & {
  caption?: string;
  linkText?: string;
  hasLink?: boolean;
};

const meta = {
  title: 'Grid/Grid Conditions',
  component: GridConditions,
  tags: ['autodocs'],
  argTypes: {},
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
  args: {},
  render: () => {
    return <GridConditions params={baseParams} rendering={baseRendering} />;
  },
};
