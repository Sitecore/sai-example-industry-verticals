import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as SocialFeed } from '../components/social-feed/SocialFeed';
import { ComponentProps } from 'react';
import { CommonParams, CommonRendering } from './common/commonData';
import { createImageField, createTextField } from './helpers/createFields';

type StoryProps = ComponentProps<typeof SocialFeed>;

const meta = {
  title: 'Page Content/SocialFeed',
  component: SocialFeed,
  tags: ['autodocs'],
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'SocialFeed',
  params: baseParams,
};

const baseFields = {
  Eyebrow: createTextField('Share your own setup with'),
  Heading: createTextField('#FormaLuxDécor'),
  Image1: createImageField(),
  Image2: createImageField(),
  Image3: createImageField(),
  Image4: createImageField(),
  Image5: createImageField(),
  Image6: createImageField(),
  Image7: createImageField(),
  Image8: createImageField(),
  Image9: createImageField(),
};

export const Default: Story = {
  render: () => {
    return <SocialFeed params={baseParams} rendering={baseRendering} fields={baseFields} />;
  },
};
