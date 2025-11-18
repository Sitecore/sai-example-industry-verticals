import { ComponentProps } from 'react';
import { Default as DoctorsListing, Slider } from '../components/doctors-listing/DoctorsListing';
import { Meta, StoryObj } from '@storybook/react-vite/*';
import { CommonParams, CommonRendering } from './common/commonData';
import { generateId } from './helpers/generateId';
import { createDoctorItems } from './helpers/createItems';

type StoryProps = ComponentProps<typeof DoctorsListing> & {
  numberOfItems: number;
};

const meta = {
  title: 'Doctors/Doctors Listing',
  component: DoctorsListing,
  tags: ['autodocs'],
  argTypes: {
    numberOfItems: {
      name: 'Number of doctors',
      control: {
        type: 'range',
        min: 1,
        max: 21,
        step: 1,
      },
    },
  },
  args: {
    numberOfItems: 3,
  },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'Doctors Listing',
  params: baseParams,
};

export const Default: Story = {
  render: (args) => {
    const uid = generateId();
    return (
      <DoctorsListing
        params={{ ...baseParams }}
        rendering={{ ...baseRendering, uid }}
        fields={{
          items: createDoctorItems(args.numberOfItems),
        }}
      />
    );
  },
};

export const SliderStory: Story = {
  name: 'Slider',
  args: {
    numberOfItems: 5,
  },
  render: (args) => {
    const uid = generateId();
    return (
      <Slider
        params={{ ...baseParams }}
        rendering={{ ...baseRendering, uid }}
        fields={{
          items: createDoctorItems(args.numberOfItems),
        }}
      />
    );
  },
};
