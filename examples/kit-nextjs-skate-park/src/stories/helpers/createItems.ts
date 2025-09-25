import { Article, Author, Category } from '@/types/article';
import {
  createImageField,
  createLinkField,
  createRichTextField,
  createTextField,
} from './createFields';
import { Field } from '@sitecore-content-sdk/nextjs';

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
      Product: {
        id: `product-${index + 1}`,
        displayName: `Product ${index + 1}`,
        name: `product${index + 1}`,
        url: `/product/product-${index + 1}`,
        fields: {
          Image1: createImageField('placeholder'),
        },
      },
      Rating: { value: (index % 5) + 1 } as Field<number>,
    },
  }));
};
