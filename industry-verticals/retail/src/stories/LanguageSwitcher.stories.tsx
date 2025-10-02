import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import LanguageSwitcher from '../components/language-switcher/LanguageSwitcher';
import { CommonParams, CommonRendering } from './common/commonData';

type StoryProps = React.ComponentProps<typeof LanguageSwitcher>;

const meta = {
  title: 'Utilities/LanguageSwitcher',
  component: LanguageSwitcher,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'LanguageSwitcher',
  params: baseParams,
};

export const Default: Story = {
  render: () => <LanguageSwitcher params={baseParams} rendering={baseRendering} />,
};
