import {
  createImageField,
  createRichTextField,
  createTextField,
  createLinkField,
  createIGQLField,
} from './createFields';

export const createLinkItems = (count: number) =>
  Array.from({ length: count }).map((_, i) => ({
    field: {
      id: String(i + 1),
      link: createLinkField(`Example Link ${i + 1}`),
    },
  }));

export const createDoctorItems = (count: number) =>
  Array.from({ length: count }).map((_, i) => ({
    id: String(i + 1),
    displayName: `Doctor ${i + 1}`,
    url: '#',
    name: `Jane Doe ${i + 1}`,
    fields: {
      FullName: createTextField(`Jane Doe ${i + 1}`),
      JobTitle: createTextField('Cardiologist'),
      Photo: createImageField(),
      Bio: createRichTextField(3),
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
      Description: createTextField(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      ),
    },
  }));
};

export const createFeatureItems = (count: number) =>
  Array.from({ length: count }).map((_, i) => ({
    id: String(i + 1),
    featureTitle: createIGQLField(createTextField(`Feature ${i + 1}`)),
    featureDescription: createIGQLField(createTextField('', 2)),
    featureImage: createIGQLField(createImageField()),
    featureImageDark: createIGQLField(createImageField()),
  }));
