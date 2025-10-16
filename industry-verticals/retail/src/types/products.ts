import { Field, ImageField, RichTextField } from '@sitecore-content-sdk/nextjs';
import { SitecoreItem } from './common';

export interface Product {
  Title: Field<string>;
  ShortDescription: Field<string>;
  LongDescription: RichTextField;
  Tags: Tag[];
  Category: Category;
  Price: Field<number>;
  SKU: Field<string>;
  Color: Color[];
  Size: Size[];
  Image1: ImageField;
  Image2: ImageField;
  Image3: ImageField;
  Image4: ImageField;
  Image5: ImageField;
  Rating: Field<number>;
  Width: Field<string>;
  Height: Field<string>;
  Depth: Field<string>;
  Weight: Field<string>;
  SeatHeight: Field<string>;
  LegHeight: Field<string>;
  Discount: Field<string>;
  Highlight: Field<string>;
}

export interface CategoryFields {
  CategoryName: Field<string>;
}
export type Category = SitecoreItem<CategoryFields>;

export interface TagFields {
  Tag: Field<string>;
}
export type Tag = SitecoreItem<TagFields>;

export interface ColorFields {
  Name: Field<string>;
  HexCode: Field<string>;
}
export type Color = SitecoreItem<ColorFields>;

export interface SizeFields {
  ProductSize: Field<string>;
}
export type Size = SitecoreItem<SizeFields>;
