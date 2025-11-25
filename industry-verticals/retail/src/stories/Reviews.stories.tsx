import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ComponentProps } from 'react';
import { Default as Reviews } from '../components/reviews/Reviews';
import { CommonParams, CommonRendering } from './common/commonData';
import { createReviews } from './helpers/createItems';
import { createTextField } from './helpers/createFields';
import { expect, userEvent, within } from 'storybook/internal/test';

type StoryProps = ComponentProps<typeof Reviews> & {
  numberOfReviews: number;
};

const meta = {
  title: 'Page/Reviews',
  component: Reviews,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    numberOfReviews: {
      name: 'Number of reviews',
      control: {
        type: 'range',
        min: 1,
        max: 10,
        step: 1,
      },
    },
  },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'Reviews',
  params: baseParams,
};

export const Default: Story = {
  args: {
    numberOfReviews: 6,
  },
  render: (args) => {
    return (
      <Reviews
        params={baseParams}
        rendering={baseRendering}
        fields={{
          Title: createTextField('Our Client Reviews'),
          Eyebrow: createTextField('Testimonial'),
          Reviews: createReviews(args.numberOfReviews),
        }}
      />
    );
  },
};

export const FourItems: Story = {
  args: {
    numberOfReviews: 4,
  },
  render: (args) => {
    return (
      <Reviews
        params={baseParams}
        rendering={baseRendering}
        fields={{
          Title: createTextField('Our Client Reviews'),
          Eyebrow: createTextField('Testimonial'),
          Reviews: createReviews(args.numberOfReviews),
        }}
      />
    );
  },
};

// Interaction Test
export const NavigationButtonsInteractionTest: Story = {
  args: {
    numberOfReviews: 10,
  },
  render: (args) => {
    return (
      <Reviews
        params={baseParams}
        rendering={baseRendering}
        fields={{
          Title: createTextField('Our Client Reviews'),
          Eyebrow: createTextField('Testimonial'),
          Reviews: createReviews(args.numberOfReviews),
        }}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const prevButton = canvas.getByRole('button', { name: 'Previous Review' });
    const nextButton = canvas.getByRole('button', { name: 'Next Review' });

    // Assert navigation buttons are present
    await expect(prevButton).toBeInTheDocument();
    await expect(nextButton).toBeInTheDocument();

    // Test clicking the next button
    await userEvent.click(nextButton);
    // Small delay to allow swiper transition
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Test clicking the previous button
    await userEvent.click(prevButton);
    // Small delay to allow swiper transition
    await new Promise((resolve) => setTimeout(resolve, 100));
  },
};
