import { CheckIcon } from '@radix-ui/react-icons';
import type { SearchResponseFacet } from '@sitecore-search/react';
import { useSearchResultsActions } from '@sitecore-search/react';
import {
  AccordionFacets,
  FacetItem,
  RangeFacet,
  SearchResultsAccordionFacets,
  SearchResultsFacetValueRange,
} from '@sitecore-search/ui';

type PriceFacetProps = {
  min: number;
  max: number;
};

const PriceFacet = ({ min, max }: PriceFacetProps) => {
  return (
    <SearchResultsFacetValueRange
      max={max}
      min={min}
      autoAdjustValues={false}
      className="relative mb-8 flex h-5 w-full touch-none items-center select-none"
    >
      <RangeFacet.Track className="bg-background-accent relative h-0.75 grow rounded-full">
        <RangeFacet.Range className="bg-accent absolute h-full rounded-full" />
      </RangeFacet.Track>
      <RangeFacet.Start className="hover:bg-accent bg-background border-border block size-5 cursor-pointer rounded-full border text-center text-[10px] leading-5 shadow-sm focus:shadow-lg">
        {(value) => <span className="absolute top-7.5 left-0 text-sm">${value}</span>}
      </RangeFacet.Start>
      <RangeFacet.End className="hover:bg-accent bg-background border-border block size-5 cursor-pointer rounded-full border text-center text-[10px] leading-5 shadow-sm focus:shadow-lg">
        {(value) => <span className="absolute top-7.5 left-0 text-sm">${value}</span>}
      </RangeFacet.End>
    </SearchResultsFacetValueRange>
  );
};

type SearchFacetsProps = {
  facets: SearchResponseFacet[];
};

const SearchFacets = ({ facets }: SearchFacetsProps) => {
  const { onFacetClick } = useSearchResultsActions();
  return (
    <SearchResultsAccordionFacets
      defaultFacetTypesExpandedList={['type']}
      onFacetTypesExpandedListChange={() => {}}
      onFacetValueClick={onFacetClick}
      className="w-full"
    >
      {facets.map((f) => (
        <AccordionFacets.Facet
          facetId={f.name}
          key={f.name}
          className="border-border bg-background mb-4 block rounded-lg border p-6 shadow-sm"
        >
          <AccordionFacets.Header className="flex">
            <AccordionFacets.Trigger className="focus:outline-border text-sm font-semibold md:text-base">
              {f.label}
            </AccordionFacets.Trigger>
          </AccordionFacets.Header>
          <AccordionFacets.Content className="mt-8">
            {f.name !== 'price' ? (
              <AccordionFacets.ValueList className="mt-2 flex list-none flex-col space-y-2">
                {f.value.map((v, index: number) => (
                  <FacetItem
                    key={v.id}
                    {...{
                      index,
                      facetValueId: v.id,
                    }}
                    className="group flex cursor-pointer items-center text-sm"
                  >
                    <AccordionFacets.ItemCheckbox className="form-checkbox hover:border-accent aria-checked:bg-background-accent border-border h-5 w-5 flex-none cursor-pointer rounded border transition duration-500 ease-in-out">
                      <AccordionFacets.ItemCheckboxIndicator className="text-accent size-5">
                        <CheckIcon />
                      </AccordionFacets.ItemCheckboxIndicator>
                    </AccordionFacets.ItemCheckbox>
                    <AccordionFacets.ItemLabel className="ms-4 -mt-0.5 text-sm">
                      {v.text} {v.count && `(${v.count})`}
                    </AccordionFacets.ItemLabel>
                  </FacetItem>
                ))}
              </AccordionFacets.ValueList>
            ) : (
              <PriceFacet
                min={Math.floor(f.value[0].min)}
                max={Math.floor(f.value[f.value.length - 1].max)}
              />
            )}
          </AccordionFacets.Content>
        </AccordionFacets.Facet>
      ))}
    </SearchResultsAccordionFacets>
  );
};

export default SearchFacets;
