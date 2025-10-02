import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as Breadcrumb } from '../components/breadcrumb/Breadcrumb';
import { ComponentProps } from 'react';
import { CommonParams, CommonRendering } from './common/commonData';
import { createIGQLField, createLinkField, createTextField } from './helpers/createFields';

type StoryProps = ComponentProps<typeof Breadcrumb>;

const meta = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'Breadcrumb',
  params: baseParams,
};

const createBreadcrumbItem = (text: string) => {
  return {
    Id: `${text}-${Date.now()}`,
    Href: '#',
    Querystring: '',
    DisplayName: text,
    Title: createTextField(text),
    NavigationTitle: createTextField(text),
    id: `${text}-${Date.now()}`,
    name: text,
    title: createIGQLField(createTextField(text)),
    navigationTitle: createIGQLField(createTextField(text)),
    url: createLinkField(text),
    navigationFilter: {
      jsonValue: [],
    },
  };
};

export const Default: Story = {
  render: () => {
    return (
      <Breadcrumb
        params={baseParams}
        rendering={baseRendering}
        fields={{
          data: {
            datasource: {
              ...createBreadcrumbItem('Asgaard Sofa'),
              ancestors: [createBreadcrumbItem('Furniture'), createBreadcrumbItem('Home')],
            },
          },
        }}
      />
    );
  },
};

export const DeepLevels: Story = {
  render: () => {
    return (
      <Breadcrumb
        params={baseParams}
        rendering={baseRendering}
        fields={{
          data: {
            datasource: {
              ...createBreadcrumbItem('Asgaard Sofa'),
              ancestors: [
                createBreadcrumbItem('Sofas'),
                createBreadcrumbItem('Living Room'),
                createBreadcrumbItem('Furniture'),
                createBreadcrumbItem('Home'),
              ],
            },
          },
        }}
      />
    );
  },
};

export const LongTitle: Story = {
  render: () => {
    return (
      <Breadcrumb
        params={baseParams}
        rendering={baseRendering}
        fields={{
          data: {
            datasource: {
              ...createBreadcrumbItem('Exploring new ways of decorating'),
              ancestors: [createBreadcrumbItem('Room Inspirations'), createBreadcrumbItem('Home')],
            },
          },
        }}
      />
    );
  },
};
