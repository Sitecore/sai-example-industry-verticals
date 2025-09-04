import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as Container } from '../components/container/Container';
import { ComponentProps } from 'react';
import { renderStorybookPlaceholder } from './helpers/renderStorybookPlaceholder';
import { CommonParams, CommonRendering } from './common/commonData';
import {
  BackgroundColorArgs,
  backgroundColorArgTypes,
  defaultBackgroundColorArgs,
  defaultHighlightArgs,
  defaultLayoutArgs,
  HighlightArgs,
  HighlightArgTypes,
  LayoutArgs,
  LayoutArgTypes,
} from './common/commonControls';
import { createRichTextField } from './helpers/createFields';

type StoryProps = ComponentProps<typeof Container> &
  BackgroundColorArgs &
  HighlightArgs &
  LayoutArgs & {
    boxed?: boolean;
    bordered?: boolean;
    centered?: boolean;
  };

const meta = {
  title: 'Page Structure/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    ...backgroundColorArgTypes,
    ...HighlightArgTypes,
    ...LayoutArgTypes,
    boxed: {
      name: 'Boxed',
      control: { type: 'boolean' },
      defaultValue: false,
    },
    bordered: {
      name: 'Bordered',
      control: { type: 'boolean' },
      defaultValue: false,
    },
    centered: {
      name: 'Centered',
      control: { type: 'boolean' },
      defaultValue: false,
    },
  },
  args: {
    ...defaultBackgroundColorArgs,
    ...defaultHighlightArgs,
    ...defaultLayoutArgs,
    boxed: false,
    bordered: false,
    centered: false,
  },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'Container',
  params: baseParams,
};

export const Default: Story = {
  render: (args) => {
    return (
      <Container
        params={{
          ...baseParams,
          styles: `${baseParams.styles}
            ${args.boxed ? 'boxed' : ''}
            ${args.bordered ? 'sxa-bordered' : ''}
            ${args.centered ? 'container' : ''}
            ${args.BackgroundColor}
            ${args.Highlight.join(' ')}
            ${args.Indent.join(' ')}
            ${args.ContentAlignment.join(' ')}
          `,
        }}
        rendering={{
          ...baseRendering,
          placeholders: {
            [`container-${baseParams.DynamicPlaceholderId}`]: [renderStorybookPlaceholder()],
          },
        }}
      />
    );
  },
};

export const WithPlaceholderData: Story = {
  render: (args) => {
    return (
      <Container
        params={{
          ...baseParams,
          styles: `${baseParams.styles}
            ${args.boxed ? 'boxed' : ''}
            ${args.bordered ? 'sxa-bordered' : ''}
            ${args.centered ? 'container' : ''}
            ${args.BackgroundColor}
            ${args.Highlight.join(' ')}
            ${args.Indent.join(' ')}
            ${args.ContentAlignment.join(' ')}
          `,
        }}
        rendering={{
          ...baseRendering,
          placeholders: {
            [`container-${baseParams.DynamicPlaceholderId}`]: [
              {
                ...CommonRendering,
                componentName: 'RichText',
                params: CommonParams,
                fields: {
                  Text: createRichTextField(3),
                },
              },
            ],
          },
        }}
      />
    );
  },
};
