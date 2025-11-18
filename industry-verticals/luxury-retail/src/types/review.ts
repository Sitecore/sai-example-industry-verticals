import { Field, ImageField, TextField } from '@sitecore-content-sdk/nextjs';
import { SitecoreItem } from './common';

export type ReviewFields = SitecoreItem<{
  Avatar: ImageField;
  Caption: TextField;
  Description: TextField;
  Rating: Field<number>;
  ReviewImage: ImageField;
  ReviewerName: TextField;
}>;
