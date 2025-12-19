import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ComponentProps } from 'react';
import { Default as SectionWrapper } from '../components/section-wrapper/SectionWrapper';
import { CommonParams, CommonRendering } from './common/commonData';
import { renderStorybookPlaceholder } from './helpers/renderStorybookPlaceholder';
import { createLinkField, createTextField } from './helpers/createFields';
import {
  BackgroundColorArgs,
  backgroundColorArgTypes,
  defaultBackgroundColorArgs,
} from './common/commonControls';

type StoryProps = ComponentProps<typeof SectionWrapper> &
  BackgroundColorArgs & {
    hideAccentLine?: boolean;
  };

const meta = {
  title: 'Page Content/Section Wrapper',
  component: SectionWrapper,
  tags: ['autodocs'],
  argTypes: {
    ...backgroundColorArgTypes,
  },
  args: {
    ...defaultBackgroundColorArgs,
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'Section Wrapper',
  params: baseParams,
  placeholders: {
    [`section-wrapper-content-${baseParams.DynamicPlaceholderId}`]: [renderStorybookPlaceholder()],
    [`section-wrapper-searchbar-${baseParams.DynamicPlaceholderId}`]: [
      renderStorybookPlaceholder(),
    ],
  },
};

const baseFields = {
  Title: createTextField('Our Fleet & Experience'),
  Description: createTextField('Modern aircraft and luxurious cabins designed for your comfort'),
  Link: createLinkField('View All'),
};

export const Default: Story = {
  render: (args) => {
    const params = {
      ...baseParams,
      styles: `${baseParams.styles} ${args.BackgroundColor}`,
    };

    return <SectionWrapper params={params} fields={baseFields} rendering={baseRendering} />;
  },
};
