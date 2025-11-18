import { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as HeroBanner, TopContent } from '../components/hero-banner/HeroBanner';
import { CommonParams, CommonRendering } from './common/commonData';
import { createTextField } from './helpers/createFields';
import clsx from 'clsx';
import { HeroBannerStyles, CommonStyles } from '@/types/styleFlags';

type StoryProps = ComponentProps<typeof HeroBanner> & {
  reverseLayout?: boolean;
  withoutGradientOverlay?: boolean;
};

const meta = {
  title: 'Page Content/Hero Banner',
  component: HeroBanner,
  tags: ['autodocs'],
  argTypes: {
    withoutGradientOverlay: {
      name: 'Without Gradient Overlay',
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    reverseLayout: {
      name: 'Reverse Layout',
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
  },
  args: {
    withoutGradientOverlay: false,
    reverseLayout: false,
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
  componentName: 'Hero Banner',
  params: baseParams,
};

// Mock fields for the HeroBanner component
const createHeroBannerFields = () => ({
  Image: {
    value: {
      src: 'https://placehold.co/1920x1080/CCCCCC/FFFFFF?text=Hero+Img',
      alt: 'Hero Banner Image',
      width: 1920,
      height: 1080,
    },
  },
  Video: {
    value: {},
  },
  Title: createTextField('New Collection'),
  Description: createTextField('Timeless pieces for everyday comfort'),
});

export const Default: Story = {
  render: (args) => {
    const params = {
      ...baseParams,
      styles: clsx(
        baseParams.styles,
        args.withoutGradientOverlay && HeroBannerStyles.HideGradientOverlay,
        args.reverseLayout && CommonStyles.Reversed
      ),
    };

    const fields = createHeroBannerFields();

    return <HeroBanner params={params} rendering={baseRendering} fields={fields} />;
  },
};

export const WithTopContent: Story = {
  render: (args) => {
    const params = {
      ...baseParams,
      styles: clsx(
        baseParams.styles,
        args.withoutGradientOverlay && HeroBannerStyles.HideGradientOverlay,
        args.reverseLayout && CommonStyles.Reversed
      ),
    };

    const fields = createHeroBannerFields();

    return <TopContent params={params} rendering={baseRendering} fields={fields} />;
  },
};
