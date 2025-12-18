import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as IconLinkList } from '../components/icon-link-list/IconLinkList';
import { ComponentProps } from 'react';
import { CommonParams, CommonRendering } from './common/commonData';
import { createTextField } from './helpers/createFields';
import { createIGQLData } from './helpers/createIGQLData';
import { createIconLinkItems } from './helpers/createItems';

type StoryProps = ComponentProps<typeof IconLinkList> & {
  numberOfItems: number;
  vertical?: boolean;
};

const meta = {
  title: 'Navigation/IconLinkList',
  component: IconLinkList,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    numberOfItems: {
      name: 'Number of links',
      control: {
        type: 'range',
        min: 1,
        max: 21,
        step: 1,
      },
    },
    vertical: {
      name: 'Vertical List',
      control: { type: 'boolean' },
      defaultValue: false,
    },
  },
  args: {
    numberOfItems: 3,
    vertical: false,
  },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'IconLinkList',
  params: baseParams,
};

export const Default: Story = {
  args: {
    vertical: false,
  },
  render: (args) => {
    return (
      <IconLinkList
        params={{
          ...baseParams,
          styles: `${baseParams.styles} ${args.vertical ? 'list-vertical' : ''}`,
        }}
        rendering={baseRendering}
        fields={createIGQLData({
          count: args.numberOfItems,
          createItems: createIconLinkItems,
          topLevelFields: {
            title: createTextField('Services'),
          },
        }) as unknown as ComponentProps<typeof IconLinkList>['fields']}
      />
    );
  },
};

export const Vertical: Story = {
  args: {
    vertical: true,
  },
  render: (args) => {
    return (
      <IconLinkList
        params={{
          ...baseParams,
          styles: `${baseParams.styles} ${args.vertical ? 'list-vertical' : ''}`,
        }}
        rendering={baseRendering}
        fields={createIGQLData({
          count: args.numberOfItems,
          createItems: createIconLinkItems,
          topLevelFields: {
            title: createTextField('Services'),
          },
        }) as unknown as ComponentProps<typeof IconLinkList>['fields']}
      />
    );
  },
};
