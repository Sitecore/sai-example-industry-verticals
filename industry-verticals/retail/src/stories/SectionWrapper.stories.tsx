import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ComponentProps } from 'react';
import { Default as SectionWrapper } from '../components/section-wrapper/SectionWrapper';
import { CommonParams, CommonRendering } from './common/commonData';
import { renderStorybookPlaceholder } from './helpers/renderStorybookPlaceholder';
import { createLinkField, createTextField } from './helpers/createFields';
import { boolToSitecoreCheckbox } from './helpers/boolToSitecoreCheckbox';
import { createProductItems } from './helpers/createItems';
import { ComponentFields } from '@sitecore-content-sdk/nextjs';
import {
  BackgroundColorArgs,
  backgroundColorArgTypes,
  defaultBackgroundColorArgs,
} from './common/commonControls';
import clsx from 'clsx';
import { CommonStyles } from '@/types/styleFlags';

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
    hideAccentLine: {
      name: 'Hide Accent Line',
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
  },
  args: {
    ...defaultBackgroundColorArgs,
    hideAccentLine: false,
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
  },
};

const baseFields = {
  Title: createTextField('Browse The Range'),
  Link: createLinkField('View All'),
};

export const Default: Story = {
  render: (args) => {
    const params = {
      ...baseParams,
      HideAccentLine: boolToSitecoreCheckbox(args.hideAccentLine),
      styles: clsx(
        baseParams.styles,
        args.BackgroundColor,
        args.hideAccentLine && CommonStyles.HideAccentLine
      ),
    };

    return <SectionWrapper params={params} fields={baseFields} rendering={baseRendering} />;
  },
};

export const WithPlaceholderData: Story = {
  render: (args) => {
    const params = {
      ...baseParams,
      HideAccentLine: boolToSitecoreCheckbox(args.hideAccentLine),
      styles: clsx(
        baseParams.styles,
        args.BackgroundColor,
        args.hideAccentLine && CommonStyles.HideAccentLine
      ),
    };
    const rendering = {
      ...baseRendering,
      placeholders: {
        [`section-wrapper-content-${baseParams.DynamicPlaceholderId}`]: [
          {
            ...CommonRendering,
            componentName: 'AllProductsCarousel',
            params: CommonParams,
            fields: {
              items: createProductItems(5),
            } as unknown as ComponentFields,
          },
        ],
      },
    };

    return <SectionWrapper params={params} fields={baseFields} rendering={rendering} />;
  },
};
