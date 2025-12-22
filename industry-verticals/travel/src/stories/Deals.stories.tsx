import { CommonParams, CommonRendering } from './common/commonData';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ComponentProps } from 'react';
import { Default } from '@/components/deals/Deals';
import { createIGQLData } from './helpers/createIGQLData';
import { createIGQLField, createLinkField, createTextField } from './helpers/createFields';
import {
  BackgroundColorArgs,
  backgroundColorArgTypes,
  defaultBackgroundColorArgs,
} from './common/commonControls';
import clsx from 'clsx';

type StoryProps = ComponentProps<typeof Default> &
  BackgroundColorArgs & {
    count: number;
  };

const meta = {
  title: 'Page Content/Deals',
  component: Default,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    ...backgroundColorArgTypes,
    count: {
      control: {
        type: 'range',
        min: 1,
        max: 12,
        step: 1,
      },
      description: 'Number of deal cards',
    },
  },
  args: {
    ...defaultBackgroundColorArgs,
    count: 3,
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'Container',
  params: baseParams,
};

export const DealsDefault: Story = {
  render: (args) => {
    return (
      <Default
        rendering={baseRendering}
        params={{
          ...baseParams,
          styles: clsx(baseParams.styles, args.BackgroundColor),
        }}
        fields={createIGQLData({
          count: args.count,
          topLevelFields: {
            title: createIGQLField(createTextField('Deals Title')),
            description: createIGQLField(createTextField()),
          },
          createItems: (count) =>
            Array.from({ length: count }, () => ({
              dealTitle: createIGQLField(createTextField('Deal Title')),
              dealDescription: createIGQLField(
                createTextField('This is a description of the deal.')
              ),
              dealCtaLink: createIGQLField(createLinkField('More Info')),
              offerText: createIGQLField(createTextField('Free')),
              dealValidity: createIGQLField(createTextField('Valid until 12/31/2024')),
            })),
        })}
      />
    );
  },
};
