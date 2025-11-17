import type { Preview } from '@storybook/nextjs-vite';
import { SitecoreProvider } from '@sitecore-content-sdk/nextjs';
import { mockPageData } from './mockData/mockPageData';
import { mockApiData } from './mockData/mockApiData';
import mockComponentMap from './mockData/mockComponentMap';
import { I18nProvider } from 'next-localization';
import { ThemeProvider } from 'next-themes';
import { withThemeByClassName } from '@storybook/addon-themes';

import '../src/assets/main.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
    layout: 'fullscreen',
  },

  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <SitecoreProvider componentMap={mockComponentMap} page={mockPageData} api={mockApiData}>
          <I18nProvider locale="en" lngDict={{}}>
            <Story />
          </I18nProvider>
        </SitecoreProvider>
      </ThemeProvider>
    ),
  ],

  argTypes: {
    fields: { table: { disable: true }, control: false },
    params: { table: { disable: true }, control: false },
    rendering: { table: { disable: true }, control: false },
  },
};

export default preview;
