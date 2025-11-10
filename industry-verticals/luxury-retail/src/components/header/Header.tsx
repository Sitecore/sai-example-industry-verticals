'use client';

import React, { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { Placeholder } from '@sitecore-content-sdk/nextjs';
import { Drawer, DrawerTrigger, DrawerContent, DrawerClose } from '@/shadcn/components/ui/drawer';
import { Menu, X } from 'lucide-react';

export type HeaderProps = ComponentProps & {
  params: { [key: string]: string };
};

export const Default = (props: HeaderProps): JSX.Element => {
  const { styles, RenderingIdentifier: id, DynamicPlaceholderId } = props.params;

  return (
    <div className={`component header bg-background shadow-sm ${styles}`} id={id}>
      <div className="container flex items-center gap-3 py-3 lg:gap-6">
        <div className="header-block *:shrink max-lg:w-full max-lg:justify-between">
          <Placeholder name={`header-left-${DynamicPlaceholderId}`} rendering={props.rendering} />
        </div>
        <div className="header-block !hidden lg:ml-auto lg:!flex">
          <Placeholder name={`header-nav-${DynamicPlaceholderId}`} rendering={props.rendering} />
        </div>
        <div className="header-block">
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

            <DrawerContent className="bg-background-accent !w-xl !max-w-full p-5">
              <div className="flex h-full flex-col">
                <div className="mb-14 flex items-center justify-between self-end">
                  <DrawerClose asChild>
                    <button type="button" aria-label="Close menu">
                      <X className="h-5 w-5" />
                    </button>
                  </DrawerClose>
                </div>

                <div className="flex flex-col gap-y-6 px-12">
                  <Placeholder
                    name={`header-nav-${DynamicPlaceholderId}`}
                    rendering={props.rendering}
                  />
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
};
