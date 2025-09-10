import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as Promo, AboutPromo, PromoProps } from '../components/promo/Promo';
import { CommonParams, CommonRendering } from './common/commonData';
import {
  createImageField,
  createLinkField,
  createRichTextField,
  createTextField,
} from './helpers/createFields';
import { boolToSitecoreCheckbox } from './helpers/boolToSitecoreCheckbox';

type StoryProps = PromoProps & {
  ShowMultipleImages: boolean;
  Reversed: boolean;
  HideCurveLine: boolean;
  HideShapes: boolean;
  HideShadows: boolean;
};

const meta = {
  title: 'Page Content/Promo',
  component: Promo,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    ShowMultipleImages: {
      control: 'boolean',
      name: 'Show Multiple Images',
    },
    Reversed: {
      control: 'boolean',
      name: 'Promo Reversed',
    },
    HideCurveLine: {
      control: 'boolean',
      name: 'Hide Curve Line',
    },
    HideShapes: {
      control: 'boolean',
      name: 'Hide Shapes',
    },
    HideShadows: {
      control: 'boolean',
      name: 'Hide Shadows',
    },
  },
  args: {
    ShowMultipleImages: false,
    Reversed: false,
    HideCurveLine: false,
    HideShapes: false,
    HideShadows: false,
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
  PromoImageTwo: createImageField('placeholder'),
  PromoImageThree: createImageField('placeholder'),
  PromoTitle: createTextField('We provide you the best experience'),
  PromoDescription: createRichTextField(1, 'paragraphs'),
  PromoSubTitle: createTextField('Materials'),
  PromoMoreInfo: createLinkField('Read More'),
};

export const Default: Story = {
  render: (args) => {
    const params = {
      ...baseParams,
      ShowMultipleImages: boolToSitecoreCheckbox(args.ShowMultipleImages),
      Reversed: boolToSitecoreCheckbox(args.Reversed),
      HideCurveLine: boolToSitecoreCheckbox(args.HideCurveLine),
      HideShapes: boolToSitecoreCheckbox(args.HideShapes),
      HideShadows: boolToSitecoreCheckbox(args.HideShadows),
    };
    return <Promo params={params} rendering={baseRendering} fields={baseFields} />;
  },
};

export const WideImagePromo: Story = {
  argTypes: {
    ShowMultipleImages: { table: { disable: true } },
    HideCurveLine: { table: { disable: true } },
    HideShapes: { table: { disable: true } },
    HideShadows: { table: { disable: true } },
  },
  render: (args) => {
    const params = {
      ...baseParams,
      Reversed: boolToSitecoreCheckbox(args.Reversed),
    };
    return <AboutPromo params={params} rendering={baseRendering} fields={baseFields} />;
  },
};
