import { createPlaceholderImageSrc, createTextField } from '../helpers/createFields';

export const createNavItem = (text: string) => {
  return {
    Id: `${text}-${Date.now()}`,
    Href: '#',
    Querystring: '',
    DisplayName: text,
    Title: createTextField(text),
    NavigationTitle: createTextField(text),
  };
};

export const arrayToObject = <T>(arr: T[]): Record<string, T> =>
  arr.reduce(
    (acc, item, index) => {
      acc[String(index)] = item;
      return acc;
    },
    {} as Record<string, T>
  );

export const navRoot = {
  ...createNavItem('Home'),
  Styles: ['level0', 'submenu', 'item0', 'odd', 'first', 'last', 'active'],
};

export const topLevelPages = [
  {
    ...createNavItem('Shop'),
    Styles: ['level1', 'item0', 'odd', 'first'],
    Children: [
      {
        ...createNavItem('Furniture'),
        Styles: ['level2', 'item0', 'odd', 'first'],
      },
      {
        ...createNavItem('Lighting'),
        Styles: ['level2', 'item1', 'even'],
      },
      {
        ...createNavItem('Accessories'),
        Styles: ['level2', 'item2', 'odd', 'last'],
      },
    ],
  },
  {
    ...createNavItem('Inspiration'),
    Styles: ['level1', 'item1', 'even'],
  },
  {
    ...createNavItem('Offers'),
    Styles: ['level1', 'item1', 'even'],
    Children: [
      {
        ...createNavItem('Seasonal Picks'),
        Styles: ['level2', 'item0', 'odd', 'first'],
      },
      {
        ...createNavItem('Bundles'),
        Styles: ['level2', 'item1', 'even'],
      },
      {
        ...createNavItem('Outlet'),
        Styles: ['level2', 'item2', 'odd', 'last'],
      },
    ],
  },
];

export const flatTopLevelPages = [
  {
    ...createNavItem('Shop'),
    Styles: ['level0', 'item0', 'odd', 'first', 'flat-level1'],
  },
  {
    ...createNavItem('Inspiration'),
    Styles: ['level0', 'item1', 'even', 'flat-level1'],
  },
  {
    ...createNavItem('Offers'),
    Styles: ['level0', 'item1', 'even', 'flat-level1'],
  },
  {
    ...createNavItem('Seasonal Picks'),
    Styles: ['level0', 'item0', 'odd', 'first', 'flat-level2'],
  },
  {
    ...createNavItem('Bundles'),
    Styles: ['level0', 'item1', 'even', 'flat-level2'],
  },
  {
    ...createNavItem('Outlet'),
    Styles: ['level0', 'item2', 'odd', 'last', 'flat-level2'],
  },
];

export const getNavigationFields = (options?: { withRoot?: boolean; flat?: boolean }) => {
  const { withRoot = true, flat = false } = options || {};

  const pages = flat ? flatTopLevelPages : topLevelPages;

  if (withRoot) {
    return {
      0: {
        ...navRoot,
        Children: pages,
      },
    };
  }

  return arrayToObject(pages);
};

export const logoParam = `<image mediaid="8cc2a449-e23b-488c-bb23-3d7c7a07f6e7" mediaurl="${createPlaceholderImageSrc(true)}" />`;
