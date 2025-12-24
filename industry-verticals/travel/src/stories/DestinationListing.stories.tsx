'use client';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Default as DestinationListing,
  DestinationListingProps,
} from '../components/destination-listing/DestinationListing';
import { CommonParams, CommonRendering } from './common/commonData';
import clsx from 'clsx';
import { generateDestinations } from './helpers/createItems';
import { TitleSectionFlags } from '@/types/styleFlags';

type StoryProps = DestinationListingProps & {
  HideTitleSection: boolean;
  numberOfDestinations: number;
};

const meta = {
  title: 'Destinations/Destinations Listing',
  component: DestinationListing,
  tags: ['autodocs'],
  argTypes: {
    HideTitleSection: {
      control: 'boolean',
      name: 'Hide Title Section',
    },
    numberOfDestinations: {
      control: { type: 'range', min: 1, max: 20, step: 1 },
      name: 'Number of Destination Cards',
    },
  },
  args: {
    HideTitleSection: false,
    numberOfDestinations: 4,
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'Destination Listing',
  params: baseParams,
};

export const Default: Story = {
  render: (args) => {
    const params = {
      ...baseParams,
      styles: clsx(baseParams.styles, args.HideTitleSection && TitleSectionFlags.HideTitleSection),
      RenderingIdentifier: 'destination-listing',
    };
    const fields = {
      items: generateDestinations(args.numberOfDestinations),
    };

    return <DestinationListing params={params} rendering={baseRendering} fields={fields} />;
  },
};
