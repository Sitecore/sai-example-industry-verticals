import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as Promo, PromoProps } from '../components/promo/Promo';
import { CommonParams, CommonRendering } from './common/commonData';
import {
  createImageField,
  createLinkField,
  createRichTextField,
  createTextField,
} from './helpers/createFields';
import {
  BackgroundColorArgs,
  backgroundColorArgTypes,
  defaultBackgroundColorArgs,
} from './common/commonControls';
import clsx from 'clsx';
import { LayoutStyles } from '@/types/styleFlags';

type StoryProps = PromoProps &
  BackgroundColorArgs & {
    Reversed: boolean;
  };

const meta = {
  title: 'Page Content/Promo',
  component: Promo,
  argTypes: {
    ...backgroundColorArgTypes,
    Reversed: {
      control: 'boolean',
      name: 'Promo Reversed',
    },
  },
  args: {
    Reversed: false,
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
  componentName: 'Promo',
  params: baseParams,
};

const baseFields = {
  PromoImageOne: createImageField('placeholder'),
  PromoTitle: createTextField('We provide you the best experience'),
  PromoDescription: createRichTextField(1, 'paragraphs'),
  PromoSubTitle: createTextField('Materials'),
  PromoMoreInfo: createLinkField('Read More'),
};

export const Default: Story = {
  render: (args) => {
    const promoStyles = clsx(
      baseParams.styles,
      args.BackgroundColor,
      args.Reversed && LayoutStyles.Reversed
    );

    const params = {
      ...baseParams,
      styles: promoStyles,
    };
    return <Promo params={params} rendering={baseRendering} fields={baseFields} />;
  },
};
