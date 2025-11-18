'use client';

import React, { useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Check, Globe, X } from 'lucide-react';
import { ComponentProps } from '@/lib/component-props';
import { useSitecore } from '@sitecore-content-sdk/nextjs';
import { AppLocale } from '@/types/locale';
import { localeOptions } from '@/constants/localeOptions';
import { DrawerClose, DrawerContent, DrawerTrigger, Drawer } from '@/shadcn/components/ui/drawer';

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

  const selectedLocale: AppLocale = localeOptions.some((l) => l.code === activeLocale)
    ? activeLocale
    : 'en';

  const selectedLocaleLabel =
    localeOptions.find((l) => l.code === selectedLocale)?.label || selectedLocale.toUpperCase();

  return (
    <div className={`component language-switcher ${styles}`} id={id}>
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <button
            type="button"
            aria-label={`Current Language: ${selectedLocale}`}
            className="text-foreground hover:text-foreground-light flex items-center gap-2 border-0 bg-transparent p-2 transition-colors [.component.header_&]:px-1"
          >
            <Globe className="size-5" />
            <span className="uppercase max-lg:hidden">{selectedLocaleLabel}</span>
          </button>
        </DrawerTrigger>

        <DrawerContent
          data-slot="drawer-content"
          className="bg-background-muted ml-auto min-h-full p-6"
        >
          <DrawerClose asChild className="self-end">
            <button
              type="button"
              aria-label="Close"
              className="text-foreground hover:text-foreground-light"
            >
              <X className="size-5" />
            </button>
          </DrawerClose>
          <h4 className="drawer-heading">Select Language</h4>

          <ul className="flex flex-col gap-3">
            {localeOptions.map((language) => (
              <li key={language.code} className="flex items-center gap-4">
                <button
                  onClick={() => changeLanguage(language.code as AppLocale)}
                  className={
                    'text-foreground hover:text-foreground-light py-2 text-left text-xl transition-colors'
                  }
                >
                  {language.label}
                </button>
                {language.code === selectedLocale && <Check className="text-accent size-6" />}
              </li>
            ))}
          </ul>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
