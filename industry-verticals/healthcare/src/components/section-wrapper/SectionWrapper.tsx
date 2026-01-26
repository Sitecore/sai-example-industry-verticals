'use client';

import {
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  withDatasourceCheck,
  ComponentRendering,
  ComponentParams,
  RichTextField,
  Field,
  Placeholder,
} from '@sitecore-content-sdk/nextjs';
import BlobAccent from '../../assets/shapes/BlobAccent';
import CurvedClip from '../../assets/shapes/CurvedClip';
import { CommonStyles } from '@/types/styleFlags';

interface Fields {
  Title: Field<string>;
  Description: RichTextField;
}

type ContentSectionProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const DefaultContentSection = ({ fields, params, rendering }: ContentSectionProps) => {
  const id = params?.RenderingIdentifier;
  const curvedTop = params.styles?.includes(CommonStyles.CurvedTop);
  const curvedBottom = params.styles?.includes(CommonStyles.CurvedBottom);
  const hideBlobAccent = params.styles?.includes(CommonStyles.HideBlobAccent);

  return (
    <section
      className={`bg-background-secondary dark:bg-background-secondary-dark relative space-y-8 py-16 ${params?.styles}`}
      id={id || undefined}
    >
      {curvedTop && <CurvedClip className="top-0" pos="top" />}
      {curvedBottom && <CurvedClip className="bottom-0" pos="bottom" />}
      {!hideBlobAccent && (
        <BlobAccent size="lg" className="absolute top-0 right-0 z-0 lg:right-4" />
      )}
      <div className="relative z-10 container">
        <div className="max-w-4xl">
          <h2>
            <ContentSdkText field={fields.Title} />
          </h2>
          <ContentSdkRichText className="text-lg" field={fields.Description} />
        </div>
      </div>
      <Placeholder
        name={`section-wrapper-content-${params?.DynamicPlaceholderId}`}
        rendering={rendering}
      />
    </section>
  );
};

export const Default = withDatasourceCheck()<ContentSectionProps>(DefaultContentSection);
