'use client';

import { IGQLImageField, IGQLRichTextField, IGQLTextField } from 'src/types/igql';
import {
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  NextImage as ContentSdkImage,
  withDatasourceCheck,
  ComponentRendering,
  ComponentParams,
} from '@sitecore-content-sdk/nextjs';
import BlobAccent from '../../assets/shapes/BlobAccent';
import { FeatureStyles, CommonStyles } from '@/types/styleFlags';

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
  featureImageDark: IGQLImageField;
}

type FeaturesProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const FeatureItem = ({
  feature,
  useAccentColor,
  layout = 'vertical',
}: {
  feature: FeatureFields;
  useAccentColor: boolean;
  layout: 'vertical' | 'horizontal';
}) => {
  const borderStyles = `border-2 rounded-lg ${
    useAccentColor ? 'border-accent' : 'border-foreground dark:border-foreground-dark'
  }`;

  return (
    <li
      key={feature?.id}
      className={`flex flex-col gap-6 ${
        layout === 'horizontal' ? 'lg:flex-row lg:items-center' : ''
      }`}
    >
      <div
        className={`flex h-20 w-20 shrink-0 items-center justify-center p-3 lg:h-26 lg:w-26 ${borderStyles}`}
      >
        <ContentSdkImage
          field={feature?.featureImage?.jsonValue}
          className={`h-full w-full object-contain ${!useAccentColor ? 'dark:hidden' : ''}`}
        />
        {!useAccentColor && (
          <ContentSdkImage
            field={feature?.featureImageDark?.jsonValue}
            className="hidden h-full w-full object-contain dark:block"
          />
        )}
      </div>
      <div>
        <h5>
          <ContentSdkText field={feature?.featureTitle?.jsonValue} />
        </h5>
        <p className="text-lg">
          <ContentSdkText field={feature?.featureDescription?.jsonValue} />
        </p>
      </div>
    </li>
  );
};

const DefaultFeatures = ({ fields, params }: FeaturesProps) => {
  const id = params?.RenderingIdentifier;
  const features = fields?.data?.datasource?.children?.results;
  const hideBlobAccent = params?.styles.includes(CommonStyles.HideBlobAccent);
  const useAccentColor = params?.styles.includes(FeatureStyles.UseAccentColor);

  return (
    <section className={`relative py-16 ${params?.styles}`} id={id || undefined}>
      {!hideBlobAccent && <BlobAccent className="absolute top-16 right-4 z-0" />}
      <div className="relative z-10 container">
        <div className="max-w-4xl">
          <h2>
            <ContentSdkText field={fields?.data?.datasource?.title?.jsonValue} />
          </h2>
          <ContentSdkRichText
            className="text-lg"
            field={fields?.data?.datasource?.description?.jsonValue}
          />
        </div>
        <ul className="mt-16 grid gap-12 lg:grid-cols-3">
          {features?.map((feature) => (
            <FeatureItem
              key={feature.id}
              feature={feature}
              useAccentColor={useAccentColor}
              layout="vertical"
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

const SimpleFeatures = ({ fields, params }: FeaturesProps) => {
  const id = params?.RenderingIdentifier;
  const features = fields?.data?.datasource?.children?.results;
  const useAccentColor = params?.styles.includes(FeatureStyles.UseAccentColor);

  return (
    <div className={`relative ${params?.styles}`} id={id || undefined}>
      <ul className="grid gap-6">
        {features?.map((feature) => (
          <FeatureItem
            key={feature.id}
            feature={feature}
            useAccentColor={useAccentColor}
            layout="horizontal"
          />
        ))}
      </ul>
    </div>
  );
};

export const Default = withDatasourceCheck()<FeaturesProps>(DefaultFeatures);
export const Simple = withDatasourceCheck()<FeaturesProps>(SimpleFeatures);
