import {
  createImageField,
  createLinkField,
  createRichTextField,
  createTextField,
} from './createFields';

export const createLinkItems = (count: number) =>
  Array.from({ length: count }).map((_, i) => ({
    field: {
      id: String(i + 1),
      link: createLinkField(`Example Link ${i + 1}`),
    },
  }));

export const createOfferItems = (count: number) => {
  const offerTexts = [
    'Get 20% off all skateboards this month!',
    'Free shipping on orders over $100',
    'Buy 2 wheels, get 1 free!',
    'Student discount: 15% off with valid ID',
    'Limited time: Premium bearings at 30% off',
    'Weekend special: Free grip tape with deck purchase',
    'New customer bonus: $10 off first order',
    'Pro series boards now available with special pricing',
    'Flash sale: All safety gear 25% off today only',
    'Loyalty members get exclusive access to new releases',
  ];

  return Array.from({ length: count }, (_, index) => ({
    id: `offer-${index + 1}`,
    displayName: `Offer ${index + 1}`,
    name: `offer${index + 1}`,
    url: `/offers/offer-${index + 1}`,
    fields: {
      OfferText: createTextField(offerTexts[index % offerTexts.length]),
    },
  }));
};

export const createArticles = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: `article-${index + 1}`,
    displayName: `Article ${index + 1}`,
    name: `article${index + 1}`,
    url: `/articles/article-${index + 1}`,
    fields: {
      Title: createTextField('We provide you the best experience'),
      ShortDescription: createRichTextField(1, 'paragraphs'),
      Content: createRichTextField(1, 'paragraphs'),
      Image: createImageField('placeholder'),
      Category: {
        id: `category-${index + 1}`,
        displayName: `Category ${index + 1}`,
        name: `category${index + 1}`,
        url: `/categories/category-${index + 1}`,
        fields: {
          Category: createTextField('Interior'),
        },
      },
    },
  }));
};
