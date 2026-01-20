'use client';

import { IGQLImageField, IGQLRichTextField, IGQLTextField, IGQLLinkField } from 'src/types/igql';
import {
  Text as ContentSdkText,
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  withDatasourceCheck,
  ComponentRendering,
  ComponentParams,
} from '@sitecore-content-sdk/nextjs';
import { Bell } from 'lucide-react';

interface Fields {
  data: {
    datasource: {
      children: {
        results: FeatureFields[];
      };
      title: IGQLTextField;
      description: IGQLRichTextField;
    };
  };
}

interface FeatureFields {
  id: string;
  featureTitle: IGQLTextField;
  featureDescription: IGQLTextField;
  featureImage: IGQLImageField;
  featureImageDark?: IGQLImageField;
  featureLink?: IGQLLinkField;
}

type FeaturesProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const FeatureItem = ({
  feature,
  layout = 'vertical',
}: {
  feature: FeatureFields;
  layout: 'vertical' | 'horizontal';
}) => {
  if (layout === 'horizontal') {
    // Card variant: horizontal layout with button
    return (
      <li key={feature?.id} className="border-border flex flex-col gap-4 rounded-lg border p-6">
        <div className="mb-3.5 flex items-center gap-2">
          <Bell className="text-accent h-6 w-6" />
          <h5 className="text-base font-bold">
            <ContentSdkText field={feature?.featureTitle?.jsonValue} />
          </h5>
        </div>
        <p>
          <ContentSdkText field={feature?.featureDescription?.jsonValue} />
        </p>
        {feature?.featureLink?.jsonValue ? (
          <div className="mt-2">
            <ContentSdkLink field={feature.featureLink.jsonValue} className="outline-btn" />
          </div>
        ) : null}
      </li>
    );
  }

  // Default variant: vertical layout with icon on left
  return (
    <li
      key={feature?.id}
      className="border-border bg-background flex flex-col gap-4 rounded-lg border p-6"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center">
          <ContentSdkImage
            field={feature?.featureImage?.jsonValue}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex-1">
          <h5 className="mb-2 text-base font-semibold">
            <ContentSdkText field={feature?.featureTitle?.jsonValue} />
          </h5>
          <p className="text-foreground-light">
            <ContentSdkText field={feature?.featureDescription?.jsonValue} />
          </p>
        </div>
      </div>
    </li>
  );
};

const DefaultFeatures = ({ fields, params }: FeaturesProps) => {
  const id = params?.RenderingIdentifier;
  const features = fields?.data?.datasource?.children?.results;

  return (
    <section className={`relative px-10 pt-8 pb-16 ${params?.styles || ''}`} id={id || undefined}>
      <div className="relative z-10 container">
        <h2 className="mb-4 text-center text-3xl font-bold">
          <ContentSdkText field={fields?.data?.datasource?.title?.jsonValue} />
        </h2>

        <ul className="mt-12 grid gap-6 lg:grid-cols-2">
          {features?.map((feature) => (
            <FeatureItem key={feature.id} feature={feature} layout="vertical" />
          ))}
        </ul>
      </div>
    </section>
  );
};

const CardFeatures = ({ fields, params }: FeaturesProps) => {
  const id = params?.RenderingIdentifier;
  const features = fields?.data?.datasource?.children?.results;

  return (
    <div className={`relative px-6 pt-8 pb-16 ${params?.styles || ''}`} id={id || undefined}>
      <h2 className="mb-6 text-3xl font-bold">
        <ContentSdkText field={fields?.data?.datasource?.title?.jsonValue} />
      </h2>
      <ul className="grid gap-6 lg:grid-cols-3">
        {features?.map((feature) => (
          <FeatureItem key={feature.id} feature={feature} layout="horizontal" />
        ))}
      </ul>
    </div>
  );
};

export const Default = withDatasourceCheck()<FeaturesProps>(DefaultFeatures);
export const Card = withDatasourceCheck()<FeaturesProps>(CardFeatures);
