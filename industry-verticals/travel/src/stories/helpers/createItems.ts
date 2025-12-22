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

export const createMockArticles = (count: number) =>
  Array.from({ length: count }).map((_, i) => ({
    id: `article-${i + 1}`,
    displayName: `Article ${i + 1}`,
    name: `article${i + 1}`,
    url: `/blog/article-${i + 1}`,
    fields: {
      Title: createTextField(`Article Title ${i + 1}`),
      ShortDescription: createRichTextField(),
      Content: createRichTextField(i + 1),
      Image: createImageField(),
      PublishedDate: { value: new Date(2025, 8, 10 - i).toISOString() },
      Category: {
        id: `category-${i % 2}`,
        displayName: i % 2 === 0 ? 'Destinations' : 'Lifestyle',
        name: i % 2 === 0 ? 'Destinations' : 'Lifestyle',
        url: `/categories/${i % 2 === 0 ? 'destinations' : 'lifestyle'}`,
        fields: {
          Category: createTextField(i % 2 === 0 ? 'Destinations' : 'Lifestyle'),
        },
      },
      ReadTime: createTextField(`${5 + i} min read`),
      ReadMoreLink: createLinkField(`Read more`),
      Author: {
        id: `author-${i}`,
        name: `author-${i}`,
        displayName: `Author ${i + 1}`,
        url: `/authors/author-${i}`,
        fields: {
          AuthorName: createTextField(`Author ${i + 1}`),
          About: createTextField(`About Author ${i + 1}`),
          Avatar: createTextField('logo'),
        },
      },
      Tags: [],
    },
  }));
