import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default } from '../components/content-section/ContentSection';
import { ComponentProps } from 'react';
import { renderStorybookPlaceholder } from 'src/stories/helpers/renderStorybookPlaceholder';
import { boolToSitecoreCheckbox } from 'src/stories/helpers/boolToSitecoreCheckbox';
import { CommonParams, CommonRendering } from './common/commonData';
import { AppearanceArgs, appearanceArgTypes, defaultAppearanceArgs } from './common/commonControls';
import { createDoctorItems } from './helpers/createItems';
import { createRichTextField, createTextField } from './helpers/createFields';

type StoryProps = ComponentProps<typeof Default> & AppearanceArgs;

const meta = {
  title: 'Page Content/Content Section',
  component: Default,
  tags: ['autodocs'],
  argTypes: {
    ...appearanceArgTypes,
  },
  args: {
    ...defaultAppearanceArgs,
  },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseFields = {
  Heading: createTextField('Our Special Doctors'),
  Description: createRichTextField(1),
};

const baseParams = CommonParams;

const baseRendering = {
  ...CommonRendering,
  componentName: 'ContentSection',
  params: baseParams,
};

export const ContentSection: Story = {
  render: (args) => {
    return (
      <Default
        fields={baseFields}
        rendering={{
          ...baseRendering,
          placeholders: {
            [`content-section-content-${baseParams.DynamicPlaceholderId}`]: [
              renderStorybookPlaceholder(),
            ],
          },
        }}
        params={{
          ...baseParams,
          CurvedTop: boolToSitecoreCheckbox(args.CurvedTop),
          CurvedBottom: boolToSitecoreCheckbox(args.CurvedBottom),
          BlobAccent: boolToSitecoreCheckbox(args.BlobAccent),
          styles: `${baseParams.styles} ${args.BackgroundColor}`,
        }}
      />
    );
  },
};

export const ContentSectionWithContent: Story = {
  render: (args) => {
    return (
      <Default
        fields={baseFields}
        rendering={{
          ...baseRendering,
          placeholders: {
            [`content-section-content-${baseParams.DynamicPlaceholderId}`]: [
              {
                ...CommonRendering,
                componentName: 'DoctorsListing',
                params: {
                  ...CommonParams,
                  FieldNames: 'Slider',
                },
                fields: {
                  items: createDoctorItems(6),
                },
              },
            ],
          },
        }}
        params={{
          ...baseParams,
          CurvedTop: boolToSitecoreCheckbox(args.CurvedTop),
          CurvedBottom: boolToSitecoreCheckbox(args.CurvedBottom),
          BlobAccent: boolToSitecoreCheckbox(args.BlobAccent),
          styles: `${baseParams.styles} ${args.BackgroundColor}`,
        }}
      />
    );
  },
};
