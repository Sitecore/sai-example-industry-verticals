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
