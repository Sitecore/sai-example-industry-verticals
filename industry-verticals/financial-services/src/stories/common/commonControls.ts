import { ArgTypes } from 'storybook/internal/types';

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
      'Clean background': 'container-clean-background',
      'Color background': 'container-color-background',
      'Dark background': 'container-dark-background',
      'Gray background': 'container-gray-background',
    },
  },
};

export const defaultBackgroundColorArgs: BackgroundColorArgs = {
  BackgroundColor: '',
};

// ADD HIGHLIGHT
export type HighlightArgs = {
  Highlight: string[];
};

export const HighlightArgTypes: ArgTypes = {
  Highlight: {
    control: 'inline-check',
    name: 'Add highlight',
    options: ['Highlight left', 'Highlight right', 'Highlight top', 'Highlight bottom'],
    mapping: {
      'Highlight left': 'highlighted-left',
      'Highlight right': 'highlighted-right',
      'Highlight top': 'highlighted-top',
      'Highlight bottom': 'highlighted-bottom',
    },
  },
};

export const defaultHighlightArgs: HighlightArgs = {
  Highlight: [''],
};

// SPACING
export type IndentArgs = {
  Indent: string[];
};

export const IndentArgTypes: ArgTypes = {
  Indent: {
    control: 'inline-check',
    name: 'Spacing',
    options: ['Indent top', 'Indent bottom', 'Indent side'],
    mapping: {
      'Indent top': 'indent-top',
      'Indent bottom': 'indent-bottom',
      'Indent side': 'indent',
    },
  },
};

export const defaultIndentArgs: IndentArgs = {
  Indent: [''],
};

// CONTENT ALIGNMENT
export type ContentAlignmentArgs = {
  ContentAlignment: string[];
};

export const ContentAlignmentArgTypes: ArgTypes = {
  ContentAlignment: {
    control: 'inline-check',
    name: 'Content alignment',
    options: ['Align left', 'Align right', 'Align center'],
    mapping: {
      'Align content left': 'position-left',
      'Align content right': 'position-right',
      'Align content center': 'position-center',
    },
  },
};

export const defaultContentAlignmentArgs: ContentAlignmentArgs = {
  ContentAlignment: [''],
};

// LAYOUT COMBINED
export type LayoutArgs = IndentArgs & ContentAlignmentArgs;
export const LayoutArgTypes: ArgTypes = {
  ...IndentArgTypes,
  ...ContentAlignmentArgTypes,
};
export const defaultLayoutArgs: LayoutArgs = {
  ...defaultIndentArgs,
  ...defaultContentAlignmentArgs,
};
