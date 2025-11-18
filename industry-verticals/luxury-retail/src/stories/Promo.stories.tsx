import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as Promo, PromoProps, WithQuote } from '../components/promo/Promo';
import { CommonParams, CommonRendering } from './common/commonData';
import {
  createImageField,
  createLinkField,
  createRichTextField,
  createTextField,
} from './helpers/createFields';
import { boolToSitecoreCheckbox } from './helpers/boolToSitecoreCheckbox';
import {
  BackgroundColorArgs,
  backgroundColorArgTypes,
  defaultBackgroundColorArgs,
} from './common/commonControls';

type StoryProps = PromoProps &
  BackgroundColorArgs & {
    ShowMultipleImages: boolean;
    Reversed: boolean;
    HideCurveLine: boolean;
    HideShapes: boolean;
    HideShadows: boolean;
    HideQuote: boolean;
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
  PromoTitle: createTextField('Introducing the essence of nordic comfort'),
  PromoDescription: createRichTextField(1, 'paragraphs'),
  PromoSubTitle: createTextField('Materials'),
  PromoMoreInfo: createLinkField('Explore More'),
};

export const Default: Story = {
  render: (args) => {
    const params = {
      ...baseParams,
      styles: `${baseParams.styles} ${args.BackgroundColor}`,
      Reversed: boolToSitecoreCheckbox(args.Reversed),
    };
    return <Promo params={params} rendering={baseRendering} fields={baseFields} />;
  },
};

export const QuotePromo: Story = {
  argTypes: {
    ShowMultipleImages: { table: { disable: true } },
    HideShapes: { table: { disable: true } },
    HideShadows: { table: { disable: true } },
  },
  render: (args) => {
    const params = {
      ...baseParams,
      styles: `${baseParams.styles} ${args.BackgroundColor}`,
      Reversed: boolToSitecoreCheckbox(args.Reversed),
    };
    return <WithQuote params={params} rendering={baseRendering} fields={baseFields} />;
  },
};
