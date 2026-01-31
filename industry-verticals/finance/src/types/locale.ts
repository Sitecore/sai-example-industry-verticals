export type AppLocale = 'en' | 'fr-FR' | 'es-ES';

export type LocaleOption = {
  code: AppLocale;
  label: string;
  currency: string;
  currencySymbol: string;
};
