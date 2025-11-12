import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as Image } from '../components/image/Image';
import { ComponentProps } from 'react';
import { CommonParams, CommonRendering } from './common/commonData';
import { createImageField, createTextField, createLinkField } from './helpers/createFields';

type StoryProps = ComponentProps<typeof Image> & {
  caption?: string;
  linkText?: string;
  hasLink?: boolean;
};

const meta = {
  title: 'Media/Image',
  component: Image,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    caption: {
      control: 'text',
      description: 'Caption text for the image',
    },
    linkText: {
      control: 'text',
      description: 'Tooltip text when hovering over the image (when hasLink is true)',
    },
    hasLink: {
      control: 'boolean',
      description: 'Whether the image should have a link',
    },
  },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'Image',
  params: baseParams,
};

export const Default: Story = {
  args: {
    caption: 'Image Caption',
    hasLink: false,
    linkText: 'Link Text',
  },
  render: ({ caption, hasLink, linkText }) => {
    return (
      <Image
        params={baseParams}
        rendering={baseRendering}
        fields={{
          Image: createImageField('placeholder'),
          ImageCaption: caption
            ? createTextField(caption, 1)
            : {
                value: '',
              },
          TargetUrl: hasLink
            ? createLinkField(linkText)
            : {
                value: {},
              },
        }}
      />
    );
  },
};
