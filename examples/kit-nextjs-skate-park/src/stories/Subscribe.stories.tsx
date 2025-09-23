import type { Meta, StoryObj, ArgTypes } from '@storybook/nextjs-vite';
import { ComponentProps } from 'react';
import {
  Default as SubscribeBanner,
  WithConsent as SubscribeWithConsent,
} from '../components/subscribe/Subscribe';
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
    BackgroundColor: 'Color background',
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
      Title: createTextField('Subscribe to get attractive offers on our products'),
    },
  },
};

export const LongTitle: Story = {
  render: renderWithBg,
  args: {
    fields: {
      Title: createTextField(
        'Subscribe to get the latest product updates, tutorials, and best practices delivered to your inbox — Subscribe to get attractive offers on our products'
      ),
    },
  },
};

export const WithConsent: Story = {
  render: (args) => {
    const mergedStyles = `${args.params?.styles ?? ''} ${args.BackgroundColor}`.trim();

    return (
      <SubscribeWithConsent
        {...args}
        rendering={baseRendering}
        params={{
          ...baseParams,
          styles: mergedStyles,
        }}
      />
    );
  },
  args: {
    ...defaultBackgroundColorArgs,
    fields: {
      Title: createTextField('Subscribe to get attractive offers on our products'),
      ConsentText: createRichTextField(1, 'paragraphs'),
    },
  },
};
