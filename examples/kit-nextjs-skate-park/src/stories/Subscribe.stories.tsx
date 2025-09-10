import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ComponentProps } from 'react';
import { Default as SubscribeBanner } from '../components/subscribe/Subscribe';
import { CommonParams, CommonRendering } from './common/commonData';
import { createTextField } from './helpers/createFields';

const baseParams = {
  ...CommonParams,
} as const;

const baseRendering = {
  ...CommonRendering,
  componentName: 'SubscribeBanner',
  params: baseParams,
} as const;

type StoryProps = ComponentProps<typeof SubscribeBanner> & {
  bgOption:
    | 'container-white-background'
    | 'container-color-background'
    | 'container-gray-background';
};

const meta = {
  title: 'Page Content/SubscribeBanner',
  component: SubscribeBanner,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    bgOption: {
      name: 'Background Color',
      control: {
        type: 'select',
        labels: {
          'container-white-background': 'White',
          'container-color-background': 'Accent',
          'container-gray-background': 'Gray',
        },
      },
      options: [
        'container-white-background',
        'container-color-background',
        'container-gray-background',
      ],
    },
  },
  args: {
    bgOption: 'container-color-background',
    params: baseParams,
    rendering: baseRendering,
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<StoryProps>;

const renderWithBg: Story['render'] = (args) => {
  const mergedStyles =
    `${args.params?.styles ?? ''} ${args.bgOption ?? 'container-color-background'}`.trim();

  return (
    <SubscribeBanner
      {...args}
      params={{
        ...args.params,
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
      ButtonText: createTextField('Subscribe'),
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
      ButtonText: createTextField('Join Now'),
    },
  },
};
