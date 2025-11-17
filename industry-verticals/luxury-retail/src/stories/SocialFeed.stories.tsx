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
  Eyebrow: createTextField('Find us on Instagram @essential_living'),
  Heading: createTextField('Be you on Instagram'),
  Image1: createImageField(),
  Image2: createImageField(),
  Image3: createImageField(),
  Image4: createImageField(),
  Image5: createImageField(),
  Image6: createImageField(),
  Image7: createImageField(),
  Image8: createImageField(),
  Image9: createImageField(),
  Caption1: createTextField('@instagramUsername'),
  Caption2: createTextField('@instagramUsername'),
  Caption3: createTextField('@instagramUsername'),
  Caption4: createTextField('@instagramUsername'),
  Caption5: createTextField('@instagramUsername'),
  Caption6: createTextField('@instagramUsername'),
  Caption7: createTextField('@instagramUsername'),
  Caption8: createTextField('@instagramUsername'),
  Caption9: createTextField('@instagramUsername'),
};

export const Default: Story = {
  render: () => {
    return <SocialFeed params={baseParams} rendering={baseRendering} fields={baseFields} />;
  },
};
