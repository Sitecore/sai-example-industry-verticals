import React from 'react';
import {
  Text,
  Field,
  ImageField,
  Text as ContentSdkText,
  Image,
  TextField,
  Placeholder,
  ComponentFields,
  ComponentRendering,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type AuthorProps = ComponentProps & {
  rendering: ComponentRendering<ComponentFields>;
  placeholderKey: string;
  fields: {
    AuthorName: TextField;
    About: Field<string>;
    Avatar: ImageField;
  };
};

export const Author = (props: AuthorProps) => {
  return (
    <div className="border-border container mx-auto rounded-xl border bg-white px-4 py-8 shadow-sm">
      <div className="mx-auto max-w-4xl">
          <div className="p-6">
            <div className="flex items-start space-x-4">
              <Image field={props.fields.Avatar} width={80} height={80} className="rounded-full" />
              <div>
                <h2 className="mb-2 text-xl font-semibold text-gray-900">
                  About <Text field={props.fields.AuthorName} />
                </h2>
                <div className="mb-4 text-gray-600">
                  <ContentSdkText field={props.fields.About} />
                </div>
                <Placeholder rendering={props.rendering} name={props.placeholderKey} />
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};
