import { Article, Author, Category } from '@/types/article';
import {
  createIGQLField,
  createImageField,
  createLinkField,
  createNumberField,
  createRichTextField,
  createTextField,
} from './createFields';
import { Field } from '@sitecore-content-sdk/nextjs';
import { ProductIGQL } from '@/types/products';

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

export const createMockArticles = (count: number): Article[] =>
  Array.from({ length: count }).map((_, i) => ({
    id: `article-${i + 1}`,
    displayName: `Article ${i + 1}`,
    name: `article${i + 1}`,
    url: `/articles/article-${i + 1}`,
    fields: {
      Title: createTextField(`Article Title ${i + 1}`),
      ShortDescription: createTextField(`Short description for article ${i + 1}`),
      Content: createRichTextField(i + 1),
      Image: createImageField(),
      PublishedDate: { value: new Date(2025, 8, 10 - i).toISOString() },
      Author: {
        id: `author-${i + 1}`,
        displayName: `Author ${i + 1}`,
        name: `Author ${i + 1}`,
        url: `/authors/author-${i + 1}`,
        fields: { AuthorName: createTextField(`Author ${i + 1}`) },
      } as Author,
      Tags: [],
      Category: {
        id: `category-${i % 2}`,
        displayName: i % 2 === 0 ? 'Tech' : 'Lifestyle',
        name: i % 2 === 0 ? 'Tech' : 'Lifestyle',
        url: `/categories/${i % 2 === 0 ? 'tech' : 'lifestyle'}`,
        fields: { Category: createTextField(i % 2 === 0 ? 'Tech' : 'Lifestyle') },
      } as Category,
    },
  }));

export const createProductItems = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `product-${i + 1}`,
    displayName: `Product ${i + 1}`,
    name: `product${i + 1}`,
    url: `/products/product-${i + 1}`,
    fields: {
      Title: createTextField(`Product Title ${i + 1}`),
      ShortDescription: createTextField(`This is a short description for product ${i + 1}.`),
      LongDescription: createTextField(
        `This is a long description for product ${i + 1}. It has more details and information about the product, its features, and benefits.`,
        3
      ),
      Price: createNumberField(1.99 + i * 10),
      SKU: createTextField(`SKU${1000 + i + 1}`),
      Image1: createImageField(),
      Image2: createImageField(),
      Image3: createImageField(),
      Image4: createImageField(),
      Image5: createImageField(),
      Width: createTextField(`${10 + i}`),
      Height: createTextField(`${5 + i}`),
      Depth: createTextField(`${3 + i}`),
      Weight: createTextField(`${1 + i * 0.5}`),
      SeatHeight: createTextField(`${15 + i}`),
      LegHeight: createTextField(`${20 + i}`),
      Tags: [
        {
          id: `tag-${i}-1`,
          displayName: 'New',
          name: 'new',
          url: '/tags/New',
          fields: {
            Tag: createTextField('New'),
          },
        },
        {
          id: `tag-${i}-2`,
          displayName: 'Featured',
          name: 'featured',
          url: '/tags/Featured',
          fields: {
            Tag: createTextField('Featured'),
          },
        },
      ],
      Size: [
        {
          id: `size-${i}-1`,
          displayName: 'Small',
          name: 'small',
          url: '/sizes/Small',
          fields: {
            ProductSize: createTextField('S'),
          },
        },
        {
          id: `size-${i}-2`,
          displayName: 'Large',
          name: 'large',
          url: '/sizes/Large',
          fields: {
            ProductSize: createTextField('L'),
          },
        },
      ],
      Color: [
        {
          id: `color-${i}-1`,
          displayName: 'Indigo',
          name: 'indigo',
          url: '/colors/Indigo',
          fields: {
            Name: createTextField('Indigo'),
            HexCode: createTextField('#816DFA'),
          },
        },
        {
          id: `color-${i}-2`,
          displayName: 'Black',
          name: 'black',
          url: '/colors/Black',
          fields: {
            Name: createTextField('Black'),
            HexCode: createTextField('#000000'),
          },
        },
      ],
      Category: {
        id: `category-${(i % 3) + 1}`,
        displayName: `Category ${(i % 3) + 1}`,
        name: `category${(i % 3) + 1}`,
        url: `/categories/category-${(i % 3) + 1}`,
        fields: {
          CategoryName: createTextField(`Category ${(i % 3) + 1}`),
        },
      },
      Reviews: createReviews(3),
    },
  }));
};

export const createIGQLProductItems = (count: number): ProductIGQL[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `product-${index + 1}`,
    name: `Product ${index + 1}`,
    title: createIGQLField(createTextField(`Product ${index + 1}`)),
    price: createIGQLField(createNumberField(1.99 + index * 10)),
    image1: createIGQLField(createImageField()),
    category: createIGQLField({
      id: `category-${(index % 3) + 1}`,
      displayName: `Category ${(index % 3) + 1}`,
      name: `category${(index % 3) + 1}`,
      url: `/categories/category-${(index % 3) + 1}`,
      fields: {
        CategoryName: createTextField(`Category ${(index % 3) + 1}`),
      },
    }),
    url: {
      path: `/products/product-${index + 1}`,
    },
    reviews: {
      targetItems: Array.from({ length: (index % 5) + 1 }, () => ({
        rating: createIGQLField(createNumberField(Math.round((Math.random() * 4 + 1) * 100) / 100)),
      })),
    },
  }));
};

export const createReviews = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: `review-${index + 1}`,
    displayName: `review ${index + 1}`,
    name: `review${index + 1}`,
    url: `/review/review-${index + 1}`,
    fields: {
      Avatar: createImageField('placeholder'),
      ReviewerName: createTextField(`Reviewer ${index + 1}`),
      Caption: createTextField(`Caption for review ${index + 1}`),
      Description: createTextField(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      ),
      ReviewImage: createImageField('placeholder'),
      Rating: { value: (index % 5) + 1 } as Field<number>,
    },
  }));
};
