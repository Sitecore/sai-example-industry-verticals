export interface SitecoreItem<TFields> {
  id: string;
  displayName: string;
  name: string;
  url: string;
  fields: TFields;
}
