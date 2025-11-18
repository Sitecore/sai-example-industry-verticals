import React, { JSX } from 'react';
import {
  RichText,
  useSitecore,
  RichTextField,
  TextField,
  Text,
  Placeholder,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Title: TextField;
  Content: RichTextField;
}

type PageContentProps = ComponentProps & {
  fields: Fields;
};

export const Default = ({ params, fields, rendering }: PageContentProps): JSX.Element => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;

  const title = fields?.Title ?? (page.layout.sitecore.route?.fields?.Title as TextField);
  const content = fields?.Content ?? (page.layout.sitecore.route?.fields?.Content as RichTextField);
  const searchbarPlaceholderKey = `page-header-searchbar-${params.DynamicPlaceholderId}`;

  return (
    <section className={`component page-header py-18 ${styles}`} id={id}>
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="space-y-8 lg:col-span-3">
            <h2>
              <Text field={title} />
            </h2>
            <div className="text-lg">
              <RichText field={content} />
            </div>
          </div>
          <div className="max-lg:order-last">
            <Placeholder name={searchbarPlaceholderKey} rendering={rendering} />
          </div>
        </div>
      </div>
    </section>
  );
};
