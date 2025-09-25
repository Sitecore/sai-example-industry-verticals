import { Field, ImageField, RichTextField } from '@sitecore-content-sdk/nextjs';
import { Category } from './category';

export interface Article {
  id: string;
  displayName: string;
  name: string;
  url: string;
  fields: {
    Title: Field<string>;
    ShortDescription: RichTextField;
    Content: RichTextField;
    Image: ImageField;
    Category: Category;
  };
}
