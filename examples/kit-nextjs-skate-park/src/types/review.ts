import { Field, ImageField, TextField } from '@sitecore-content-sdk/nextjs';
import { SitecoreItem } from './common';

export type ProductFields = SitecoreItem<{
  Image5: ImageField;
}>;

export type ReviewFields = SitecoreItem<{
  Avatar: ImageField;
  ReviewerName: TextField;
  Caption: TextField;
  Description: TextField;
  Product: ProductFields;
  Rating: Field<number>;
}>;
