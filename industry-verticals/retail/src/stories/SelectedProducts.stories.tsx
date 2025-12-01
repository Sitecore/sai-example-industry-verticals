import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ComponentProps } from 'react';
import { Default as SelectedProducts } from '../components/selected-products/SelectedProducts';
import { CommonParams, CommonRendering } from './common/commonData';
import { generateId } from './helpers/generateId';
import { boolToSitecoreCheckbox } from './helpers/boolToSitecoreCheckbox';
import { createProductItems } from './helpers/createItems';
import {
  BackgroundColorArgs,
  backgroundColorArgTypes,
  defaultBackgroundColorArgs,
} from './common/commonControls';
import { createLinkField, createTextField } from './helpers/createFields';
import { CommonStyles } from '@/types/styleFlags';
import clsx from 'clsx';

type StoryProps = ComponentProps<typeof SelectedProducts> &
  BackgroundColorArgs & {
    numberOfProducts: number;
    autoPlay: boolean;
    loop: boolean;
    hideAccentLine: boolean;
  };

const meta = {
  title: 'Products/Selected Products',
  component: SelectedProducts,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    ...backgroundColorArgTypes,
    numberOfProducts: {
      name: 'Number of products',
      control: { type: 'range', min: 1, max: 10, step: 1 },
    },
    autoPlay: {
      name: 'Auto Play',
      control: { type: 'boolean' },
    },
    loop: {
      name: 'Loop',
      control: { type: 'boolean' },
    },
    hideAccentLine: {
      name: 'Hide Accent Line',
      control: { type: 'boolean' },
    },
  },
  args: {
    ...defaultBackgroundColorArgs,
    numberOfProducts: 5,
    autoPlay: true,
    loop: true,
    hideAccentLine: false,
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'Selected Products',
  params: baseParams,
};

export const Default: Story = {
  render: (args) => {
    const uid = generateId();

    return (
      <SelectedProducts
        params={{
          ...baseParams,
          Autoplay: boolToSitecoreCheckbox(args.autoPlay),
          Loop: boolToSitecoreCheckbox(args.loop),
          HideAccentLine: boolToSitecoreCheckbox(args.hideAccentLine),
          styles: clsx(
            baseParams.styles,
            args.BackgroundColor,
            args.hideAccentLine && CommonStyles.HideAccentLine
          ),
        }}
        rendering={{ ...baseRendering, uid }}
        fields={{
          Title: createTextField('Selected Products'),
          ProductsLink: createLinkField('View All'),
          ProductsList: createProductItems(args.numberOfProducts),
        }}
      />
    );
  },
};
