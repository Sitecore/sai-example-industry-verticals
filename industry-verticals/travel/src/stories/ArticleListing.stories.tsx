import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ComponentProps } from 'react';
import { Default as ArticleListing } from '../components/article-listing/ArticleListing';
import { CommonParams, CommonRendering } from './common/commonData';
import { createMockArticles } from './helpers/createItems';
import clsx from 'clsx';
import { TitleSectionFlags } from '@/types/styleFlags';

type StoryProps = ComponentProps<typeof ArticleListing> & {
  numberOfArticles: number;
  HideTitleSection: boolean;
  numberOfDestinations: number;
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
    HideTitleSection: {
      control: 'boolean',
      name: 'Hide Title Section',
    },
  },
  args: {
    numberOfArticles: 5,
    HideTitleSection: false,
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
};

export const Default: Story = {
  render: (args) => {
    const params = {
      ...baseParams,
      styles: clsx(baseParams.styles, args.HideTitleSection && TitleSectionFlags.HideTitleSection),
      RenderingIdentifier: 'destination-listing',
    };
    const fields = {
      items: createMockArticles(args.numberOfArticles),
    };

    return <ArticleListing params={params} rendering={baseRendering} fields={fields} />;
  },
};
