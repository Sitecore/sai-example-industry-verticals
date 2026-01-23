import React, { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';
import { useSearchParams } from 'next/navigation';
import QuestionsAnswers from '../non-sitecore/search/QuestionsAnswers';
import SearchResultsWidget from '../non-sitecore/search/SearchResultsComponent';
import { SEARCH_WIDGET_ID } from '@/constants/search';
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export type SearchResultsProps = ComponentProps & {
  params: { [key: string]: string };
};

export const SearchResults = (props: SearchResultsProps): JSX.Element => {
  const sxaStyles = `${props.params?.styles || ''}`;
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';

  console.log(`grabbed keyword from querystring: ${query}`);

  return (
    <div key={query} className={`${sxaStyles} w-full`}>
      <QuestionsAnswers
        key={`${query}-questions`}
        rfkId="rfkid_qa"
        defaultKeyphrase={query}
        defaultRelatedQuestions={3}
      />
      <SearchResultsWidget rfkId={SEARCH_WIDGET_ID} defaultKeyphrase={query} />
    </div>
  );
};

export const Default = SearchResults;
