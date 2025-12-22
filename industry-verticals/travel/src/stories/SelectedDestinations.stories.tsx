'use client';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Default as SelectedDestinationsDefault,
  WithStartingPrice,
  SelectedDestinationsProps,
} from '../components/selected-destinations/SelectedDestinations';
import { CommonParams, CommonRendering } from './common/commonData';
import { createTextField } from './helpers/createFields';
import clsx from 'clsx';
import { generateDestinations } from './helpers/createItems';

type StoryProps = SelectedDestinationsProps & {
  HasJustifyAround: boolean;
  numberOfDestinations: number;
};

const meta = {
  title: 'Page Content/Selected Destinations',
  component: SelectedDestinationsDefault,
  tags: ['autodocs'],
  argTypes: {
    HasJustifyAround: {
      control: 'boolean',
      name: 'Justify Around Cards',
    },
    numberOfDestinations: {
      control: { type: 'range', min: 1, max: 12, step: 1 },
      name: 'Number of Destination Cards',
    },
  },
  args: {
    HasJustifyAround: false,
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
  componentName: 'SelectedDestinations',
  params: baseParams,
};

export const Default: Story = {
  render: (args) => {
    const params = {
      ...baseParams,
      styles: clsx(baseParams.styles, args.HasJustifyAround && 'justify-around'),
      RenderingIdentifier: 'default-destinations',
    };

    return (
      <SelectedDestinationsDefault
        fields={{
          Title: createTextField('Top Destinations'),
          Description: createTextField('Explore our most popular destinations'),
          Destinations: generateDestinations(args.numberOfDestinations),
        }}
        params={params}
        rendering={baseRendering}
      />
    );
  },
};

export const WithPrice: Story = {
  render: (args) => {
    const params = {
      ...baseParams,
      styles: clsx(baseParams.styles, args.HasJustifyAround && 'justify-around'),
      RenderingIdentifier: 'destinations-price',
    };

    return (
      <WithStartingPrice
        fields={{
          Title: createTextField('Affordable Destinations'),
          Description: createTextField('Find the best prices for your next trip'),
          Destinations: generateDestinations(args.numberOfDestinations),
        }}
        params={params}
        rendering={baseRendering}
      />
    );
  },
};
