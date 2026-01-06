import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as DestinationDetails } from '../components/destination-details/DestinationDetails';
import { ComponentProps } from 'react';
import { CommonParams, CommonRendering } from './common/commonData';
import { generateDestinations } from './helpers/createItems';

type StoryProps = ComponentProps<typeof DestinationDetails>;

const meta = {
  title: 'Destinations/Destination Details',
  component: DestinationDetails,
  tags: ['autodocs'],
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = { ...CommonParams };

const baseRendering = {
  ...CommonRendering,
  componentName: 'DestinationDetails',
  params: baseParams,
};

const baseFields = generateDestinations(1)?.[0]?.fields;

export const Default: Story = {
  render: () => (
    <DestinationDetails params={baseParams} fields={baseFields} rendering={baseRendering} />
  ),
};
