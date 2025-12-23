import React from 'react';
import {
  Link as ContentSdkLink,
  Text as ContentSdkText,
  Image as ContentSdkImage,
  LinkField,
  ComponentParams,
  ComponentRendering,
  ImageField,
} from '@sitecore-content-sdk/nextjs';
import { IGQLImageField, IGQLLinkField, IGQLTextField } from '@/types/igql';
import * as LucidIcons from 'lucide-react';

interface IconLink {
  iconName: IGQLTextField;
  link: IGQLLinkField;
  iconImage: IGQLImageField;
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

const ListItem = ({
  index,
  total,
  field,
  iconField,
  iconName,
}: {
  index: number;
  total: number;
  field: LinkField;
  iconName?: string;
  iconField?: ImageField;
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
        {iconField?.value && (
          <ContentSdkImage
            field={iconField}
            className="icon w-5 h-5"
          />
        )}
        <div className="text-accent-midlight">{IconComponent && <IconComponent size={20} />}</div>
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
        <ListItem
          key={`${index}-${element.link}`}
          index={index}
          total={datasource.children.results.length}
          field={element.link?.jsonValue}
          iconField={element.iconImage.jsonValue}
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

export const DynamicList = (props: IconLinkListProps) => {
  const datasource = props.fields?.data?.datasource;
  const styles = `component link-list ${props.params.styles || ''}`.trim();
  const id = props.params.RenderingIdentifier;

  const renderContent = () => {
    if (!datasource) {
      return <h3>Link List</h3>;
    }

    const links = datasource.children.results.map((element, index) => {
      return (
        <ListItem
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
