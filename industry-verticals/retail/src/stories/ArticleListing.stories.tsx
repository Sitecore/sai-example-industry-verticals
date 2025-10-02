import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ComponentProps } from 'react';
import { Default as ArticleListing } from '../components/article-listing/ArticleListing';
import { CommonParams, CommonRendering } from './common/commonData';
import { renderStorybookPlaceholder } from './helpers/renderStorybookPlaceholder';
import { createMockArticles } from './helpers/createItems';

type StoryProps = ComponentProps<typeof ArticleListing> & {
  numberOfArticles: number;
};

const meta = {
  title: 'Articles/ArticleListing',
  component: ArticleListing,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    numberOfArticles: {
      name: 'Number of Articles',
      control: { type: 'range', min: 1, max: 20, step: 1 },
    },
  },
  args: {
    numberOfArticles: 5,
  },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'ArticleListing',
  params: baseParams,
  placeholders: {
    [`article-listing-search-bar-${baseParams.DynamicPlaceholderId}`]: [
      renderStorybookPlaceholder(),
    ],
    [`article-listing-side-bar-${baseParams.DynamicPlaceholderId}`]: [renderStorybookPlaceholder()],
  },
};

export const Default: Story = {
  render: (args) => {
    const fields = {
      items: createMockArticles(args.numberOfArticles),
    };

    return <ArticleListing params={baseParams} rendering={baseRendering} fields={fields} />;
  },
};
