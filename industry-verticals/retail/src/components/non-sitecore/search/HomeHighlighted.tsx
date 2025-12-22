import { JSX } from 'react';
import { FilterEqual, WidgetDataType, useSearchResults, widget } from '@sitecore-search/react';
import ArticleCard from './ArticleCard';
import { HOMEHIGHLIGHTED_WIDGET_ID } from '@/constants/search';
import { useSearchTracking, type Events } from '@/hooks/useSearchTracking';

const SEARCH_CONFIG = {
  source: process.env.NEXT_PUBLIC_SEARCH_SOURCE as string,
};

export const HomeHighlightedComponent = (): JSX.Element => {
  const {
    queryResult: { data: { content: articles = [] } = {} },
  } = useSearchResults({
    query: (query) => {
      query.getRequest().setSearchFilter(new FilterEqual('type', 'Article'));

      if (SEARCH_CONFIG.source !== '') {
        const sources = SEARCH_CONFIG.source.split('|');
        sources.forEach((source) => {
          query.getRequest().addSource(source.trim());
        });
      }
    },
  });

  const articlesToShow = articles.slice(0, 4);
  const { handleSearch } = useSearchTracking();

  return (
    <div className="container mx-auto px-4">
      <div className="my-12 text-center">
        <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">Get Inspired</h2>
        <p className="text-foreground-muted text-xl">
          Discover amazing products and articles from our latest stories
        </p>
      </div>

      <div className="text-foreground my-10 flex w-full justify-around">
        <div className="grid grid-cols-4 gap-x-5 gap-y-3">
          {articlesToShow.map((a, index) => (
            <ArticleCard
              article={a}
              key={a?.id ?? index}
              index={index}
              onItemClick={(e) =>
                handleSearch(e, {
                  url: a.url,
                  widgetId: HOMEHIGHLIGHTED_WIDGET_ID,
                  entityType: 'content',
                  events: ['EntityPageView', 'SearchClickEvent'] as Events[],
                  entityId: a.id,
                  itemIndex: index,
                })
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default widget(HomeHighlightedComponent, WidgetDataType.SEARCH_RESULTS, 'content');
