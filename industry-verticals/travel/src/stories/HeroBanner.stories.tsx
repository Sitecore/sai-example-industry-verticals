import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Default as HeroBanner,
  TravelBlog,
  FlightBooking,
} from '../components/hero-banner/HeroBanner';
import { ComponentProps } from 'react';
import { CommonParams, CommonRendering } from './common/commonData';
import { createImageField, createRichTextField, createTextField } from './helpers/createFields';
import { renderStorybookPlaceholder } from './helpers/renderStorybookPlaceholder';

type StoryProps = ComponentProps<typeof HeroBanner> & {
  variant: 'TravelBlog' | 'FlightBooking';
  hasVideo: boolean;
};

const meta = {
  title: 'Page Content/Hero Banner',
  component: HeroBanner,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: {
      control: 'select',
      name: 'Variant',
      options: ['TravelBlog', 'FlightBooking'],
      description: 'Choose the hero banner variant',
    },
    hasVideo: {
      control: 'boolean',
      name: 'Has Video',
      description: 'Show video background instead of image',
    },
  },
  args: {
    variant: 'TravelBlog',
    hasVideo: false,
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

    const Component = args.variant === 'FlightBooking' ? FlightBooking : TravelBlog;
    return <Component params={baseParams} rendering={rendering} fields={fields} />;
  },
};

export const FlightBookingVariant: Story = {
  args: {
    variant: 'FlightBooking',
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

    return <FlightBooking params={baseParams} rendering={rendering} fields={fields} />;
  },
};
