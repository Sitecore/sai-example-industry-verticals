import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as RichText } from '../components/rich-text/RichText';
import { ComponentProps } from 'react';
import { CommonParams, CommonRendering } from './common/commonData';
import { createRichTextField } from './helpers/createFields';

type StoryProps = ComponentProps<typeof RichText>;

const meta = {
  title: 'Page Content/RichText',
  component: RichText,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = { ...CommonParams };

const baseRendering = {
  ...CommonRendering,
  componentName: 'RichText',
  params: baseParams,
};

export const Default: Story = {
  render: () => (
    <RichText
      params={baseParams}
      fields={{
        Text: createRichTextField(2),
      }}
      rendering={{ ...baseRendering, placeholders: {} }}
    />
  ),
};

export const withRichMarkup: Story = {
  render: () => (
    <RichText
      params={baseParams}
      fields={{
        Text: createRichTextField(0, 'withRichMarkup'),
      }}
      rendering={{ ...baseRendering, placeholders: {} }}
    />
  ),
};
