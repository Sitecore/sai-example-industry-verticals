import {
  createLinkField,
  createImageField,
  createTextField,
  createIGQLField,
} from './createFields';

export const createLinkItems = (count: number) =>
  Array.from({ length: count }).map((_, i) => ({
    field: {
      id: String(i + 1),
      link: createLinkField(`Example Link ${i + 1}`),
    },
  }));

export const createFeatureItems = (count: number) =>
  Array.from({ length: count }).map((_, i) => ({
    id: String(i + 1),
    featureTitle: createIGQLField(createTextField(`Feature ${i + 1}`)),
    featureDescription: createIGQLField(createTextField('', 2)),
    featureImage: createIGQLField(createImageField()),
    featureImageDark: createIGQLField(createImageField()),
    featureLink: createIGQLField(createLinkField('Sign Up')),
  }));

