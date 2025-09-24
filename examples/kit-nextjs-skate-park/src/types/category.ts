import { Field } from '@sitecore-content-sdk/nextjs';

export interface Category {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: {
    Category?: Field<string>;
  };
}
