import { Field, ImageField, TextField } from '@sitecore-content-sdk/nextjs';

export interface ProductFields {
  id: string;
  displayName: string;
  name: string;
  url: string;
  fields: {
    Image5?: ImageField;
  };
}

export interface ReviewFields {
  id: string;
  displayName: string;
  name: string;
  url: string;
  fields: {
    Avatar: ImageField;
    ReviewerName: TextField;
    Caption: TextField;
    Description: TextField;
    Product: ProductFields;
    Rating: Field<number>;
  };
}
