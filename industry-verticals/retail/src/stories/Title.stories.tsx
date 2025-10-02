import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as Title } from '../components/title/Title';
import { ComponentProps } from 'react';
import { CommonParams, CommonRendering } from './common/commonData';
import { createIGQLData } from './helpers/createIGQLData';
import { createIGQLField } from './helpers/createFields';

type StoryProps = ComponentProps<typeof Title>;

const meta = {
  title: 'Page Content/Title',
  component: Title,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = { ...CommonParams };

const baseRendering = {
  ...CommonRendering,
  componentName: 'Title',
  params: baseParams,
};

const fields = createIGQLData({
  createItems: () => [],
  count: 0,
  topLevelFields: {
    url: {
      path: '/about',
      siteName: 'website',
    },
    field: createIGQLField({
      value: 'About Us',
    }),
  },
});

export const Default: Story = {
  render: () => (
    <Title params={baseParams} fields={fields} rendering={{ ...baseRendering, placeholders: {} }} />
  ),
};
