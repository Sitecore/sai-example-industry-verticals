'use client';

import { useState, useMemo } from 'react';
import { Destination, DestinationSearchResult } from '@/types/destination';
import DestinationCard from '../non-sitecore/DestinationCard';
import { ComponentProps } from '@/lib/component-props';
import { useI18n } from 'next-localization';
import {
  useSearchResults,
  useSearchResultsActions,
  widget,
  WidgetDataType,
  type SearchResultsInitialState,
} from '@sitecore-search/react';
import Spinner from '../non-sitecore/search/Spinner';
import { HeroBannerStyles, TitleSectionFlags } from '@/types/styleFlags';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shadcn/components/ui/dropdown-menu';
import { Check, ChevronDown, Search } from 'lucide-react';
import { AccordionFacets, FacetItem, SearchResultsAccordionFacets } from '@sitecore-search/ui';

export interface DestinationListingProps extends ComponentProps {
  params: { [key: string]: string };
  fields: {
    items: Destination[];
  };
}

type InitialState = SearchResultsInitialState<'itemsPerPage' | 'keyphrase' | 'page' | 'sortType'>;

const ITEMS_PER_PAGE = 6;
const SEARCH_CONFIG = {
  source: process.env.NEXT_PUBLIC_SKYWINGS_SEARCH_SOURCE as string,
};

const DestinationListingInner = (props: DestinationListingProps) => {
  const { t } = useI18n();
  const hideTitleSection = props.params?.styles?.includes(TitleSectionFlags.HideTitleSection);
  const showGradientBackground = props.params?.styles?.includes(
    HeroBannerStyles.ShowGradientOverlay
  );

  const {
    state: { page, itemsPerPage },
    queryResult: {
      isLoading,
      isFetching,
      data: { total_item: totalItems = 0, content: destinations = [], facet: facets = [] } = {},
    },
    actions: { onKeyphraseChange, onPageNumberChange, onFacetClick },
  } = useSearchResults<DestinationSearchResult, InitialState>({
    state: {
      sortType: 'featured_desc',
      page: 1,
      itemsPerPage: ITEMS_PER_PAGE,
      keyphrase: '',
    },
    query: (query) => {
      if (SEARCH_CONFIG.source) {
        const sources = SEARCH_CONFIG.source.split('|');
        sources.forEach((source) => query.getRequest().addSource(source.trim()));
      }
    },
  });

  const displayedResults = useMemo(() => {
    if (page === 1) return destinations;
    const existingIds = new Set(destinations.slice(0, (page - 1) * itemsPerPage).map((d) => d.id));
    return [
      ...destinations.slice(0, (page - 1) * itemsPerPage),
      ...destinations.filter((d) => !existingIds.has(d.id)),
    ];
  }, [destinations, page, itemsPerPage]);

  const totalPages = Math.ceil((totalItems ?? 0) / itemsPerPage);
  const hasMore = page < totalPages;

  const handleLoadMore = () => {
    if (hasMore) {
      onPageNumberChange({ page: page + 1 });
    }
  };

  // Filters
  const [selectedContinent] = useState<string>('');
  const [selectedType] = useState<string>('');
  const [selectedActivity] = useState<string>('');

  type FacetOption = {
    label: string;
    value: string;
    id: string;
    facetId: string;
    facetIndex: number;
    facetValueId: string;
  };

  const getFacetOptions = (facets: any[], facetName: string): FacetOption[] => {
    const facet = facets.find((f) => f.name === facetName);

    if (!facet) return [];

    const options = facet.value.map((v: any, index: number) => ({
      label: `${v.text} (${v.count})`,
      value: v.text,
      id: v.id,
      facetId: facetName,
      facetIndex: index,
      facetValueId: v.id,
    }));

    return [...options];
  };

  const continentOptions = useMemo(() => getFacetOptions(facets, 'continent'), [facets, t]);

  const typeOptions = useMemo(() => getFacetOptions(facets, 'label'), [facets, t]);

  const activityOptions = useMemo(() => getFacetOptions(facets, 'activities'), [facets, t]);

  const FilterDropdown = ({
    options,
    selectedValue,
    placeholder,
    facetId,
    onFacetClick,
  }: {
    options: { label: string; value: string; id: string }[];
    selectedValue: string;
    placeholder: string;
    facetId: string;
    onFacetClick: ReturnType<typeof useSearchResultsActions>['onFacetClick'];
  }) => {
    const selectedLabel = options.find((opt) => opt.value === selectedValue)?.label;
    const displayText = selectedLabel || placeholder;
    const isPlaceholder = !selectedValue || selectedValue === '';

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={`border-border inline-flex h-9 w-full items-center justify-between gap-2 rounded-md border bg-transparent px-4 py-1 text-xs whitespace-nowrap shadow-xs focus:outline-none ${
              isPlaceholder ? 'text-foreground-muted' : 'text-foreground'
            }`}
          >
            <span>{displayText}</span>
            <ChevronDown size={16} className="text-foreground-muted shrink-0" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="min-w-36">
          <SearchResultsAccordionFacets onFacetValueClick={onFacetClick} className="w-full">
            <AccordionFacets.Facet facetId={facetId}>
              <AccordionFacets.ValueList className="flex flex-col space-y-1">
                {options.map((option, index) => (
                  <FacetItem
                    key={option.id}
                    value={option.value}
                    {...{ index, facetValueId: option.id }}
                    className="hover:bg-foreground-muted/10 has-[data-state=checked]:bg-accent-light/10 flex cursor-pointer items-center px-1 py-1 text-xs"
                  >
                    <AccordionFacets.ItemCheckbox className="form-checkbox h-4 w-4 flex-none cursor-pointer rounded">
                      <AccordionFacets.ItemCheckboxIndicator className="text-accent">
                        <Check className="size-3" strokeWidth={4} />
                      </AccordionFacets.ItemCheckboxIndicator>
                    </AccordionFacets.ItemCheckbox>
                    <AccordionFacets.ItemLabel className="ms-2">
                      {option.label}
                    </AccordionFacets.ItemLabel>
                  </FacetItem>
                ))}
              </AccordionFacets.ValueList>
            </AccordionFacets.Facet>
          </SearchResultsAccordionFacets>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <>
      <div
        className={`relative inset-0 z-0 w-full ${
          showGradientBackground ? 'from-accent-dark to-accent bg-linear-to-r' : 'bg-accent'
        }`}
      >
        <div className="container mx-auto flex flex-col items-center justify-center px-4 py-16">
          <h1 className="text-background text-center">
            {t('destinations_hero_title') || 'Explore Amazing Destinations'}
          </h1>
          <div className="text-background/80 mt-4 text-center text-xl">
            {t('destinations_hero_description') ||
              'Discover your next adventure from our curated collection of world-class destinations'}
          </div>

          <div className="mt-8 w-full max-w-5xl px-4">
            <div className="component item-finder destination-search bg-background mx-auto max-w-4xl rounded-lg p-6 shadow-lg">
              <form>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                  <div className="relative">
                    <div className="text-foreground-muted pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2">
                      <Search size={20} />
                    </div>
                    <input
                      type="text"
                      placeholder={t('search_destinations') || 'Search destinations...'}
                      onChange={(e) => {
                        onKeyphraseChange({ keyphrase: e.target.value });
                        onPageNumberChange({ page: 1 });
                      }}
                      className="text-foreground placeholder:text-foreground-muted focus:outline-accent-gray/60 h-9 w-full rounded-md border bg-transparent py-1 pr-6 pl-10 text-xs shadow-xs placeholder:text-xs focus:outline-3"
                    />
                  </div>
                  <FilterDropdown
                    options={continentOptions}
                    selectedValue={selectedContinent}
                    placeholder={t('continent_label') || 'Continent'}
                    facetId="continent"
                    onFacetClick={onFacetClick}
                  />

                  <FilterDropdown
                    options={typeOptions}
                    selectedValue={selectedType}
                    placeholder={t('type_label') || 'Type'}
                    facetId="label"
                    onFacetClick={onFacetClick}
                  />

                  <FilterDropdown
                    options={activityOptions}
                    selectedValue={selectedActivity}
                    placeholder={t('activities_label') || 'Activities'}
                    facetId="activities"
                    onFacetClick={onFacetClick}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {!hideTitleSection && (
          <div className="mb-2">
            <h2 className="mb-2">{t('destinations_sub_title') || 'Popular Destinations'}</h2>
            <p className="text-foreground-light text-xl">
              {t('destinations_short_description') || ''}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 py-8 md:grid-cols-2 lg:grid-cols-3">
          {displayedResults.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>

        {(isLoading || isFetching) && (
          <div className="flex justify-center py-8">
            <Spinner loading />
          </div>
        )}

        {!isLoading && displayedResults.length > 0 && (
          <div className="flex justify-center py-8">
            <button
              onClick={handleLoadMore}
              className="btn-outline w-auto!"
              disabled={!hasMore || isFetching}
            >
              {hasMore
                ? t('load_more_destinations') || 'Load More Destinations'
                : t('all_destinations_loaded') || 'All Destinations Loaded'}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const DestinationListingWidget = widget(
  DestinationListingInner,
  WidgetDataType.SEARCH_RESULTS,
  'destination'
);

export const Default = (props: DestinationListingProps) => {
  const id = props.params.RenderingIdentifier;

  return (
    <section
      className={`component destination-listing ${props?.params?.styles?.trimEnd()}`}
      id={id}
    >
      <DestinationListingWidget rfkId="skywings_search_results" {...props} />
    </section>
  );
};
