'use client';

import { useState, useMemo, useEffect } from 'react';
import { Destination, DestinationSearchResult } from '@/types/destination';
import DestinationCard from '../non-sitecore/DestinationCard';
import { ComponentProps } from '@/lib/component-props';
import { useI18n } from 'next-localization';
import {
  useSearchResults,
  widget,
  WidgetDataType,
  type SearchResultsInitialState,
  useSearchResultsSelectedFacets,
  SearchResponseFacet,
  SearchResponseFacetItem,
} from '@sitecore-search/react';
import { HeroBannerStyles, TitleSectionFlags } from '@/types/styleFlags';
import { LoaderCircle, Search } from 'lucide-react';
import FilterDropdown from '../non-sitecore/search/FilterDropdown';
import { DESTINATIONS_WIDGET_ID, SEARCH_WIDGET_ID } from '@/constants/search';

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

  const [displayedResults, setDisplayedResults] = useState<DestinationSearchResult[]>([]);

  useEffect(() => {
    if (page === 1) {
      setDisplayedResults((prev) => {
        // Only update if destinations actually changed
        const isSame =
          prev.length === destinations.length && prev.every((p, i) => p.id === destinations[i]?.id);
        return isSame ? prev : destinations;
      });
    } else {
      setDisplayedResults((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const newItems = destinations.filter((d) => !existingIds.has(d.id));
        // Only update if there are actually new items
        return newItems.length === 0 ? prev : [...prev, ...newItems];
      });
    }
  }, [destinations, page]);

  const totalPages = Math.ceil((totalItems ?? 0) / itemsPerPage);
  const hasMore = page < totalPages;

  const handleLoadMore = () => {
    if (hasMore) {
      onPageNumberChange({ page: page + 1 });
    }
  };

  type FacetOption = {
    label: string;
    value: string;
    id: string;
    facetId: string;
    facetIndex: number;
    facetValueId: string;
  };

  const getFacetOptions = (facets: SearchResponseFacet[], facetName: string): FacetOption[] => {
    const facet = facets.find((f) => f.name === facetName);

    if (!facet) return [];

    const options = facet.value.map((v: SearchResponseFacetItem, index: number) => ({
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

  const selectedFacets = useSearchResultsSelectedFacets();

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
                <div className="grid grid-cols-1 gap-4 md:grid-cols-[2fr_1fr_1fr_1fr]">
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
                    placeholder={t('continent_label') || 'Continent'}
                    facetId="continent"
                    selectedValues={
                      selectedFacets
                        .find((f) => f.id === 'continent')
                        ?.values.map((v) => v.valueLabel || '') || []
                    }
                    onFacetClick={onFacetClick}
                  />

                  <FilterDropdown
                    options={typeOptions}
                    placeholder={t('type_label') || 'Type'}
                    facetId="label"
                    selectedValues={
                      selectedFacets
                        .find((f) => f.id === 'label')
                        ?.values.map((v) => v.valueLabel || '') || []
                    }
                    onFacetClick={onFacetClick}
                  />

                  <FilterDropdown
                    options={activityOptions}
                    placeholder={t('activities_label') || 'Activities'}
                    facetId="activities"
                    selectedValues={
                      selectedFacets
                        .find((f) => f.id === 'activities')
                        ?.values.map((v) => v.valueLabel || '') || []
                    }
                    onFacetClick={onFacetClick}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="container pt-6">
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
          <div className="relative flex justify-center py-8">
            <LoaderCircle className="text-accent inline size-10 animate-spin" />
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
      <DestinationListingWidget rfkId={DESTINATIONS_WIDGET_ID} {...props} />
    </section>
  );
};
