import { IGQLField, IGQLTextField } from '@/types/igql';
import {
  ComponentParams,
  ComponentRendering,
  Link,
  LinkField,
  Text,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import React from 'react';

interface Fields {
  data: {
    datasource: {
      children: {
        results: Deal[];
      };
      title: IGQLTextField;
      description: IGQLTextField;
    };
  };
}

interface Deal {
  dealTitle: IGQLTextField;
  dealDescription: IGQLTextField;
  dealCtaLink: IGQLField<LinkField>;
  offerText: IGQLTextField;
  dealValidity: IGQLTextField;
}

type DealsProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

type DealWrapperProps = {
  props: DealsProps;
  children: React.ReactNode;
};

const DealWrapper = (wrapperProps: DealWrapperProps) => {
  const id = wrapperProps.props.params.RenderingIdentifier;
  return (
    <section className={`py-16 ${wrapperProps.props.params.styles}`} id={id ? id : undefined}>
      {wrapperProps.children}
    </section>
  );
};

export const Default = (props: DealsProps) => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const results = props.fields.data.datasource.children.results;
  const mainTitle = props.fields.data.datasource.title;
  const mainDescription = props.fields.data.datasource.description;

  return (
    <DealWrapper props={props}>
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-bold">
            <Text field={mainTitle.jsonValue} />
          </h2>
          <p className="text-foreground-light text-xl">
            <Text field={mainDescription.jsonValue} />
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((item, index) => {
            const title = item.dealTitle.jsonValue;
            const description = item.dealDescription.jsonValue;
            const link = item.dealCtaLink.jsonValue;
            const offer = item.offerText.jsonValue;
            const validity = item.dealValidity.jsonValue;
            const hasContent =
              title?.value ||
              description?.value ||
              link?.value?.href ||
              offer?.value ||
              validity?.value;

            return (
              (hasContent || isPageEditing) && (
                <div
                  key={index}
                  className="border-accent-light flex flex-col rounded-lg border-2 transition-colors"
                >
                  <div className="flex min-h-24 items-start justify-between gap-6 p-4">
                    <h3 className="flex-1 text-xl font-bold">
                      <Text field={title} />
                    </h3>

                    {(offer?.value || isPageEditing) && (
                      <span className="bg-danger text-background self-start rounded px-2 py-1 text-base font-semibold">
                        <Text field={offer} />
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-4 pt-0">
                    <p className="mb-4">
                      <Text field={description} />
                    </p>

                    <p className="text-accent mb-4 text-sm font-medium">
                      <Text field={validity} />
                    </p>

                    <div className="bg-foreground text-background mt-auto w-full rounded-md py-2 text-center transition hover:opacity-90">
                      <Link field={link} />
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </DealWrapper>
  );
};
