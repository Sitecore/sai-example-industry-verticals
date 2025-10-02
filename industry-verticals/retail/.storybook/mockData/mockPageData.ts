import { LayoutServicePageState } from '@sitecore-content-sdk/nextjs';

export const mockPageData = {
  layout: {
    sitecore: {
      context: {
        pageEditing: false,
        language: 'en',
        site: {
          name: 'storybook-site',
        },
      },
      route: {
        name: 'storybook',
        displayName: 'Storybook Mock Page',
        fields: {},
        templateId: 'storybook-template-id',
        templateName: 'Storybook Template',
        placeholders: {},
      },
    },
  },
  siteName: 'storybook-site',
  locale: 'en',
  mode: {
    name: LayoutServicePageState.Normal,
    designLibrary: {
      isVariantGeneration: false,
    },
    isNormal: true,
    isPreview: false,
    isEditing: false,
    isDesignLibrary: false,
  },
};
