'use client';

import { useState, useMemo } from 'react';
import { Destination } from '@/types/destination';
import DestinationCard from '../non-sitecore/DestinationCard';
import { ComponentProps } from '@/lib/component-props';
import { useI18n } from 'next-localization';
import { TitleSectionFlags } from '@/types/styleFlags';

export interface DestinationListingProps extends ComponentProps {
  params: { [key: string]: string };
  fields: {
    items: Destination[];
  };
}

const ITEMS_PER_PAGE = 6;

export const Default = (props: DestinationListingProps) => {
  const { t } = useI18n();
  const id = props.params.RenderingIdentifier;
  const hideTitleSection = props.params?.styles?.includes(TitleSectionFlags.HideTitleSection);

  const destinations = useMemo(() => {
    return props.fields.items.filter(
      (destination) => destination.fields && Object.keys(destination.fields).length > 0
    );
  }, [props.fields.items]);

  const [currentPage, setCurrentPage] = useState(1);
  const displayedDestinations = useMemo(() => {
    return destinations.slice(0, currentPage * ITEMS_PER_PAGE);
  }, [currentPage, destinations]);

  const hasMore = displayedDestinations.length < destinations.length;

  const handleLoadMore = () => {
    if (hasMore) setCurrentPage((prev) => prev + 1);
  };

  return (
    <section
      className={`component destination-listing py-6 ${props?.params?.styles?.trimEnd()}`}
      id={id}
    >
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
          {displayedDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>

        <div className="flex justify-center py-8">
          <button onClick={handleLoadMore} className="btn-outline w-auto!" disabled={!hasMore}>
            {hasMore
              ? t('load_more_destinations') || 'Load More Destinations'
              : t('all_destinations_loaded') || 'All Destinations Loaded'}
          </button>
        </div>
      </div>
    </section>
  );
};
