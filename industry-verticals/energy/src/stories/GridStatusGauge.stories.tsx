import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ComponentProps } from 'react';
import { Default as GridStatusGauge } from '../components/gridstatusgauge/GridStatusGauge';
import { CommonParams, CommonRendering } from './common/commonData';

type StoryProps = ComponentProps<typeof GridStatusGauge>;

const meta = {
  title: 'Grid/GridStatusGauge',
  component: GridStatusGauge,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'GridStatusGauge',
  params: baseParams,
};

export const Default: Story = {
  render: () => {
    return <GridStatusGauge params={baseParams} rendering={baseRendering} />;
  },
};
