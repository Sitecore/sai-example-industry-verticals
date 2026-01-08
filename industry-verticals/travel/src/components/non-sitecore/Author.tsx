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
import { useI18n } from 'next-localization';

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
  const { t } = useI18n();

  return (
    <div className="border-border bg-background container mx-auto rounded-xl border px-4 py-8 shadow-sm">
      <div className="mx-auto max-w-4xl">
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <Image
              field={props.fields.Avatar}
              width={80}
              height={80}
              className="h-20 w-20 rounded-full object-cover"
            />
            <div>
              <h2 className="text-foreground mb-2 text-xl font-semibold">
                {t('about_field') || 'About'} <Text field={props.fields.AuthorName} />
              </h2>
              <div className="text-foreground-muted mb-4">
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
