import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Default as HeroBanner,
  Centered,
  CenteredLarge,
} from '../components/hero-banner/HeroBanner';
import { ComponentProps } from 'react';
import { CommonParams, CommonRendering } from './common/commonData';
import { createImageField, createRichTextField, createTextField } from './helpers/createFields';
import { renderStorybookPlaceholder } from './helpers/renderStorybookPlaceholder';

type StoryProps = ComponentProps<typeof HeroBanner> & {
  variant: 'Centered' | 'CenteredLarge';
  hasVideo: boolean;
};

const meta = {
  title: 'Page Content/Hero Banner',
  component: HeroBanner,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'HeroBanner',
  params: baseParams,
};

const baseFields = {
  Image: createImageField('placeholder'),
  Video: createImageField('placeholder'),
  Title: createTextField('Discover Your Next Adventure'),
  Description: createRichTextField(1, 'paragraphs'),
};

export const Default: Story = {
  render: (args) => {
    const fields = {
      ...baseFields,
      Video: args.hasVideo ? createImageField('placeholder') : { value: { src: '' } },
    };

    const placeholderKey = `hero-banner-search-bar-${baseParams.DynamicPlaceholderId}`;

    const rendering = {
      ...baseRendering,
      placeholders: {
        [placeholderKey]: [renderStorybookPlaceholder()],
      },
    };

    const Component = args.variant === 'CenteredLarge' ? CenteredLarge : Centered;
    return <Component params={baseParams} rendering={rendering} fields={fields} />;
  },
};

export const CenteredLargeVariant: Story = {
  args: {
    variant: 'CenteredLarge',
    hasVideo: false,
  },
  render: (args) => {
    const fields = {
      ...baseFields,
      Title: createTextField('Book Your Dream Flight'),
      Description: createRichTextField(1, 'paragraphs'),
      Video: args.hasVideo ? createImageField('placeholder') : { value: { src: '' } },
    };

    const placeholderKey = `hero-banner-search-bar-${baseParams.DynamicPlaceholderId}`;
    const rendering = {
      ...baseRendering,
      placeholders: {
        [placeholderKey]: [renderStorybookPlaceholder()],
      },
    };

    return <CenteredLarge params={baseParams} rendering={rendering} fields={fields} />;
  },
};
