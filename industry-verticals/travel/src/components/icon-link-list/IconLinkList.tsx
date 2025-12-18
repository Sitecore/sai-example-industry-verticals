import React from 'react';
import {
  Link as ContentSdkLink,
  Text as ContentSdkText,
  LinkField,
  ComponentParams,
  ComponentRendering,
} from '@sitecore-content-sdk/nextjs';
import { IGQLLinkField, IGQLTextField } from '@/types/igql';
import * as LucidIcons from 'lucide-react';

interface IconLink {
  iconName: IGQLTextField;
  link: IGQLLinkField;
}

interface Fields {
  data: {
    datasource: {
      children: {
        results: IconLink[];
      };
      title: IGQLTextField;
    };
  };
}

type IconLinkListProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const IconLinkListItem = ({
  index,
  total,
  field,
  iconName,
}: {
  index: number;
  total: number;
  field: LinkField;
  iconName?: string;
}) => {
  const classNames = [
    `item${index}`,
    index % 2 === 0 ? 'odd' : 'even',
    index === 0 ? 'first' : '',
    index === total - 1 ? 'last' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const IconComponent = iconName ? (LucidIcons as any)[iconName] : undefined;

  return (
    <li className={classNames}>
      <div className="field-link flex items-center space-x-3">
        <div className="text-blue-400">{IconComponent && <IconComponent size={20} />}</div>
        <ContentSdkLink field={field} />
      </div>
    </li>
  );
};

export const Default = (props: IconLinkListProps) => {
  const datasource = props.fields?.data?.datasource;
  const styles = `component link-list ${props.params.styles || ''}`.trim();
  const id = props.params.RenderingIdentifier;

  const renderContent = () => {
    if (!datasource) {
      return <h3>Link List</h3>;
    }

    const links = datasource.children.results.map((element, index) => {
      return (
        <IconLinkListItem
          key={`${index}-${element.link}`}
          index={index}
          total={datasource.children.results.length}
          field={element.link?.jsonValue}
          iconName={element.iconName?.jsonValue?.value?.toString()}
        />
      );
    });

    return (
      <>
        <ContentSdkText tag="h3" field={datasource.title.jsonValue} />
        <ul>{links}</ul>
      </>
    );
  };

  return (
    <div className={styles} id={id}>
      <div className="component-content">{renderContent()}</div>
    </div>
  );
};
