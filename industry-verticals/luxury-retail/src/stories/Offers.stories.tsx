import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Default as Offers } from '../components/offers/Offers';
import { ComponentProps } from 'react';
import { CommonParams, CommonRendering } from './common/commonData';
import { createOfferItems } from './helpers/createItems';
import { generateId } from './helpers/generateId';
import { boolToSitecoreCheckbox } from './helpers/boolToSitecoreCheckbox';

type StoryProps = ComponentProps<typeof Offers> & {
  numberOfOffers: number;
  autoPlay: boolean;
};

const meta = {
  title: 'Page Content/Offers',
  component: Offers,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    numberOfOffers: {
      name: 'Number of offers',
      control: {
        type: 'range',
        min: 1,
        max: 10,
        step: 1,
      },
    },
    autoPlay: {
      name: 'Auto Play',
      control: {
        type: 'boolean',
      },
    },
  },
  args: {
    numberOfOffers: 3,
    autoPlay: true,
  },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'Offers',
  params: baseParams,
};

export const Default: Story = {
  render: (args) => {
    const uid = generateId();
    return (
      <Offers
        params={{
          ...baseParams,
          Autoplay: boolToSitecoreCheckbox(args.autoPlay),
        }}
        rendering={{ ...baseRendering, uid }}
        fields={{
          Offers: createOfferItems(args.numberOfOffers),
        }}
      />
    );
  },
};

export const SingleOffer: Story = {
  args: {
    numberOfOffers: 1,
  },
  render: (args) => {
    const uid = generateId();
    return (
      <Offers
        params={{
          ...baseParams,
          Autoplay: boolToSitecoreCheckbox(args.autoPlay),
        }}
        rendering={{ ...baseRendering, uid }}
        fields={{
          Offers: createOfferItems(args.numberOfOffers),
        }}
      />
    );
  },
};

export const MultipleOffers: Story = {
  args: {
    numberOfOffers: 7,
  },
  render: (args) => {
    const uid = generateId();
    return (
      <Offers
        params={{
          ...baseParams,
          Autoplay: boolToSitecoreCheckbox(args.autoPlay),
        }}
        rendering={{ ...baseRendering, uid }}
        fields={{
          Offers: createOfferItems(args.numberOfOffers),
        }}
      />
    );
  },
};

export const WithoutAutoPlay: Story = {
  args: {
    numberOfOffers: 3,
    autoPlay: false,
  },
  render: (args) => {
    const uid = generateId();
    return (
      <Offers
        params={{
          ...baseParams,
          Autoplay: boolToSitecoreCheckbox(args.autoPlay),
        }}
        rendering={{ ...baseRendering, uid }}
        fields={{
          Offers: createOfferItems(args.numberOfOffers),
        }}
      />
    );
  },
};

// Interaction Tests
export const NavigationButtonsTest: Story = {
  name: 'Navigation Buttons Interaction Test',
  args: {
    numberOfOffers: 3,
    autoPlay: false,
  },
  render: (args) => {
    const uid = generateId();
    return (
      <Offers
        params={{
          ...baseParams,
          Autoplay: boolToSitecoreCheckbox(args.autoPlay),
        }}
        rendering={{ ...baseRendering, uid }}
        fields={{
          Offers: createOfferItems(args.numberOfOffers),
        }}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const prevButton = canvas.getByRole('button', { name: 'Previous offer' });
    const nextButton = canvas.getByRole('button', { name: 'Next offer' });

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

export const KeyboardNavigationTest: Story = {
  name: 'Keyboard Navigation Test',
  args: {
    numberOfOffers: 3,
    autoPlay: false,
  },
  render: (args) => {
    const uid = generateId();
    return (
      <Offers
        params={{
          ...baseParams,
          Autoplay: boolToSitecoreCheckbox(args.autoPlay),
        }}
        rendering={{ ...baseRendering, uid }}
        fields={{
          Offers: createOfferItems(args.numberOfOffers),
        }}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find navigation buttons by their accessible names
    const prevButton = canvas.getByRole('button', { name: 'Previous offer' });
    const nextButton = canvas.getByRole('button', { name: 'Next offer' });

    // Test keyboard navigation
    await userEvent.tab(); // Focus should move to first button
    await userEvent.keyboard('{Enter}'); // Activate button with Enter

    await new Promise((resolve) => setTimeout(resolve, 100));

    await userEvent.tab(); // Move to next button
    await userEvent.keyboard(' '); // Activate button with Space

    await new Promise((resolve) => setTimeout(resolve, 100));

    // Verify buttons are still accessible
    await expect(prevButton).toBeInTheDocument();
    await expect(nextButton).toBeInTheDocument();
  },
};
