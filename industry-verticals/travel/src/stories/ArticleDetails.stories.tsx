import { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as ArticleDetails } from '../components/article-details/ArticleDetails';
import { CommonParams, CommonRendering } from './common/commonData';
import { renderStorybookPlaceholder } from './helpers/renderStorybookPlaceholder';
import {
  createRichTextField,
  createTextField,
  createImageField,
  createLinkField,
} from './helpers/createFields';
import { ComponentFields } from '@sitecore-content-sdk/nextjs';

type StoryProps = ComponentProps<typeof ArticleDetails> & {
  hideShareWidget?: boolean;
};

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
  Title: createTextField('Bali in Summer: Long Days, Warm Evenings, and Ocean Calm'),
  ShortDescription: createTextField('Exploring the Wonders of the World'),
  Content: createRichTextField(),
  Image: createImageField('placeholder'),
  PublishedDate: createTextField('Wed, December 25, 2025'),
  Author: {
    fields: {
      AuthorName: createTextField('John Doe'),
      About: createTextField('John is a travel writer who has explored over 30 countries.'),
      Avatar: createImageField('placeholder'),
    },
  },
  Category: {
    fields: {
      Category: createTextField('Travel'),
    },
  },
  ReadTime: createTextField('10 min'),
  Likes: createTextField('17'),
  Shares: createTextField('4'),
  BackLink: createLinkField('Back to Blog'),
};

const SocialFollowShareRendering = {
  ...CommonRendering,
  componentName: 'SocialFollow',
  params: CommonParams,
  fields: {
    FacebookLink: createLinkField('Facebook'),
    InstagramLink: createLinkField('Instagram'),
    TwitterLink: createLinkField('Twitter'),
    YoutubeLink: createLinkField('Youtube'),
  } as unknown as ComponentFields,
};

export const Default: Story = {
  render: () => {
    return (
      <ArticleDetails
        params={baseParams}
        rendering={{
          ...baseRendering,
          placeholders: {
            [`article-details-${baseParams.DynamicPlaceholderId}`]: [SocialFollowShareRendering],
            [`article-details-author-${baseParams.DynamicPlaceholderId}`]: [SocialFollowShareRendering],
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

export const WithPlaceholders: Story = {
  render: () => {
    return <ArticleDetails params={baseParams} rendering={baseRendering} fields={baseFields} />;
  },
};
