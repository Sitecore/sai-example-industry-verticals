'use client';

import React, { useState } from 'react';
import { Link, TextField, useSitecore } from '@sitecore-content-sdk/nextjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown, faChevronUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getLinkField, getNavigationText } from '@/helpers/navHelpers';

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

export type NavigationListProps = {
  fields: NavItemFields;
  handleClick: (event?: React.MouseEvent<HTMLElement>) => void;
  relativeLevel: number;
};

type NavigationProps = {
  params?: { [key: string]: string };
  fields: Record<string, NavItemFields>;
};

export const Default = (props: NavigationProps) => {
  const [isOpenMenu, openMenu] = useState(false);
  const { page } = useSitecore();
  const styles =
    props.params != null
      ? `${props.params.GridParameters ?? ''} ${props?.params?.Styles ?? ''}`.trimEnd()
      : '';
  const id = props.params != null ? props.params.RenderingIdentifier : null;

  if (!Object.values(props.fields).length) {
    return (
      <div className={`component navigation ${styles}`} id={id ? id : undefined}>
        <div className="component-content">[Navigation]</div>
      </div>
    );
  }

  const handleToggleMenu = (event?: React.MouseEvent<HTMLElement>, flag?: boolean): void => {
    if (event && page.mode.isEditing) {
      event.preventDefault();
    }

    if (flag !== undefined) {
      return openMenu(flag);
    }

    openMenu(!isOpenMenu);
  };

  const list = Object.values(props.fields)
    .filter((element) => element)
    .map((element: NavItemFields, key: number) => (
      <NavigationList
        key={`${key}${element.Id}`}
        fields={element}
        handleClick={(event: React.MouseEvent<HTMLElement>) => handleToggleMenu(event, false)}
        relativeLevel={1}
      />
    ));

  return (
    <div className={`component navigation font-heading text-lg ${styles}`} id={id ? id : undefined}>
      <div
        className="z-50 flex h-6 w-6 cursor-pointer items-center justify-center lg:hidden"
        onClick={() => handleToggleMenu()}
      >
        <FontAwesomeIcon icon={isOpenMenu ? faTimes : faBars} width={16} height={16} />
      </div>

      <div className="component-content">
        <nav
          className={`${
            isOpenMenu ? 'flex' : 'hidden'
          } bg-background dark:bg-background-dark absolute top-full right-0 left-0 z-100 lg:static lg:flex`}
        >
          <ul className={`container flex flex-col gap-x-8 pb-8 lg:flex-row lg:pb-0 xl:gap-x-14`}>
            {list}
          </ul>
        </nav>
      </div>
    </div>
  );
};

const NavigationList = (props: NavigationListProps) => {
  const { page } = useSitecore();
  const [active, setActive] = useState(false);
  const classNameList = `${props?.fields?.Styles.concat('rel-level' + props.relativeLevel).join(
    ' '
  )}`;

  const isRootItem = props.fields.Styles.includes('level0');

  let children: React.JSX.Element[] = [];
  if (props.fields.Children && props.fields.Children.length) {
    children = props.fields.Children.map((element: NavItemFields, index: number) => (
      <NavigationList
        key={`${index}${element.Id}`}
        fields={element}
        handleClick={props.handleClick}
        relativeLevel={props.relativeLevel + 1}
      />
    ));
  }

  return (
    <li
      className={`${classNameList} relative flex flex-col ${isRootItem ? 'lg:flex-row' : ''} gap-x-8 gap-y-4 xl:gap-x-14 ${active ? 'active' : ''} uppercase`}
      key={props.fields.Id}
      tabIndex={0}
    >
      <div className="flex items-center gap-1">
        <Link
          field={getLinkField(props)}
          editable={page.mode.isEditing}
          onClick={props.handleClick}
          className="whitespace-nowrap"
        >
          {getNavigationText(props)}
        </Link>
        {children.length > 0 && !isRootItem ? (
          <div
            className="flex h-6 w-6 items-center justify-center"
            onClick={() => setActive((a) => !a)}
          >
            <FontAwesomeIcon
              icon={active ? faChevronUp : faChevronDown}
              width={16}
              height={16}
              className="cursor-pointer"
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      {children.length > 0 ? (
        <ul
          className={`flex flex-col gap-x-8 gap-y-4 xl:gap-x-14 ${
            isRootItem
              ? 'lg:flex-row'
              : `bg-background dark:bg-background-dark top-full -left-4 pl-4 lg:absolute lg:p-4 ${
                  active ? 'block' : 'hidden'
                } z-100`
          }`}
        >
          {children}
        </ul>
      ) : null}
    </li>
  );
};
