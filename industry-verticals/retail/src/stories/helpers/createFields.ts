import { loremIpsum } from 'lorem-ipsum';
import { RICH_MARKUP_INNER_HTML } from '../constants/richTextSamples';
import { LOGO_SVG, PLACEHOLDER_SVG } from '../constants/images';

export const createPlaceholderImageSrc = (isLogo?: boolean): string => {
  const svg = isLogo ? LOGO_SVG : PLACEHOLDER_SVG;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const createImageField = (type: 'logo' | 'placeholder' = 'placeholder') => {
  const imageTypeProps = {
    logo: {
      width: '220',
      height: '40',
    },
    placeholder: {
      width: '800',
      height: '800',
    },
  };

  const { width, height } = imageTypeProps[type];

  const src = createPlaceholderImageSrc(type === 'logo');

  return {
    value: {
      src,
      alt: type,
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

export const createNumberField = (value?: number) => {
  return {
    value: value ?? 1234,
  };
};

export const createIGQLField = <T>(field: T): { jsonValue: T } => ({
  jsonValue: field,
});
