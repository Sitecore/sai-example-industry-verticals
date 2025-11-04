import { NavigationProps, NavItemFields } from '@/components/navigation/Navigation';
import React, { JSX } from 'react';
import { LinkField, Text } from '@sitecore-content-sdk/nextjs';

export const isNavLevel = (fields: NavItemFields, level: number): boolean => {
  return Array.isArray(fields.Styles) && fields.Styles.includes(`level${level}`);
};

export const isNavRootItem = (fields: NavItemFields): boolean => {
  const isFlatLevel =
    Array.isArray(fields.Styles) && fields.Styles.some((style) => style.startsWith('flat-level'));

  return isNavLevel(fields, 0) && !isFlatLevel;
};

export const getLinkContent = (fields: NavItemFields, logoSrc?: string): JSX.Element | string => {
  const isRootItem = isNavRootItem(fields);

  if (isRootItem && logoSrc) {
    const altText =
      fields.NavigationTitle?.value || fields.Title?.value || fields.DisplayName || '';
    return <img src={logoSrc} alt={String(altText)} className="h-auto w-36" />;
  }

  const textField = fields.NavigationTitle || fields.Title;
  if (textField) {
    return <Text field={textField} />;
  }

  return fields.DisplayName;
};

export const getLinkField = (fields: NavItemFields): LinkField => ({
  value: {
    href: fields.Href,
    title:
      fields.NavigationTitle?.value?.toString() ??
      fields.Title?.value?.toString() ??
      fields.DisplayName,
    querystring: fields.Querystring,
  },
});

export const prepareFields = (
  fields: NavigationProps['fields'],
  center: boolean = true
): NavigationProps['fields'] => {
  const result: NavigationProps['fields'] = {};
  const entries = Object.entries(fields).filter(Boolean);

  if (entries.length === 1 && isNavRootItem(entries[0][1])) {
    const rootItem = entries[0][1];
    const children = rootItem.Children || [];

    // root item always gets flattened (children merged into top-level)
    const flattenedChildren = [...children];
    if (center) {
      // place root item in the middle
      const middleIndex = Math.floor(children.length / 2);
      flattenedChildren.splice(middleIndex, 0, { ...rootItem, Children: undefined });
    } else {
      // place root item at the start (before children)
      flattenedChildren.unshift({ ...rootItem, Children: undefined });
    }

    flattenedChildren.forEach((item, idx) => {
      result[String(idx)] = item;
    });
  } else {
    entries.forEach(([key, item]) => {
      result[key] = item;
    });
  }

  return result;
};
