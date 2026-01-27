'use client';

import React, { JSX, useState, useEffect } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { Placeholder } from '@sitecore-content-sdk/nextjs';
import { Drawer, DrawerTrigger, DrawerContent, DrawerClose } from '@/shadcn/components/ui/drawer';
import { Menu, Search, X } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import PreviewSearch from '../non-sitecore/search/PreviewSearch';
import { PREVIEW_WIDGET_ID } from '@/constants/search';

export type HeaderProps = ComponentProps & {
  params: { [key: string]: string };
};

export const Default = (props: HeaderProps): JSX.Element => {
  const { styles, RenderingIdentifier: id, DynamicPlaceholderId } = props.params;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Close search when route changes
  useEffect(() => {
    setIsSearchOpen(false);
  }, [pathname, searchParams]);

  return (
    <div className={`component header bg-background border-b ${styles}`} id={id}>
      <div className="container flex items-center gap-4 py-4 lg:gap-6">
        <div className="header-block *:shrink max-lg:w-full max-lg:justify-between lg:shrink-0">
          <Placeholder name={`header-left-${DynamicPlaceholderId}`} rendering={props.rendering} />
        </div>
        <div className="hidden! lg:flex! lg:shrink lg:basis-full">
          <Placeholder name={`header-nav-${DynamicPlaceholderId}`} rendering={props.rendering} />
        </div>

        {/* Search Button */}
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="text-gray-700 transition-colors hover:text-blue-600"
        >
          <Search className="size-5" />
        </button>

        <div className="header-block hidden! lg:flex! lg:shrink-0">
          <Placeholder name={`header-right-${DynamicPlaceholderId}`} rendering={props.rendering} />
        </div>

        {/* Mobile Drawer Trigger */}
        <div className="lg:hidden">
          <Drawer direction="left">
            <DrawerTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="text-foreground hover:text-foreground-light p-2 transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
            </DrawerTrigger>

            <DrawerContent className="bg-background-accent w-xl! max-w-full! p-5">
              <div className="flex h-full flex-col">
                <div className="mb-14 flex items-center justify-between self-end">
                  <DrawerClose asChild>
                    <button type="button" aria-label="Close menu">
                      <X className="h-5 w-5" />
                    </button>
                  </DrawerClose>
                </div>

                <div className="mb-6 flex flex-col gap-y-6 px-12">
                  <Placeholder
                    name={`header-nav-${DynamicPlaceholderId}`}
                    rendering={props.rendering}
                  />
                </div>
                <div className="flex flex-col gap-y-6 px-12">
                  <Placeholder
                    name={`header-right-${DynamicPlaceholderId}`}
                    rendering={props.rendering}
                  />
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      {isSearchOpen && (
        <div className="border-border bg-background absolute top-full right-0 left-0 z-50 border-b shadow-lg">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="flex items-center gap-2">
              <PreviewSearch
                rfkId={PREVIEW_WIDGET_ID}
                isOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
              />

              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-foreground-muted hover:text-foreground p-3 transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
