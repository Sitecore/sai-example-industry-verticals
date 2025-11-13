import type { ArgTypes } from '@storybook/nextjs-vite';

// CURVES
export type CurveArgs = {
  CurvedTop: boolean;
  CurvedBottom: boolean;
};

export const curveArgTypes: ArgTypes = {
  CurvedTop: {
    control: 'boolean',
    name: 'Curved Top',
  },
  CurvedBottom: {
    control: 'boolean',
    name: 'Curved Bottom',
  },
};

export const defaultCurveArgs: CurveArgs = {
  CurvedTop: false,
  CurvedBottom: false,
};

// BLOBS
export type BlobAccentArgs = {
  BlobAccent: boolean;
};

export const blobAccentArgTypes: ArgTypes = {
  BlobAccent: {
    control: 'boolean',
    name: 'Show Blob',
  },
};

export const defaultBlobAccentArgs: BlobAccentArgs = {
  BlobAccent: false,
};

// BACKGROUND COLORS
export type BackgroundColorArgs = {
  BackgroundColor: string;
};

export const backgroundColorArgTypes: ArgTypes = {
  BackgroundColor: {
    control: 'select',
    name: 'Background Color',
    options: ['', 'Clean background', 'Color background', 'Dark background', 'Gray background'],
    mapping: {
      '': '',
      'Clean background': 'component-clean-background',
      'Color background': 'component-color-background',
      'Dark background': 'component-dark-background',
      'Gray background': 'component-gray-background',
    },
  },
};

export const defaultBackgroundColorArgs: BackgroundColorArgs = {
  BackgroundColor: '',
};

// COMPOSITE
export type AppearanceArgs = CurveArgs & BlobAccentArgs & BackgroundColorArgs;
export const appearanceArgTypes: ArgTypes = {
  ...curveArgTypes,
  ...blobAccentArgTypes,
  ...backgroundColorArgTypes,
};
export const defaultAppearanceArgs: AppearanceArgs = {
  ...defaultCurveArgs,
  ...defaultBlobAccentArgs,
  ...defaultBackgroundColorArgs,
};
