import React from 'react';
import { Link as ContentSdkLink, Text as ContentSdkText, LinkField, TextField, ComponentParams, ComponentRendering } from '@sitecore-content-sdk/nextjs';
import { IGQLTextField } from '@/types/igql';

interface IconLink {
  iconName: { jsonValue: { value: string } };
  link: { jsonValue: { value: { href: string } } };
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
}: {
  index: number;
  total: number;
  field: LinkField;
}) => {
  const classNames = [
    `item${index}`,
    index % 2 === 0 ? 'odd' : 'even',
    index === 0 ? 'first' : '',
    index === total - 1 ? 'last' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <li className={classNames}>
      <div className="field-link">
        <ContentSdkLink field={field} />
      </div>
    </li>
  );
};

export const Default = (props: IconLinkListProps) => {
  const datasource = props.fields?.data?.datasource;
  const styles = `component link-list ${props.params.styles || ''}`.trim();
  const id = props.params.RenderingIdentifier;

  console.log(props);

  const renderContent = () => {
    if (!datasource) {
      return <h3>Link List</h3>;
    }

    return (
      <>
        <ContentSdkText tag="h3" field={datasource.title.jsonValue} />
        <ul>
            {
                datasource.children.results.map((element, index) => {
                    return (
                        <IconLinkListItem
                            key={`${index}-${element.link}`}
                            index={index}
                            total={datasource.children.results.length}
                            field={element.link.jsonValue}
                        />
                    )
                })
            }
        </ul>
      </>
    );
  };

  return (
    <div className={styles} id={id}>
      <div className="component-content">{renderContent()}</div>
    </div>
  );
};
