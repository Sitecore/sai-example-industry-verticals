import { TextField } from '@sitecore-content-sdk/nextjs';

export interface IGQLTextField {
  jsonValue: TextField;
}

export interface IGQLField<T> {
  jsonValue: T;
}
