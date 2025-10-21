import { Field, RichTextField, ImageField } from '@sitecore-content-sdk/nextjs';

export type IGQLField<T> = { jsonValue: T };

export interface FeatureFields {
  id: string;
  featureHeading: IGQLField<Field<string>>;
  featureDescription: IGQLField<RichTextField>;
  featureIcon: IGQLField<ImageField>;
  featureIconDark: IGQLField<ImageField>;
}

interface CreateIGQLDataType<ResultsType, TopLevelFields extends Record<string, unknown>> {
  createItems: (count: number) => ResultsType;
  count: number;
  topLevelFields: TopLevelFields;
}

export const createIGQLData = <ResultsType, TopLevelFields extends Record<string, unknown>>({
  createItems,
  count,
  topLevelFields,
}: CreateIGQLDataType<ResultsType, TopLevelFields>) => {
  return {
    data: {
      datasource: {
        children: {
          results: createItems(count),
        },
        ...topLevelFields,
      },
    },
  };
};

export const createSearchQueryData = <ResultsType, TopLevelFields extends Record<string, unknown>>({
  createItems,
  count,
  topLevelFields,
}: CreateIGQLDataType<ResultsType, TopLevelFields>) => {
  return {
    data: {
      search: {
        results: createItems(count),
        ...topLevelFields,
      },
    },
  };
};
