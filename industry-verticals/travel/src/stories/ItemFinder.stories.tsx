import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Default as ItemFinder,
  Simple,
  Large as LargeComponent,
} from '../components/item-finder/ItemFinder';
import { ComponentProps } from 'react';
import { CommonParams, CommonRendering } from './common/commonData';
import { createTextField } from './helpers/createFields';

type StoryProps = ComponentProps<typeof ItemFinder>;

const meta = {
  title: 'Forms/Item Finder',
  component: ItemFinder,
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
  componentName: 'ItemFinder',
  params: baseParams,
};

const baseFields = {
  PlaceholderText: createTextField('Search articles...'),
  SearchButtonText: createTextField('Search'),
};

export const Default: Story = {
  render: () => {
    const fields = {
      ...baseFields,
      PlaceholderText: createTextField('Search articles...'),
    };

    return (
      <Simple
        params={baseParams}
        fields={fields}
        rendering={{ ...baseRendering, placeholders: {} }}
      />
    );
  },
};

export const Large: Story = {
  render: () => {
    const fields = {
      ...baseFields,
      SearchButtonText: createTextField('Search Flights'),
    };

    return (
      <LargeComponent
        params={baseParams}
        fields={fields}
        rendering={{ ...baseRendering, placeholders: {} }}
      />
    );
  },
};

