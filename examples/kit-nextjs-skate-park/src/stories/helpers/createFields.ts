import { loremIpsum } from 'lorem-ipsum';
import { RICH_MARKUP_INNER_HTML } from '../constants/richTextSamples';
import { LOGO_SVG, PLACEHOLDER_SVG } from '../constants/images';

const createPlaceholderImageSrc = (isLogo?: boolean): string => {
  const svg = isLogo ? LOGO_SVG : PLACEHOLDER_SVG;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const createImageField = (type: 'logo' | 'placeholder' = 'placeholder') => {
  const imageTypeProps = {
    logo: {
      width: '220',
      height: '40',
      alt: 'Logo',
      isLogo: true,
      isLogoLight: false,
    },
    placeholder: {
      width: '800',
      height: '800',
      alt: 'Placeholder',
      isLogo: false,
      isLogoLight: false,
    },
  };

  const { width, height, alt, isLogo } = imageTypeProps[type];

  const src = createPlaceholderImageSrc(isLogo);

  return {
    value: {
      src,
      alt,
      width,
      height,
    },
  };
};

export const createLinkField = (text: string = 'Read more') => {
  return {
    value: {
      linktype: '',
      id: '',
      anchor: '',
      querystring: '',
      target: '',
      class: '',
      text,
      title: text,
      href: '#',
    },
  };
};

export const createRichTextField = (
  numOfParagraphs: number = 2,
  variant: 'paragraphs' | 'withRichMarkup' = 'paragraphs'
) => {
  if (variant === 'withRichMarkup') {
    return {
      value: `<div class="ck-content">${RICH_MARKUP_INNER_HTML}</div>`,
    };
  }

  const paragraphs = loremIpsum({
    units: 'paragraphs',
    count: numOfParagraphs,
    format: 'html',
    paragraphLowerBound: 1,
    paragraphUpperBound: 4,
  });

  return {
    value: `<div class="ck-content">${paragraphs}</div>`,
  };
};

export const createTextField = (text?: string, numOfSentences: number = 3) => {
  const sentences = loremIpsum({
    units: 'sentences',
    count: numOfSentences,
  });

  return {
    value: text || sentences,
  };
};

export const createIGQLField = <T>(field: T): { jsonValue: T } => ({
  jsonValue: field,
});
