import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as SocialFollow } from '../components/social-follow/SocialFollow';
import { ComponentProps } from 'react';
import { CommonParams, CommonRendering } from './common/commonData';
import { createLinkField } from './helpers/createFields';

type StoryProps = ComponentProps<typeof SocialFollow>;

const meta = {
  title: 'Navigation/SocialFollow',
  component: SocialFollow,
  parameters: {
    layout: 'padded',
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
  componentName: 'SocialFollow',
  params: baseParams,
};

const baseFields = {
  FacebookLink: createLinkField('Facebook'),
  InstagramLink: createLinkField('Instagram'),
  TwitterLink: createLinkField('Twitter'),
};

export const Default: Story = {
  render: () => {
    return <SocialFollow params={baseParams} rendering={baseRendering} fields={baseFields} />;
  },
};
