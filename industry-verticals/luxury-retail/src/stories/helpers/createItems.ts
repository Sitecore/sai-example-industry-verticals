import { ProductIGQL } from '@/types/products';
import {
  createIGQLField,
  createImageField,
  createLinkField,
  createNumberField,
  createTextField,
} from './createFields';

export const createLinkItems = (count: number) =>
  Array.from({ length: count }).map((_, i) => ({
    field: {
      id: String(i + 1),
      link: createLinkField(`Example Link ${i + 1}`),
    },
  }));

export const createIGQLProductItems = (count: number): ProductIGQL[] => {
  const categories = ['Vases', 'Shelves', 'Pillows'];

  return Array.from({ length: count }, (_, index) => ({
    id: `product-${index + 1}`,
    name: `Product ${index + 1}`,
    title: createIGQLField(createTextField(`Product ${index + 1}`)),
    price: createIGQLField(createNumberField(1.99 + index * 10)),
    image1: createIGQLField(createImageField()),
    image2: createIGQLField(createImageField()),
    category: createIGQLField({
      id: `category-${(index % 3) + 1}`,
      displayName: `Category ${(index % 3) + 1}`,
      name: categories[Math.floor(Math.random() * categories.length)],
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
