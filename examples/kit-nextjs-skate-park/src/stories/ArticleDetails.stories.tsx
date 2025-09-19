import { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as ArticleDetails } from '../components/article-details/ArticleDetails';
import { CommonParams, CommonRendering } from './common/commonData';
import { renderStorybookPlaceholder } from './helpers/renderStorybookPlaceholder';
import { createRichTextField, createTextField, createImageField } from './helpers/createFields';
import { boolToSitecoreCheckbox } from './helpers/boolToSitecoreCheckbox';

type StoryProps = ComponentProps<typeof ArticleDetails> & {
  hideShareWidget?: boolean;
};

const meta = {
  title: 'Articles/Article Details',
  component: ArticleDetails,
  tags: ['autodocs'],
  argTypes: {
    hideShareWidget: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
  },
  args: {
    hideShareWidget: false,
  },
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
    [`article-details-full-width-${baseParams.DynamicPlaceholderId}`]: [
      renderStorybookPlaceholder(),
    ],
  },
};

const baseFields = {
  Title: createTextField(),
  ShortDescription: createTextField(),
  Content: createRichTextField(5),
  Image: createImageField(),
};

export const Default: Story = {
  render: (args) => {
    const params = {
      ...baseParams,
      HideShareWidget: boolToSitecoreCheckbox(args.hideShareWidget),
    };

    return <ArticleDetails params={params} rendering={baseRendering} fields={baseFields} />;
  },
};
