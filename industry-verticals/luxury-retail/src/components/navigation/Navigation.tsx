'use client';

import React, { useState, useRef } from 'react';
import { Link, TextField, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { ArrowLeft, X } from 'lucide-react';
import { useClickAway } from '@/hooks/useClickAway';
import { useStopResponsiveTransition } from '@/hooks/useStopResponsiveTransition';
import { extractMediaUrl } from '@/helpers/extractMediaUrl';
import {
  getLinkContent,
  getLinkField,
  isNavLevel,
  isNavRootItem,
  prepareFields,
} from '@/helpers/navHelpers';
import clsx from 'clsx';
import { isParamEnabled } from '@/helpers/isParamEnabled';
import { Drawer, DrawerTrigger, DrawerContent, DrawerClose } from '@/shadcn/components/ui/drawer';

export interface NavItemFields {
  Id: string;
  DisplayName: string;
  Title: TextField;
  NavigationTitle: TextField;
  Href: string;
  Querystring: string;
  Children?: Array<NavItemFields>;
  Styles: string[];
}

interface NavigationListItemProps {
  fields: NavItemFields;
  handleClick: (event?: React.MouseEvent<HTMLElement>) => void;
  logoSrc?: string;
  isSimpleLayout?: boolean;
}

export interface NavigationProps extends ComponentProps {
  fields: Record<string, NavItemFields>;
}

const NavigationListItem: React.FC<NavigationListItemProps> = ({
  fields,
  handleClick,
  logoSrc,
  isSimpleLayout,
}) => {
  const { page } = useSitecore();
  const [isActiveLocal, setIsActiveLocal] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  useClickAway(dropdownRef, () => setIsActiveLocal(false));

  const isRootItem = isNavRootItem(fields);
  const isTopLevelPage = isNavLevel(fields, 1);

  const hasChildren = !!fields.Children?.length;
  const isLogoRootItem = isRootItem && logoSrc;
  const hasDropdownMenu = hasChildren && isTopLevelPage;

  const clickHandler = (event: React.MouseEvent<HTMLElement>) => {
    handleClick(event);
    setIsActiveLocal(false);
  };

  const childrenMarkup = hasChildren
    ? fields.Children!.map((child) => (
        <NavigationListItem
          key={child.Id}
          fields={child}
          handleClick={clickHandler}
          isSimpleLayout={isSimpleLayout}
          logoSrc={logoSrc}
        />
      ))
    : null;

  return (
    <li
      ref={dropdownRef}
      tabIndex={0}
      role="menuitem"
      className={clsx(
        fields?.Styles?.join(' '),
        'relative flex flex-col gap-x-8 gap-y-4 xl:gap-x-14',
        isRootItem && 'lg:flex-row',
        isLogoRootItem && 'shrink-0 max-lg:hidden',
        isLogoRootItem && isSimpleLayout && 'lg:mr-auto'
      )}
    >
      <div className="">
        {hasDropdownMenu ? (
          // Drawer for items with children
          <Drawer
            open={isActiveLocal}
            onOpenChange={(open) => setIsActiveLocal(open)}
            direction="left"
          >
            <DrawerTrigger asChild>
              <button
                type="button"
                aria-label={`Open submenu for ${fields.DisplayName}`}
                className="navigation-item navigation-item-primary"
                onClick={(e) => {
                  e.preventDefault();
                  setIsActiveLocal((a) => !a);
                }}
              >
                {getLinkContent(fields, logoSrc)}
              </button>
            </DrawerTrigger>

            <DrawerContent className="bg-background-accent flex flex-col p-5 max-lg:!w-xl max-lg:!max-w-full">
              <DrawerClose asChild className="hidden self-end lg:block">
                <button aria-label="Close submenu">
                  <X className="size-5" />
                </button>
              </DrawerClose>
              <DrawerClose asChild className="lg:hidden">
                <button aria-label="Close submenu">
                  <ArrowLeft className="size-5" />
                </button>
              </DrawerClose>
              <div className="px-12">
                {logoSrc && (
                  <img src={logoSrc} alt={fields.DisplayName} className="mt-14 mb-18 h-auto w-36" />
                )}

                <div className="text-foreground-light mb-6 text-sm font-medium">
                  {getLinkContent(fields, logoSrc)}
                </div>
                <nav aria-label={`${fields.DisplayName} submenu`}>
                  <ul className="flex flex-col gap-6">{childrenMarkup}</ul>
                </nav>
              </div>
            </DrawerContent>
          </Drawer>
        ) : (
          // Regular link for items without children
          <Link
            field={getLinkField(fields)}
            editable={page.mode.isEditing}
            onClick={clickHandler}
            className="navigation-item navigation-item-primary"
          >
            {getLinkContent(fields, logoSrc)}
          </Link>
        )}
      </div>
    </li>
  );
};

export const Default = ({ params, fields }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id, Logo: logoImage, SimpleLayout: simpleLayout } = params;

  useStopResponsiveTransition();

  if (!Object.values(fields).some((v) => !!v)) {
    return (
      <div className={`component navigation ${styles}`} id={id}>
        <div className="component-content">[Navigation]</div>
      </div>
    );
  }

  const handleToggleMenu = (event?: React.MouseEvent<HTMLElement>, forceState?: boolean) => {
    if (event && page.mode.isEditing) {
      event.preventDefault();
    }
    setIsMenuOpen(forceState ?? !isMenuOpen);
  };

  const isSimpleLayout = isParamEnabled(simpleLayout);
  const preparedFields = prepareFields(fields, !isSimpleLayout);
  const rootItem = Object.values(preparedFields).find((item) => isNavRootItem(item));
  const logoSrc = extractMediaUrl(logoImage);
  const hasLogoRootItem = rootItem && logoSrc;

  const navigationItems = Object.values(preparedFields)
    .filter((item): item is NavItemFields => !!item)
    .map((item) => (
      <NavigationListItem
        key={item.Id}
        fields={item}
        handleClick={(event) => handleToggleMenu(event, false)}
        logoSrc={logoSrc}
        isSimpleLayout={!!isSimpleLayout}
      />
    ));

  return (
    <div className={`component navigation ${styles}`} id={id}>
      {logoSrc && (
        <img
          src={logoSrc}
          alt={'logo'}
          className="mb-18 hidden h-auto w-36 [.drawer-content_&]:block"
        />
      )}

      <nav>
        <ul
          role="menubar"
          className={clsx(
            'container flex flex-row items-center gap-x-6 gap-y-4 text-lg lg:justify-center [.component.header_&]:px-0 [.drawer-content_&]:flex-col [.drawer-content_&]:items-start [.drawer-content_&]:px-0',
            isSimpleLayout && !hasLogoRootItem && 'lg:justify-end'
          )}
        >
          {navigationItems}
        </ul>
      </nav>
    </div>
  );
};
