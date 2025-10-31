import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as PageContent } from '../components/page-content/PageContent';
import { ComponentProps } from 'react';
import { CommonParams, CommonRendering } from './common/commonData';
import { createRichTextField } from './helpers/createFields';

type StoryProps = ComponentProps<typeof PageContent>;

const meta = {
  title: 'Page Content/PageContent',
  component: PageContent,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = { ...CommonParams };

const baseRendering = {
  ...CommonRendering,
  componentName: 'PageContent',
  params: baseParams,
};

export const Default: Story = {
  render: () => (
    <PageContent
      params={baseParams}
      fields={{
        Content: createRichTextField(3),
      }}
      rendering={{ ...baseRendering, placeholders: {} }}
    />
  ),
};

export const withRichMarkup: Story = {
  render: () => (
    <PageContent
      params={baseParams}
      fields={{
        Content: createRichTextField(0, 'withRichMarkup'),
      }}
      rendering={{ ...baseRendering, placeholders: {} }}
    />
  ),
};
