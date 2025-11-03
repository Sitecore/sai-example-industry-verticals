import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as LinkList } from '../components/link-list/LinkList';
import { ComponentProps } from 'react';
import { CommonParams, CommonRendering } from './common/commonData';
import { createTextField } from './helpers/createFields';
import { createIGQLData } from './helpers/createIGQLData';
import { createLinkItems } from './helpers/createItems';

type StoryProps = ComponentProps<typeof LinkList> & {
  numberOfItems: number;
  vertical?: boolean;
};

const meta = {
  title: 'Navigation/LinkList',
  component: LinkList,
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
  componentName: 'LinkList',
  params: baseParams,
};

export const Default: Story = {
  args: {
    vertical: false,
  },
  render: (args) => {
    return (
      <LinkList
        params={{
          ...baseParams,
          styles: `${baseParams.styles} ${args.vertical ? 'list-vertical' : ''}`,
        }}
        rendering={baseRendering}
        fields={createIGQLData({
          createItems: createLinkItems,
          count: args.numberOfItems,
          topLevelFields: {
            field: {
              title: createTextField('Services'),
            },
          },
        })}
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
      <LinkList
        params={{
          ...baseParams,
          styles: `${baseParams.styles} ${args.vertical ? 'list-vertical' : ''}`,
        }}
        rendering={baseRendering}
        fields={createIGQLData({
          createItems: createLinkItems,
          count: args.numberOfItems,
          topLevelFields: {
            field: {
              title: createTextField('Services'),
            },
          },
        })}
      />
    );
  },
};
