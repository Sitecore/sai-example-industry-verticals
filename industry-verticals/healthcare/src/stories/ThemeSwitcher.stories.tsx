import { Default } from '@/components/theme-switcher/ThemeSwitcher';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ComponentProps } from 'react';
import { expect } from 'storybook/internal/test';

type StoryProps = ComponentProps<typeof Default>;

const meta = {
  title: 'Utilities/Theme Switcher',
  component: Default,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    themes: {
      disable: true,
    },
  },
  play: async ({ canvas, userEvent, step }) => {
    const button = canvas.getByRole('button');

    await step('Initial Theme Selection', async () => {
      const storedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (!storedTheme) {
        expect(document.documentElement.classList.contains('dark')).toBe(prefersDark);
      } else {
        if (storedTheme === 'dark') {
          expect(document.documentElement.classList.contains('dark')).toBe(true);
        } else {
          expect(document.documentElement.classList.contains('dark')).toBe(false);
        }
      }
    });

    await step('User Theme Selection', async () => {
      const isInitialDarkMode = document.documentElement.classList.contains('dark');

      await userEvent.click(button);

      await new Promise((r) => setTimeout(r, 50));
      expect(document.documentElement.classList.contains('dark')).toBe(!isInitialDarkMode);

      await userEvent.click(button);
      await new Promise((r) => setTimeout(r, 50));
      expect(document.documentElement.classList.contains('dark')).toBe(isInitialDarkMode);
    });
  },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

export const ThemeSwitcher: Story = {};
