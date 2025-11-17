import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default } from '../components/header-extended/HeaderExtended';
import { ComponentProps } from 'react';
import { renderStorybookPlaceholder } from 'src/stories/helpers/renderStorybookPlaceholder';
import { CommonParams, CommonRendering } from './common/commonData';
import { createImageField, createLinkField } from './helpers/createFields';
import { ComponentFields } from '@sitecore-content-sdk/nextjs';
import { getNavigationFields } from './constants/navFields';

type StoryProps = ComponentProps<typeof Default>;

const meta = {
  title: 'Global Components/Header',
  component: Default,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseFields = {
  LogoLight: createImageField('logo'),
  LogoDark: createImageField('logo'),
  PhoneLink: createLinkField(),
  MailLink: createLinkField(),
};

const baseParams = CommonParams;

const baseRendering = {
  ...CommonRendering,
  componentName: 'Header',
  params: baseParams,
};

export const Header: Story = {
  render: () => {
    return (
      <Default
        fields={baseFields}
        rendering={{
          ...baseRendering,
          placeholders: {
            [`header-nav-${baseParams.DynamicPlaceholderId}`]: [renderStorybookPlaceholder()],
            [`header-theme-switcher-${baseParams.DynamicPlaceholderId}`]: [
              renderStorybookPlaceholder(),
            ],
          },
        }}
        params={baseParams}
      />
    );
  },
};

const NavigationData = {
  fields: getNavigationFields() as unknown as ComponentFields,
  params: {
    ...CommonParams,
  },
};

export const HeaderWithContent: Story = {
  render: () => {
    return (
      <Default
        fields={baseFields}
        rendering={{
          ...baseRendering,
          placeholders: {
            [`header-nav-${baseParams.DynamicPlaceholderId}`]: [
              {
                ...CommonRendering,
                componentName: 'Navigation',
                ...NavigationData,
              },
            ],
            [`header-theme-switcher-${baseParams.DynamicPlaceholderId}`]: [
              {
                ...CommonRendering,
                componentName: 'ThemeSwitcher',
              },
            ],
          },
        }}
        params={baseParams}
      />
    );
  },
};
