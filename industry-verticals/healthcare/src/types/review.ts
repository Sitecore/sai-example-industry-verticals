import { ImageField, TextField } from '@sitecore-content-sdk/nextjs';
import { SitecoreItem } from './common';

export type ReviewFields = SitecoreItem<{
  Avatar: ImageField;
  Description: TextField;
  ReviewerName: TextField;
}>;
