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
    ...createNavItem('Book'),
    Styles: ['level1', 'item0', 'odd', 'first'],
  },
  {
    ...createNavItem('Check In'),
    Styles: ['level1', 'item1', 'even'],
  },
  {
    ...createNavItem('My Trips'),
    Styles: ['level1', 'item1', 'even'],
    Children: [
      {
        ...createNavItem('Upcoming Trips'),
        Styles: ['level2', 'item0', 'odd', 'first'],
      },
      {
        ...createNavItem('Wishlist'),
        Styles: ['level2', 'item1', 'even'],
      },
      {
        ...createNavItem('Past Trips'),
        Styles: ['level2', 'item2', 'odd', 'last'],
      },
    ],
  },
  {
    ...createNavItem('Flight Status'),
    Styles: ['level1', 'submenu', 'item2', 'odd', 'last'],
  },
];

export const flatTopLevelPages = [
  {
    ...createNavItem('Book'),
    Styles: ['level0', 'item0', 'odd', 'first', 'flat-level1'],
  },
  {
    ...createNavItem('Check In'),
    Styles: ['level0', 'item1', 'even', 'flat-level1'],
  },
  {
    ...createNavItem('My Trips'),
    Styles: ['level0', 'item1', 'even', 'flat-level1'],
  },
  {
    ...createNavItem('Upcoming Trips'),
    Styles: ['level0', 'item0', 'odd', 'first', 'flat-level2'],
  },
  {
    ...createNavItem('Wishlist'),
    Styles: ['level0', 'item1', 'even', 'flat-level2'],
  },
  {
    ...createNavItem('Past Trips'),
    Styles: ['level0', 'item2', 'odd', 'last', 'flat-level2'],
  },

  {
    ...createNavItem('Flight Status'),
    Styles: ['level0', 'submenu', 'item2', 'odd', 'last', 'flat-level1'],
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

export const logoParam = `<image mediaid="8cc2a449-e23b-488c-bb23-3d7c7a07f6e7" mediaurl="${createPlaceholderImageSrc('logo')}" />`;
