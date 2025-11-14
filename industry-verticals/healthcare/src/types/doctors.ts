import { Field, ImageField, RichTextField } from '@sitecore-content-sdk/nextjs';

export interface Doctor {
  FullName: Field<string>;
  JobTitle: Field<string>;
  Photo: ImageField;
  Bio: RichTextField;
}
