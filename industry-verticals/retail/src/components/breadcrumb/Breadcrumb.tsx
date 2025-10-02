import type React from 'react';
import { Link, LinkFieldValue, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import { Home } from 'lucide-react';

type BreadcrumbPage = {
  id: string;
  name: string;
  title: { jsonValue: { value: string } };
  navigationTitle: { jsonValue: { value: string } };
  url: LinkFieldValue;
  navigationFilter: {
    jsonValue: {
      name: string;
    }[];
  };
};

type BreadcrumbProps = ComponentProps & {
  fields: {
    data: {
      datasource: BreadcrumbPage & {
        ancestors: BreadcrumbPage[];
      };
    };
  };
};

const hasNavFilter = (page: BreadcrumbPage, filterName: string): boolean => {
  return page?.navigationFilter?.jsonValue?.some((filter) => filter?.name === filterName) ?? false;
};

const getNavItemTitle = (item: BreadcrumbPage, truncate: boolean = true): string => {
  const MAX_TITLE_LENGTH = 20;
  const title = item.navigationTitle?.jsonValue.value || item.title?.jsonValue.value || item.name;
  return truncate && title.length > MAX_TITLE_LENGTH
    ? title.slice(0, MAX_TITLE_LENGTH) + '…'
    : title;
};

export const Default = (props: BreadcrumbProps) => {
  const { fields, params } = props;
  const { styles, RenderingIdentifier: id, NavigationFilter: filterName } = params;
  const item = fields?.data?.datasource ?? {};

  const { page } = useSitecore();

  const visibleAncestors = item.ancestors.filter((ancestor) => !hasNavFilter(ancestor, filterName));
  const showItem = !hasNavFilter(item, filterName);

  const isTemplateEditing =
    page.mode?.isEditing &&
    (page.layout.sitecore.route?.templateName === 'Partial Design' ||
      page.layout.sitecore.route?.templateName === 'Page Design');

  if (!showItem || !visibleAncestors.length) {
    if (isTemplateEditing) {
      return (
        <div className={`component breadcrumb ${styles}`} id={id}>
          [BREADCRUMB NAVIGATION]
        </div>
      );
    }
    return null;
  }

  const reversedAncestors = [...visibleAncestors].reverse();
  const homeAncestor = reversedAncestors[0];
  const intermediateAncestors = reversedAncestors.slice(1, -1);
  const lastAncestor = reversedAncestors[reversedAncestors.length - 1];

  const hasIntermediateAncestors = !!intermediateAncestors.length;
  const hasLastAncestor = !!lastAncestor && lastAncestor?.id !== homeAncestor?.id;

  return (
    <nav
      aria-label="breadcrumb"
      className={`component breadcrumb bg-background-muted ${styles}`}
      id={id}
    >
      <ol className="container flex items-center gap-4 overflow-auto py-4 lg:py-7">
        {homeAncestor && (
          <li key={homeAncestor.id} className="text-foreground-light flex items-center gap-4">
            <Link
              field={homeAncestor.url}
              className="hover:text-foreground whitespace-nowrap transition-colors"
              title={getNavItemTitle(homeAncestor, false)}
            >
              <span className="hidden max-md:inline">
                <Home className="size-4" aria-label="Home" />
              </span>
              <span className="inline max-md:hidden">{getNavItemTitle(homeAncestor)}</span>
            </Link>
            <ChevronRight className="size-4" />
          </li>
        )}

        {hasIntermediateAncestors && (
          <li className="text-foreground-light flex items-center gap-4 md:hidden">
            <MoreHorizontal className="size-4" />
            <ChevronRight className="size-4" />
          </li>
        )}

        {intermediateAncestors.map((ancestor: BreadcrumbPage) => (
          <li
            key={ancestor.id}
            className="text-foreground-light flex items-center gap-4 max-md:hidden"
          >
            <Link
              field={ancestor.url}
              className="hover:text-foreground whitespace-nowrap transition-colors"
              title={getNavItemTitle(ancestor, false)}
            >
              {getNavItemTitle(ancestor)}
            </Link>
            <ChevronRight className="size-4" />
          </li>
        ))}

        {hasLastAncestor && (
          <li key={lastAncestor.id} className="text-foreground-light flex items-center gap-4">
            <Link
              field={lastAncestor.url}
              className="hover:text-foreground whitespace-nowrap transition-colors"
              title={getNavItemTitle(lastAncestor, false)}
            >
              {getNavItemTitle(lastAncestor)}
            </Link>
            <ChevronRight className="size-4" />
          </li>
        )}

        <li
          className="border-foreground border-l py-2 pl-4 whitespace-nowrap lg:ml-4 lg:pl-8"
          title={getNavItemTitle(item, false)}
        >
          {getNavItemTitle(item)}
        </li>
      </ol>
    </nav>
  );
};
