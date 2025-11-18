import {
  createImageField,
  createRichTextField,
  createTextField,
  createLinkField,
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
