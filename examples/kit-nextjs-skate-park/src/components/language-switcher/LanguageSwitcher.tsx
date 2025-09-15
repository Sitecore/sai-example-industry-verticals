'use client';

import React, { useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../shadcn/components/ui/select';
import { Globe } from 'lucide-react';
import { ComponentProps } from '@/lib/component-props';
import { useSitecore } from '@sitecore-content-sdk/nextjs';

type AppLocale = 'en' | 'fr-FR' | 'es-ES';
type Language = { code: AppLocale; label: string };

const LANGUAGES: Language[] = [
  { code: 'en', label: 'EN | USD' },
  { code: 'fr-FR', label: 'FR | EUR' },
  { code: 'es-ES', label: 'ES | EUR' },
];

export type LanguageSwitcherProps = ComponentProps & {
  params: { [key: string]: string };
};

export default function LanguageSwitcher(props: LanguageSwitcherProps) {
  const { styles, RenderingIdentifier: id } = props.params;

  const router = useRouter();
  const { pathname, asPath, query } = router;

  const { page } = useSitecore();
  const activeLocale = useMemo<AppLocale>(() => page?.locale as AppLocale, [page?.locale]);

  const changeLanguage = useCallback(
    (langCode: AppLocale) => {
      if (pathname && asPath && query) {
        router.push(
          {
            pathname,
            query,
          },
          asPath,
          {
            locale: langCode,
            shallow: false,
          }
        );
      }
    },
    [asPath, pathname, query, router]
  );

  const selectedLocale: AppLocale = LANGUAGES.some((l) => l.code === activeLocale)
    ? activeLocale
    : 'en';

  return (
    <div className={`component language-switcher ${styles}`} id={id}>
      <Select value={selectedLocale} onValueChange={(value) => changeLanguage(value as AppLocale)}>
        <SelectTrigger
          id="language-select"
          aria-label={`Current Language: ${selectedLocale}`}
          className="border-0 [&>svg]:hidden shadow-none [.component.header_&]:px-1"
        >
          <div className="flex items-center gap-2">
            <Globe className="size-5" />
            <span className="max-lg:hidden">
              <SelectValue placeholder="Language" />
            </span>
          </div>
        </SelectTrigger>
        <SelectContent className="min-w-44  border-0">
          {LANGUAGES.map((language) => (
            <SelectItem key={language.code} value={language.code}>
              <span>{language.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
