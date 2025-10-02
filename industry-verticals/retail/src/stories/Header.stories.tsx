import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as Header } from '../components/header/Header';
import { ComponentProps } from 'react';
import { CommonParams, CommonRendering } from './common/commonData';
import { renderStorybookPlaceholder } from './helpers/renderStorybookPlaceholder';
import { getNavigationFields, logoParam } from './constants/navFields';
import { ComponentFields } from '@sitecore-content-sdk/nextjs';

type StoryProps = ComponentProps<typeof Header> & {
  withRoot?: boolean;
  isFlat?: boolean;
  hasLogo?: boolean;
  isSimpleLayout?: boolean;
};

const meta = {
  title: 'Global Elements/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'Header',
  params: baseParams,
};

export const Default: Story = {
  render: () => {
    return (
      <Header
        params={baseParams}
        rendering={{
          ...baseRendering,
          placeholders: {
            [`header-left-${baseParams.DynamicPlaceholderId}`]: [renderStorybookPlaceholder()],
            [`header-nav-${baseParams.DynamicPlaceholderId}`]: [renderStorybookPlaceholder()],
            [`header-right-${baseParams.DynamicPlaceholderId}`]: [renderStorybookPlaceholder()],
          },
        }}
      />
    );
  },
};

export const WithPlaceholderData: Story = {
  render: () => {
    return (
      <Header
        params={baseParams}
        rendering={{
          ...baseRendering,
          placeholders: {
            [`header-left-${baseParams.DynamicPlaceholderId}`]: [
              {
                ...CommonRendering,
                componentName: 'LanguageSwitcher',
                params: CommonParams,
              },
            ],
            [`header-nav-${baseParams.DynamicPlaceholderId}`]: [
              {
                ...CommonRendering,
                componentName: 'Navigation',
                params: { ...CommonParams, Logo: logoParam },
                fields: getNavigationFields() as unknown as ComponentFields,
              },
            ],
            [`header-right-${baseParams.DynamicPlaceholderId}`]: [
              {
                ...CommonRendering,
                componentName: 'NavigationIcons',
                params: CommonParams,
              },
            ],
          },
        }}
      />
    );
  },
};
