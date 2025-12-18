import type { Meta, StoryObj, ArgTypes } from '@storybook/nextjs-vite';
import { ComponentProps } from 'react';
import { Default as SubscribeBanner } from '../components/subscribe/Subscribe';
import { CommonParams, CommonRendering } from './common/commonData';
import { createTextField, createRichTextField } from './helpers/createFields';
import {
  BackgroundColorArgs,
  backgroundColorArgTypes,
  defaultBackgroundColorArgs,
} from './common/commonControls';

const baseParams = {
  ...CommonParams,
} as const;

const baseRendering = {
  ...CommonRendering,
  componentName: 'SubscribeBanner',
  params: baseParams,
} as const;

type StoryProps = ComponentProps<typeof SubscribeBanner> & BackgroundColorArgs;
const meta = {
  title: 'Forms /SubscribeBanner',
  component: SubscribeBanner,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    ...backgroundColorArgTypes,
  } as ArgTypes,
  args: {
    ...defaultBackgroundColorArgs,
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<StoryProps>;

const renderWithBg: Story['render'] = (args) => {
  const mergedStyles = `${args.params?.styles ?? ''} ${args.BackgroundColor}`.trim();

  return (
    <SubscribeBanner
      {...args}
      rendering={baseRendering}
      params={{
        ...baseParams,
        styles: mergedStyles,
      }}
    />
  );
};

export const Default: Story = {
  render: renderWithBg,
  args: {
    fields: {
      Title: createTextField('Win a trip to Bali'),
      HelperText: createRichTextField(1),
    },
  },
};
