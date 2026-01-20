import { Field, ImageField, RichTextField } from '@sitecore-content-sdk/nextjs';
import { SitecoreItem } from './common';

export interface ArticleFields {
  Title: Field<string>;
  ShortDescription: Field<string>;
  Content: RichTextField;
  Image: ImageField;
  PublishedDate: Field<string>;
  Author: Author;
  Tags: Tag[];
  Category: Category;
}
export type Article = SitecoreItem<ArticleFields>;

export interface TagFields {
  Tag: Field<string>;
}
export type Tag = SitecoreItem<TagFields>;

export interface CategoryFields {
  Category: Field<string>;
}
export type Category = SitecoreItem<CategoryFields>;

export interface AuthorFields {
  AuthorName: Field<string>;
}
export type Author = SitecoreItem<AuthorFields>;
