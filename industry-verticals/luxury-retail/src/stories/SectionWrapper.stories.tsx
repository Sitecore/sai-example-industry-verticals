import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ComponentProps } from 'react';
import { Default as SectionWrapper } from '../components/section-wrapper/SectionWrapper';
import { CommonParams, CommonRendering } from './common/commonData';
import { renderStorybookPlaceholder } from './helpers/renderStorybookPlaceholder';
import { createLinkField, createTextField } from './helpers/createFields';
import { boolToSitecoreCheckbox } from './helpers/boolToSitecoreCheckbox';
import { createProductItems } from './helpers/createItems';
import { ComponentFields, LinkField } from '@sitecore-content-sdk/nextjs';
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
    [`section-wrapper-searchbar-${baseParams.DynamicPlaceholderId}`]: [
      renderStorybookPlaceholder(),
    ],
  },
};

const baseFields = {
  Title: createTextField('The new collection has arrived'),
  Description: createTextField(
    'Discover accessories that transforms spaces into sanctuaries—soft glows, clean lines, and timeless elegance.'
  ),
  Link: createLinkField('View All'),
};

export const Default: Story = {
  render: (args) => {
    const params = {
      ...baseParams,
      HideAccentLine: boolToSitecoreCheckbox(args.hideAccentLine),
      styles: `${baseParams.styles} ${args.BackgroundColor}`,
    };

    return <SectionWrapper params={params} fields={baseFields} rendering={baseRendering} />;
  },
};

export const WithPlaceholderData: Story = {
  render: (args) => {
    const params = {
      ...baseParams,
      HideAccentLine: boolToSitecoreCheckbox(args.hideAccentLine),
      styles: `${baseParams.styles} ${args.BackgroundColor}`,
    };
    const rendering = {
      ...baseRendering,
      placeholders: {
        [`section-wrapper-content-${baseParams.DynamicPlaceholderId}`]: [
          {
            ...CommonRendering,
            componentName: 'RelatedProducts',
            params: CommonParams,
            fields: {
              ProductsList: createProductItems(8),
            } as unknown as ComponentFields,
          },
        ],
      },
    };
    const fields = {
      ...baseFields,
      Link: {} as LinkField,
    };

    return <SectionWrapper params={params} fields={fields} rendering={rendering} />;
  },
};
