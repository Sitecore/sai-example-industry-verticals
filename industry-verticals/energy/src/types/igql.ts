import { TextField, RichTextField, ImageField, LinkField } from '@sitecore-content-sdk/nextjs';

export interface IGQLTextField {
  jsonValue: TextField;
}

export interface IGQLField<T> {
  jsonValue: T;
}

export interface IGQLRichTextField {
  jsonValue: RichTextField;
}

export interface IGQLImageField {
  jsonValue: ImageField;
}

export interface IGQLLinkField {
  jsonValue: LinkField;
}
