import type { StoryObj } from '@storybook/nextjs-vite';
import { Default as GridDemand, Area } from '../components/grid-demand/GridDemand';
import { ComponentProps } from 'react';
import { CommonParams, CommonRendering } from './common/commonData';
import { createRichTextField, createTextField } from './helpers/createFields';

type StoryProps = ComponentProps<typeof GridDemand>;

const meta = {
  title: 'Grid/GridDemand',
  component: GridDemand,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'GridDemand',
  params: baseParams,
};

const baseFields = {
  Title: createTextField('Section Title'),
  Description: createRichTextField(1),
};

export const Default: Story = {
  render: () => {
    return <GridDemand params={baseParams} rendering={baseRendering} fields={baseFields} />;
  },
};

export const AreaChart: Story = {
  render: () => {
    return <Area params={baseParams} rendering={baseRendering} fields={baseFields} />;
  },
};
