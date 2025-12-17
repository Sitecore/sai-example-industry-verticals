export type AppLocale = 'en' | 'fr-FR' | 'fr-CA' | 'es-ES';

export type LocaleOption = {
  code: AppLocale;
  label: string;
  currency: string;
  currencySymbol: string;
};
