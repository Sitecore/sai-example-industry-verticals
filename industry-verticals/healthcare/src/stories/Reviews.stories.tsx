import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ReviewsProps, Default as Reviews } from '../components/reviews/Reviews';
import { CommonParams, CommonRendering } from './common/commonData';
import { CommonStyles } from '@/types/styleFlags';
import clsx from 'clsx';
import { createReviews } from './helpers/createItems';

type StoryProps = ReviewsProps & {
  HideBlobAccent: boolean;
  NumberOfReviews: number;
};

const meta = {
  title: 'Page Content/Reviews',
  component: Reviews,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    HideBlobAccent: {
      control: 'boolean',
      name: 'Hide Blob Accent',
    },
    NumberOfReviews: {
      name: 'Number of reviews',
      control: {
        type: 'range',
        min: 1,
        max: 10,
        step: 1,
      },
    },
  },
  args: {
    HideBlobAccent: false,
    NumberOfReviews: 3,
  },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'Testimonials',
  params: baseParams,
};

export const Default: Story = {
  render: (args) => {
    const promoStyles = clsx(baseParams.styles, args.HideBlobAccent && CommonStyles.HideBlobAccent);

    const params = {
      ...baseParams,
      styles: promoStyles,
    };

    const fields = {
      Reviews: createReviews(args.NumberOfReviews),
    };

    return <Reviews params={params} rendering={baseRendering} fields={fields} />;
  },
};
