import { createIGQLField, createLinkField } from './createFields';

export const createLinkItems = (count: number) =>
  Array.from({ length: count }).map((_, i) => ({
    field: {
      id: String(i + 1),
      link: createLinkField(`Example Link ${i + 1}`),
    },
  }));

export const createIconLinkItems = (count: number) =>
  Array.from({ length: count }).map((_, i) => {
    const icons = ['Phone', 'Mail', 'CreditCard'];
    const texts = ['+1 (555) 123-4567', 'support@skywings.com', '24/7 Customer Service'];

    return {
      id: `iconlink-${i}`,
      link: createIGQLField(createLinkField(texts[i % texts.length])),
      iconName: {
        jsonValue: {
          value: icons[i % icons.length],
        },
      },
    };
  });