import { ImageField, LinkField, TextField } from '@sitecore-content-sdk/nextjs';

export interface IGQLTextField {
  jsonValue: TextField;
}

export interface IGQLLinkField {
  jsonValue: LinkField;
}

export interface IGQLImageField {
  jsonValue: ImageField;
}

export interface IGQLField<T> {
  jsonValue: T;
}
