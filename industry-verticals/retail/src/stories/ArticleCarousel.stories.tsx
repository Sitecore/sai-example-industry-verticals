import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CommonParams, CommonRendering } from './common/commonData';
import {
  Default as ArticleCarousel,
  CarouselProps,
} from '../components/article-carousel/ArticleCarousel';
import { createLinkField, createRichTextField, createTextField } from './helpers/createFields';
import { createMockArticles } from './helpers/createItems';
import {
  backgroundColorArgTypes,
  BackgroundColorArgs,
  defaultBackgroundColorArgs,
} from './common/commonControls';
import { expect, userEvent, within } from 'storybook/test';
import clsx from 'clsx';
import { LayoutStyles } from '@/types/styleFlags';

type StoryProps = CarouselProps &
  BackgroundColorArgs & {
    numberOfArticles: number;
    reversed: boolean;
  };

const meta = {
  title: 'Articles/Article Carousel',
  component: ArticleCarousel,
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
    reversed: {
      name: 'Reversed',
      control: {
        type: 'boolean',
      },
    },
  },
  args: {
    numberOfArticles: 5,
    reversed: false,
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
  CarouselTitle: createTextField('We provide you the best experience'),
  CarouselDescription: createRichTextField(1, 'paragraphs'),
  CarouselExplore: createLinkField('Read More'),
};

export const Default: Story = {
  render: (args) => {
    const fields = {
      ...baseFields,
      Articles: createMockArticles(args.numberOfArticles),
    };

    const articleCarouselStyles = clsx(
      baseParams.styles,
      args.BackgroundColor,
      args.reversed && LayoutStyles.Reversed
    );

    const params = {
      ...baseParams,
      styles: articleCarouselStyles,
    };

    return <ArticleCarousel params={params} rendering={baseRendering} fields={fields} />;
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const prevButton = canvas.getByRole('button', { name: /previous article/i });
    const nextButton = canvas.getByRole('button', { name: /next article/i });

    // Test 2: Previous button should be disabled on load (currentIndex = 0)
    expect(prevButton).toBeDisabled();
    expect(prevButton).toHaveClass('article-carousel-btn-disabled');

    // Test 5: Navigate to the end by clicking next button multiple times
    for (let i = 0; i < args.numberOfArticles - 1; i++) {
      await userEvent.click(nextButton);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    // Test 6: Next button should be disabled at the end
    expect(nextButton).toBeDisabled();
    expect(nextButton).toHaveClass('article-carousel-btn-disabled');
  },
};
