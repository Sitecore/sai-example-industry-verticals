import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default } from '../components/header/Header';
import { ComponentProps } from 'react';
import { renderStorybookPlaceholder } from 'src/stories/helpers/renderStorybookPlaceholder';
import { CommonParams, CommonRendering } from './common/commonData';
import { createImageField, createLinkField } from './helpers/createFields';
// import { ComponentFields } from '@sitecore-jss/sitecore-jss-nextjs';

type StoryProps = ComponentProps<typeof Default>;

const meta = {
  title: 'Global Components/Header',
  component: Default,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseFields = {
  LogoLight: createImageField('logo'),
  LogoDark: createImageField('logo'),
  PhoneLink: createLinkField(),
  MailLink: createLinkField(),
};

const baseParams = CommonParams;

const baseRendering = {
  ...CommonRendering,
  componentName: 'Header',
  params: baseParams,
};

export const Header: Story = {
  render: () => {
    return (
      <Default
        fields={baseFields}
        rendering={{
          ...baseRendering,
          placeholders: {
            [`header-nav-${baseParams.DynamicPlaceholderId}`]: [renderStorybookPlaceholder()],
            [`header-theme-switcher-${baseParams.DynamicPlaceholderId}`]: [
              renderStorybookPlaceholder(),
            ],
          },
        }}
        params={baseParams}
      />
    );
  },
};

// const NavigationData = {
//   fields: [
//     {
//       Id: '8d740786-580a-4374-ac68-1020622f70d1',
//       Styles: ['level0', 'submenu', 'item0', 'odd', 'first', 'last', 'active'],
//       Href: '/',
//       Querystring: '',
//       NavigationTitle: {
//         value: 'Home',
//         editable: 'Home',
//       },
//       Children: [
//         {
//           Id: '1dcca542-9bca-47db-acd2-0ac28c15052d',
//           Styles: ['level1', 'item0', 'odd', 'first'],
//           Href: '/About-us',
//           Querystring: '',
//           NavigationTitle: {
//             value: 'About us',
//             editable: 'About us',
//           },
//         },
//         {
//           Id: '8d8252c6-b93b-43a1-959d-7ab0ff749269',
//           Styles: ['level1', 'item1', 'even'],
//           Href: '/Services',
//           Querystring: '',
//           NavigationTitle: {
//             value: 'Services',
//             editable: 'Services',
//           },
//         },
//         {
//           Id: 'f1ab5368-6202-4acf-b27f-ab80be5e6bb1',
//           Styles: ['level1', 'submenu', 'item2', 'odd', 'last'],
//           Href: '/Doctors',
//           Querystring: '',
//           NavigationTitle: {
//             value: 'Doctors',
//             editable: 'Doctors',
//           },
//           Children: [
//             {
//               Id: '5e3a6d08-66bc-40b1-8de2-70481a8f0c61',
//               Styles: ['level2', 'item0', 'odd', 'first'],
//               Href: '/Doctors/Angelina-Serzila',
//               Querystring: '',
//               NavigationTitle: {
//                 value: 'Angelina Serzila',
//                 editable: 'Angelina Serzila',
//               },
//             },
//             {
//               Id: '33b964b9-d3d9-4689-84f0-5094afc0d08a',
//               Styles: ['level2', 'item1', 'even'],
//               Href: '/Doctors/Anna-Guanche',
//               Querystring: '',
//               NavigationTitle: {
//                 value: 'Anna Guanche',
//                 editable: 'Anna Guanche',
//               },
//             },
//             {
//               Id: 'd2ba02a5-b1c0-435d-ac5b-6c5a0a0437d4',
//               Styles: ['level2', 'item2', 'odd'],
//               Href: '/Doctors/David-Vassilakis',
//               Querystring: '',
//               NavigationTitle: {
//                 value: 'David Vassilakis',
//                 editable: 'David Vassilakis',
//               },
//             },
//             {
//               Id: '87482563-ed64-44da-8a30-b3e178d3bd73',
//               Styles: ['level2', 'item3', 'even'],
//               Href: '/Doctors/Alina-Moreau',
//               Querystring: '',
//               NavigationTitle: {
//                 value: 'Alina Moreau',
//                 editable: 'Alina Moreau',
//               },
//             },
//             {
//               Id: '55f39209-2ea2-417d-badb-2b7d51c8c87e',
//               Styles: ['level2', 'item4', 'odd'],
//               Href: '/Doctors/Julian-Ramires',
//               Querystring: '',
//               NavigationTitle: {
//                 value: 'Julian Ramires',
//                 editable: 'Julian Ramires',
//               },
//             },
//             {
//               Id: '645d5fb5-1e32-4cc9-9583-61af38b3b5cb',
//               Styles: ['level2', 'item5', 'even'],
//               Href: '/Doctors/Marcus-Veldt',
//               Querystring: '',
//               NavigationTitle: {
//                 value: 'Marcus Veldt',
//                 editable: 'Marcus Veldt',
//               },
//             },
//             {
//               Id: '0b1e72e6-17c0-4aec-8fe5-7a3aef79232a',
//               Styles: ['level2', 'item6', 'odd', 'last'],
//               Href: '/Doctors/Sofia-Liang',
//               Querystring: '',
//               NavigationTitle: {
//                 value: 'Sofia Liang',
//                 editable: 'Sofia Liang',
//               },
//             },
//           ],
//         },
//       ],
//     },
//   ] as unknown as ComponentFields,
//   params: {
//     ...CommonParams,
//     LevelFrom: '{1BB88840-5FB3-4353-AD8D-81136F6FF75A}',
//     LevelTo: '{A59325BB-5A27-46F9-8110-9D499715F3BE}',
//     Filter: '{D063E9D1-C7B5-4B1E-B31E-69886C9C59F5}',
//     AddRoot: '1',
//   },
// };

// export const HeaderWithContent: Story = {
//   render: () => {
//     return (
//       <Default
//         fields={baseFields}
//         rendering={{
//           ...baseRendering,
//           placeholders: {
//             [`header-nav-${baseParams.DynamicPlaceholderId}`]: [
//               {
//                 ...CommonRendering,
//                 componentName: 'Navigation',
//                 ...NavigationData,
//               },
//             ],
//             [`header-theme-switcher-${baseParams.DynamicPlaceholderId}`]: [
//               {
//                 ...CommonRendering,
//                 componentName: 'ThemeSwitcher',
//               },
//             ],
//           },
//         }}
//         params={baseParams}
//       />
//     );
//   },
// };
