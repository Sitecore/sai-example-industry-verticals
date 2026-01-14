'use client';

import { useState, useEffect } from 'react';
import { Destination, DestinationSearchResult } from '@/types/destination';
import DestinationCard from '../non-sitecore/DestinationCard';
import { ComponentProps } from '@/lib/component-props';
import { useI18n } from 'next-localization';
import {
  useSearchResults,
  widget,
  WidgetDataType,
  type SearchResultsInitialState,
} from '@sitecore-search/react';
import Spinner from '../non-sitecore/search/Spinner';
import { TitleSectionFlags } from '@/types/styleFlags';

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
  const {
    state: { page, itemsPerPage },
    queryResult: {
      isLoading,
      isFetching,
      data: { total_item: totalItems = 0, content: destinations = [] } = {},
    },
    actions: { onKeyphraseChange, onPageNumberChange },
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
        sources.forEach((source) => {
          query.getRequest().addSource(source.trim());
        });
      }
    },
  });

  const [displayedResults, setDisplayedResults] = useState<DestinationSearchResult[]>([]);

  useEffect(() => {
    if (page === 1) {
      setDisplayedResults(destinations);
    } else {
      setDisplayedResults((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const newItems = destinations.filter((d) => !existingIds.has(d.id));
        return [...prev, ...newItems];
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

  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          placeholder={t('search_destinations') || 'Search destinations...'}
          className="text-foreground w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onChange={(e) => onKeyphraseChange({ keyphrase: e.target.value })}
        />
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
      className={`component destination-listing py-6 ${props?.params?.styles?.trimEnd()}`}
      id={id}
    >
      <div className="container">
        <DestinationListingWidget rfkId="skywings_search_results" {...props} />
      </div>
    </section>
  );
};
