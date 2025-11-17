import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as PageHeader } from '../components/page-header/PageHeader';
import { ComponentProps } from 'react';
import { CommonParams, CommonRendering } from './common/commonData';
import { createRichTextField, createTextField } from './helpers/createFields';
import { renderStorybookPlaceholder } from './helpers/renderStorybookPlaceholder';

type StoryProps = ComponentProps<typeof PageHeader>;

const meta = {
  title: 'Page Content/Page Header',
  component: PageHeader,
  tags: ['autodocs'],
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = { ...CommonParams };

const baseRendering = {
  ...CommonRendering,
  componentName: 'PageHeader',
  params: baseParams,
};

export const Default: Story = {
  render: () => (
    <PageHeader
      params={baseParams}
      fields={{
        Title: createTextField('Lighting'),
        Content: createRichTextField(1),
      }}
      rendering={{
        ...baseRendering,
        placeholders: {
          [`page-header-searchbar-${baseParams.DynamicPlaceholderId}`]: [
            renderStorybookPlaceholder(),
          ],
        },
      }}
    />
  ),
};
