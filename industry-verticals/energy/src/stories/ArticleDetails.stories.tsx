import { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as ArticleDetails } from '../components/article-details/ArticleDetails';
import { CommonSitecoreItem, CommonParams, CommonRendering } from './common/commonData';
import { renderStorybookPlaceholder } from './helpers/renderStorybookPlaceholder';
import { createRichTextField, createTextField, createImageField } from './helpers/createFields';

type StoryProps = ComponentProps<typeof ArticleDetails>;

const meta = {
  title: 'Articles/Article Details',
  component: ArticleDetails,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'Article Details',
  params: baseParams,
  placeholders: {
    [`article-details-${baseParams.DynamicPlaceholderId}`]: [renderStorybookPlaceholder()],
    [`article-details-author-${baseParams.DynamicPlaceholderId}`]: [renderStorybookPlaceholder()],
    [`article-details-full-width-${baseParams.DynamicPlaceholderId}`]: [
      renderStorybookPlaceholder(),
    ],
  },
};

const baseFields = {
  Title: createTextField('Behind the Scenes: How Gridwell Balances Supply and Demand'),
  ShortDescription: createTextField(),
  Content: createRichTextField(),
  Image: createImageField('placeholder'),
  PublishedDate: createTextField('Wed, December 25, 2025'),
  Author: {
    ...CommonSitecoreItem,
    fields: {
      AuthorName: createTextField('John Doe'),
      About: createTextField(),
      Avatar: createImageField('placeholder'),
    },
  },
  Category: {
    ...CommonSitecoreItem,
    fields: {
      Category: createTextField('Grid Operations'),
      CategoryIcon: createImageField('placeholder'),
    },
  },
  Tags: [
    {
      ...CommonSitecoreItem,
      id: '1',
      fields: {
        Tag: createTextField('Energy Balance'),
      },
    },
    {
      ...CommonSitecoreItem,
      id: '2',
      fields: {
        Tag: createTextField('Grid Operations'),
      },
    },
    {
      ...CommonSitecoreItem,
      id: '3',
      fields: {
        Tag: createTextField('Reliability'),
      },
    },
  ],
};

export const Default: Story = {
  render: () => {
    return (
      <ArticleDetails
        params={baseParams}
        rendering={{
          ...baseRendering,
          placeholders: {
            [`article-details-full-width-${baseParams.DynamicPlaceholderId}`]: [
              renderStorybookPlaceholder(),
            ],
          },
        }}
        fields={baseFields}
      />
    );
  },
};
