import { Article, Author, Category } from '@/types/article';
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

export const createMockArticles = (count: number): Article[] =>
  Array.from({ length: count }).map((_, i) => ({
    id: `article-${i + 1}`,
    displayName: `Article ${i + 1}`,
    name: `article${i + 1}`,
    url: `/articles/article-${i + 1}`,
    fields: {
      Title: createTextField('Behind the Scenes: How Gridwell Balances Supply and Demand'),
      ShortDescription: createTextField(),
      Content: createRichTextField(),
      Image: createImageField('placeholder'),
      PublishedDate: createTextField('Wed, December 25, 2025'),
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
        displayName: i % 2 === 0 ? 'Energy Tips' : 'Grid Operations',
        name: i % 2 === 0 ? 'Energy Tips' : 'Grid Operations',
        url: `/categories/${i % 2 === 0 ? 'energy-tips' : 'grid-operations'}`,
        fields: {
          Category: createTextField(i % 2 === 0 ? 'Energy Tips' : 'Grid Operations'),
          CategoryIcon: createImageField('placeholder'),
        },
      } as Category,
    },
  }));
