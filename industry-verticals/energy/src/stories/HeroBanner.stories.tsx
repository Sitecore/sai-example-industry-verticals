import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ComponentProps } from 'react';
import { Default as HeroBanner } from '../components/hero-banner/HeroBanner';
import { CommonParams, CommonRendering } from './common/commonData';
import {
  createImageField,
  createLinkField,
  createRichTextField,
  createTextField,
} from './helpers/createFields';

type StoryProps = ComponentProps<typeof HeroBanner>;

const meta = {
  title: 'Page Content/Hero Banner',
  component: HeroBanner,
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
  componentName: 'Hero Banner',
  params: baseParams,
};

// Mock fields for the HeroBanner component
const createHeroBannerFields = () => ({
  Image: createImageField('placeholder'),
  Video: { value: { src: '' } },
  Title: createTextField('Texas Grid Operations Made Simple'),
  Description: createRichTextField(1, 'paragraphs'),
  CtaLink: createLinkField('View Grid Status'),
  SecondaryCtaLink: createLinkField('Learn More'),
});

export const Default: Story = {
  render: () => {
    const fields = createHeroBannerFields();

    return <HeroBanner params={baseParams} rendering={baseRendering} fields={fields} />;
  },
};

export const WithVideo: Story = {
  render: () => {
    const fields = {
      ...createHeroBannerFields(),
      Video: createImageField('placeholder'),
    };

    return <HeroBanner params={baseParams} rendering={baseRendering} fields={fields} />;
  },
};

export const WithSingleCTA: Story = {
  render: () => {
    const fields = {
      ...createHeroBannerFields(),
      SecondaryCtaLink: {
        value: {
          linktype: '',
          id: '',
          anchor: '',
          querystring: '',
          target: '',
          class: '',
          text: '',
          title: '',
          href: '',
        },
      },
    };

    return <HeroBanner params={baseParams} rendering={baseRendering} fields={fields} />;
  },
};
