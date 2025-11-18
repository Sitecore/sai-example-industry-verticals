import { createTextField } from '../helpers/createFields';
import { NavItemFields } from '../../components/navigation/Navigation';

export const createNavItem = (text: string, id?: string): NavItemFields => {
  return {
    Id: id || `${text.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
    Href: `/${text.replace(/\s+/g, '-')}`,
    Querystring: '',
    DisplayName: text,
    Title: createTextField(text),
    NavigationTitle: createTextField(text),
    Styles: [],
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

export const navRoot: NavItemFields = {
  ...createNavItem('Home', '8d740786-580a-4374-ac68-1020622f70d1'),
  Href: '/',
  Styles: ['level0', 'submenu', 'item0', 'odd', 'first', 'last', 'active'],
};

export const topLevelPages: NavItemFields[] = [
  {
    ...createNavItem('About us', '1dcca542-9bca-47db-acd2-0ac28c15052d'),
    Styles: ['level1', 'item0', 'odd', 'first'],
  },
  {
    ...createNavItem('Services', '8d8252c6-b93b-43a1-959d-7ab0ff749269'),
    Styles: ['level1', 'item1', 'even'],
  },
  {
    ...createNavItem('Doctors', 'f1ab5368-6202-4acf-b27f-ab80be5e6bb1'),
    Styles: ['level1', 'submenu', 'item2', 'odd', 'last'],
    Children: [
      {
        ...createNavItem('Angelina Serzila', '5e3a6d08-66bc-40b1-8de2-70481a8f0c61'),
        Href: '/Doctors/Angelina-Serzila',
        Styles: ['level2', 'item0', 'odd', 'first'],
      },
      {
        ...createNavItem('Anna Guanche', '33b964b9-d3d9-4689-84f0-5094afc0d08a'),
        Href: '/Doctors/Anna-Guanche',
        Styles: ['level2', 'item1', 'even'],
      },
      {
        ...createNavItem('David Vassilakis', 'd2ba02a5-b1c0-435d-ac5b-6c5a0a0437d4'),
        Href: '/Doctors/David-Vassilakis',
        Styles: ['level2', 'item2', 'odd'],
      },
      {
        ...createNavItem('Alina Moreau', '87482563-ed64-44da-8a30-b3e178d3bd73'),
        Href: '/Doctors/Alina-Moreau',
        Styles: ['level2', 'item3', 'even'],
      },
      {
        ...createNavItem('Julian Ramires', '55f39209-2ea2-417d-badb-2b7d51c8c87e'),
        Href: '/Doctors/Julian-Ramires',
        Styles: ['level2', 'item4', 'odd'],
      },
      {
        ...createNavItem('Marcus Veldt', '645d5fb5-1e32-4cc9-9583-61af38b3b5cb'),
        Href: '/Doctors/Marcus-Veldt',
        Styles: ['level2', 'item5', 'even'],
      },
      {
        ...createNavItem('Sofia Liang', '0b1e72e6-17c0-4aec-8fe5-7a3aef79232a'),
        Href: '/Doctors/Sofia-Liang',
        Styles: ['level2', 'item6', 'odd', 'last'],
      },
    ],
  },
];

export const flatTopLevelPages: NavItemFields[] = [
  {
    ...createNavItem('About us'),
    Styles: ['level0', 'item0', 'odd', 'first', 'flat-level1'],
  },
  {
    ...createNavItem('Services'),
    Styles: ['level0', 'item1', 'even', 'flat-level1'],
  },
  {
    ...createNavItem('Doctors'),
    Styles: ['level0', 'item2', 'odd', 'flat-level1'],
  },
  {
    ...createNavItem('Angelina Serzila'),
    Href: '/Doctors/Angelina-Serzila',
    Styles: ['level0', 'item3', 'even', 'flat-level2'],
  },
  {
    ...createNavItem('Anna Guanche'),
    Href: '/Doctors/Anna-Guanche',
    Styles: ['level0', 'item4', 'odd', 'flat-level2'],
  },
  {
    ...createNavItem('David Vassilakis'),
    Href: '/Doctors/David-Vassilakis',
    Styles: ['level0', 'item5', 'even', 'flat-level2'],
  },
  {
    ...createNavItem('Alina Moreau'),
    Href: '/Doctors/Alina-Moreau',
    Styles: ['level0', 'item6', 'odd', 'flat-level2'],
  },
  {
    ...createNavItem('Julian Ramires'),
    Href: '/Doctors/Julian-Ramires',
    Styles: ['level0', 'item7', 'even', 'flat-level2'],
  },
  {
    ...createNavItem('Marcus Veldt'),
    Href: '/Doctors/Marcus-Veldt',
    Styles: ['level0', 'item8', 'odd', 'flat-level2'],
  },
  {
    ...createNavItem('Sofia Liang'),
    Href: '/Doctors/Sofia-Liang',
    Styles: ['level0', 'item9', 'even', 'last', 'flat-level2'],
  },
];

export const getNavigationFields = (options?: {
  withRoot?: boolean;
  flat?: boolean;
}): Record<string, NavItemFields> => {
  const { withRoot = true, flat = false } = options || {};

  const pages = flat ? flatTopLevelPages : topLevelPages;

  if (withRoot) {
    return {
      '0': {
        ...navRoot,
        Children: pages,
      },
    };
  }

  return arrayToObject(pages);
};
