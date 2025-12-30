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
import { localeOptions } from '@/constants/localeOptions';

export type LanguageSwitcherProps = ComponentProps & {
  params: { [key: string]: string };
};

export default function LanguageSwitcher(props: LanguageSwitcherProps) {
  const { styles, RenderingIdentifier: id } = props.params;

  const router = useRouter();
  const { pathname, asPath, query } = router;

  const { page } = useSitecore();
  const activeLocale = useMemo<string>(() => page?.locale as string, [page?.locale]);

  const changeLanguage = useCallback(
    (langCode: string) => {
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

  const selectedLocale: string = localeOptions.some((l) => l.code === activeLocale)
    ? activeLocale
    : 'en';

  return (
    <div className={`component language-switcher ${styles}`} id={id}>
      <Select value={selectedLocale} onValueChange={(value) => changeLanguage(value as string)}>
        <SelectTrigger
          id="language-select"
          aria-label={`Current Language: ${selectedLocale}`}
          className="border-0 shadow-none [&>svg]:hidden [.component.header_&]:px-1"
        >
          <div className="flex items-center gap-2">
            <Globe className="size-5" />
            <span className="max-lg:hidden">
              <SelectValue placeholder="Language" />
            </span>
          </div>
        </SelectTrigger>
        <SelectContent className="min-w-44 border-0">
          {localeOptions.map((language) => (
            <SelectItem key={language.code} value={language.code}>
              <span>{language.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
