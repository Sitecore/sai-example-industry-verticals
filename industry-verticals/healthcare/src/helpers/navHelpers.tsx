import { Text as ContentSdkText, LinkField } from '@sitecore-content-sdk/nextjs';
import { NavigationListProps } from '@/components/navigation/Navigation';

export const getNavigationText = function (props: NavigationListProps) {
  let text;

  if (props.fields.NavigationTitle) {
    text = <ContentSdkText field={props.fields.NavigationTitle} />;
  } else if (props.fields.Title) {
    text = <ContentSdkText field={props.fields.Title} />;
  } else {
    text = props.fields.DisplayName;
  }

  return text;
};

export const getLinkField = (props: NavigationListProps): LinkField => ({
  value: {
    href: props.fields.Href,
    title: getLinkTitle(props),
    querystring: props.fields.Querystring,
  },
});

const getLinkTitle = (props: NavigationListProps): string | undefined => {
  let title;
  if (props.fields.NavigationTitle?.value) {
    title = props.fields.NavigationTitle.value.toString();
  } else if (props.fields.Title?.value) {
    title = props.fields.Title.value.toString();
  } else {
    title = props.fields.DisplayName;
  }

  return title;
};
