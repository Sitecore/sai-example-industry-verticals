import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, waitFor } from 'storybook/test';
import { Default as Navigation } from '../components/navigation/Navigation';
import { ComponentProps } from 'react';
import { CommonParams } from './common/commonData';
import { getNavigationFields } from './constants/navFields';

type StoryProps = ComponentProps<typeof Navigation> & {
  withRoot?: boolean;
  isFlat?: boolean;
};

const meta = {
  title: 'Navigation/Navigation',
  component: Navigation,
  tags: ['autodocs'],
  play: async ({ canvasElement, userEvent, args, step }) => {
    await step('Root item logic', async () => {
      const navItems = Array.from(canvasElement.querySelectorAll('li'));

      const hasRootItem = navItems.some(
        (link) =>
          link.classList.contains('level0') &&
          !Array.from(link.classList).some((cls) => cls.startsWith('flat-level'))
      );

      if (args.withRoot) {
        expect(hasRootItem).toBe(true);
      } else {
        expect(hasRootItem).toBe(false);
      }
    });

    await step('Hamburger menu', async () => {
      const hamburger = canvasElement.querySelector('.component.navigation > div:first-child');
      expect(hamburger).toBeInTheDocument();
      if (hamburger) {
        await userEvent.click(hamburger);
        const nav = canvasElement.querySelector('nav');
        expect(nav?.classList.contains('flex')).toBe(true);
      }
    });

    await step('Dropdown menu', async () => {
      const navItems = Array.from(canvasElement.querySelectorAll('li'));
      const itemWithChildren = navItems.find((li) => {
        const chevron = li.querySelector('.flex.items-center.gap-1 > div');
        return chevron && !li.classList.contains('level0');
      });

      if (itemWithChildren) {
        const chevron = itemWithChildren.querySelector(
          '.flex.items-center.gap-1 > div'
        ) as HTMLElement;
        if (chevron) {
          await userEvent.click(chevron);
          const dropdown = itemWithChildren.querySelector('ul');
          expect(dropdown).toBeInTheDocument();
          await waitFor(() => {
            expect(dropdown?.classList.contains('block')).toBe(true);
          });
        }
      }
    });
  },
  argTypes: {
    withRoot: {
      name: 'Include root page',
      control: 'boolean',
      defaultValue: true,
    },
    isFlat: {
      name: 'Flat structure',
      description: 'all items displayed on the same level',
      control: 'boolean',
      defaultValue: false,
    },
  },
  args: {
    withRoot: true,
    isFlat: false,
  },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

export const Default: Story = {
  render: (args) => {
    const fields = getNavigationFields({ withRoot: args.withRoot, flat: args.isFlat });
    return <Navigation params={baseParams} fields={fields} />;
  },
};
