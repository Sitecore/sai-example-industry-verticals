import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CommonParams, CommonRendering } from './common/commonData';
import {
  Default as SelectedArticles,
  CarouselProps,
} from '../components/selected-articles/SelectedArticles';
import { createRichTextField, createTextField } from './helpers/createFields';
import { createMockArticles } from './helpers/createItems';
import {
  backgroundColorArgTypes,
  BackgroundColorArgs,
  defaultBackgroundColorArgs,
} from './common/commonControls';
import clsx from 'clsx';

type StoryProps = CarouselProps &
  BackgroundColorArgs & {
    numberOfArticles: number;
  };

const meta = {
  title: 'Articles/SelectedArticles',
  component: SelectedArticles,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    ...backgroundColorArgTypes,
    numberOfArticles: {
      name: 'Number of articles',
      control: {
        type: 'range',
        min: 1,
        max: 10,
        step: 1,
      },
    },
  },
  args: {
    numberOfArticles: 5,
    ...defaultBackgroundColorArgs,
  },

  tags: ['autodocs'],
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'Article',
  params: baseParams,
};

const baseFields = {
  Title: createTextField('Get Inspired'),
  Description: createRichTextField(1, 'paragraphs'),
};

export const Default: Story = {
  render: (args) => {
    const fields = {
      ...baseFields,
      Articles: createMockArticles(args.numberOfArticles),
    };

    const selectedArticlesStyles = clsx(baseParams.styles, args.BackgroundColor);

    const params = {
      ...baseParams,
      styles: selectedArticlesStyles,
    };

    return <SelectedArticles params={params} rendering={baseRendering} fields={fields} />;
  },
};
