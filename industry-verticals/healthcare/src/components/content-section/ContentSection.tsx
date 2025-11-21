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
import { isParamEnabled } from '@/helpers/isParamEnabled';
import BlobAccent from '../../assets/shapes/BlobAccent';
import CurvedClip from '../../assets/shapes/CurvedClip';

interface Fields {
  Heading: Field<string>;
  Description: RichTextField;
}

type ContentSectionProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const DefaultContentSection = ({ fields, params, rendering }: ContentSectionProps) => {
  const id = params?.RenderingIdentifier;

  return (
    <section
      className={`bg-background-secondary dark:bg-background-secondary-dark relative space-y-8 py-16 ${params?.styles}`}
      id={id || undefined}
    >
      {isParamEnabled(params.CurvedTop) && <CurvedClip className="top-0" pos="top" />}
      {isParamEnabled(params.CurvedBottom) && <CurvedClip className="bottom-0" pos="bottom" />}
      {isParamEnabled(params.BlobAccent) && (
        <BlobAccent size="lg" className="absolute top-0 right-0 z-0 lg:right-4" />
      )}
      <div className="relative z-10 container">
        <div className="max-w-4xl">
          <h2>
            <ContentSdkText field={fields.Heading} />
          </h2>
          <ContentSdkRichText className="text-lg" field={fields.Description} />
        </div>
      </div>
      <Placeholder
        name={`content-section-content-${params?.DynamicPlaceholderId}`}
        rendering={rendering}
      />
    </section>
  );
};

export const Default = withDatasourceCheck()<ContentSectionProps>(DefaultContentSection);
