import type { ChangeEvent, SyntheticEvent } from 'react';
import { useCallback, useRef, useState, useEffect } from 'react';
import type { PreviewSearchInitialState } from '@sitecore-search/react';
import { WidgetDataType, usePreviewSearch, widget } from '@sitecore-search/react';
import { ArticleCard, PreviewSearch } from '@sitecore-search/ui';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Spinner from './Spinner';
import SuggestionBlock from './SuggestionBlock';
import { DEFAULT_IMG_URL, PREVIEW_WIDGET_ID } from '@/constants/search';
import { useSearchTracking, type Events } from '@/hooks/useSearchTracking';

const SEARCH_CONFIG = {
  source: process.env.NEXT_PUBLIC_SEARCH_SOURCE as string,
};

type ArticleModel = {
  id: string;
  title: string;
  image_url: string;
  url: string;
  source_id?: string;
  name: string;
};

type PreviewSearchComponentProps = {
  defaultItemsPerPage?: number;
  isOpen: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type InitialState = PreviewSearchInitialState<'itemsPerPage' | 'suggestionsList'>;

export const PreviewSearchComponent = ({
  defaultItemsPerPage = 6,
  isOpen,
  setIsSearchOpen,
}: PreviewSearchComponentProps) => {
  const router = useRouter();
  const { handleSearch } = useSearchTracking();
  const formRef = useRef<HTMLFormElement>(null);
  const [contentWidth, setContentWidth] = useState<number | undefined>(undefined);

  const {
    actions: { onKeyphraseChange },
    queryResult,
    queryResult: {
      isFetching,
      isLoading,
      data: { suggestion: { title_context_aware: articleSuggestions = [] } = {} } = {},
    },
  } = usePreviewSearch<ArticleModel, InitialState>({
    state: {
      suggestionsList: [{ suggestion: 'title_context_aware', max: 6 }],
      itemsPerPage: defaultItemsPerPage,
    },
    query: (query) => {
      if (SEARCH_CONFIG.source !== '') {
        const sources = SEARCH_CONFIG.source.split('|');
        sources.forEach((source) => {
          query.getRequest().addSource(source.trim());
        });
      }
    },
  });

  const loading = isLoading || isFetching;

  useEffect(() => {
    const updateWidth = () => {
      if (formRef.current) {
        setContentWidth(formRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const keyphraseHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const target = event.target;
      onKeyphraseChange({ keyphrase: target.value });
    },
    [onKeyphraseChange]
  );

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    if (isOpen) setIsSearchOpen(false);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const target = e.target.query as HTMLInputElement;
    router.push(`/search?q=${target.value}`);
    target.value = '';
  };

  return (
    <PreviewSearch.Root>
      <form ref={formRef} onSubmit={handleSubmit} className="flex-1">
        <PreviewSearch.Input
          name="query"
          className="focus:ring-accent border-border w-full rounded-md border px-3 py-2 text-base focus:border-transparent focus:ring-2 focus:outline-none sm:px-4 sm:py-3 sm:text-lg"
          onChange={keyphraseHandler}
          autoComplete="off"
          placeholder="Search content, products..."
        />
      </form>

      <PreviewSearch.Content
        className="bg-background mt-0.5 flex h-100 justify-center overflow-hidden rounded-b-md pt-0 shadow-xl transition-opacity sm:w-(--radix-popover-trigger-width)"
        style={contentWidth ? { width: `${contentWidth}px` } : undefined}
      >
        <Spinner loading={loading} />

        {!loading && (
          <React.Fragment key="1">
            {articleSuggestions.length > 0 && (
              <PreviewSearch.Suggestions className="box-border hidden list-none text-sm sm:block sm:w-48 lg:w-64">
                <SuggestionBlock
                  blockId={'title_context_aware'}
                  items={articleSuggestions}
                  title={'Suggestions'}
                />
              </PreviewSearch.Suggestions>
            )}

            <PreviewSearch.Results defaultQueryResult={queryResult}>
              {({ isFetching: isResultsFetching, data: { content: articles = [] } = {} }) => (
                <PreviewSearch.Items
                  data-loading={isResultsFetching}
                  className="bg-background flex w-full overflow-y-auto data-[loading=false]:m-0 data-[loading=false]:grid data-[loading=false]:list-none data-[loading=false]:grid-cols-1 data-[loading=false]:gap-2 data-[loading=false]:p-2 sm:flex-3 sm:data-[loading=false]:grid-cols-2 sm:data-[loading=false]:gap-3 lg:data-[loading=false]:grid-cols-3"
                >
                  <Spinner loading={isResultsFetching} />

                  {!isResultsFetching &&
                    articles.map((article, index) => (
                      <PreviewSearch.Item key={article.id} asChild>
                        <PreviewSearch.ItemLink
                          onClick={(e) =>
                            handleSearch(e, {
                              url: article.url,
                              widgetId: PREVIEW_WIDGET_ID,
                              entityType: 'content',
                              events: ['EntityPageView', 'PreviewSearchClickEvent'] as Events[],
                              entityId: article.id,
                              itemIndex: index,
                            })
                          }
                          href={article.url}
                          className="box-border flex max-h-48 w-full text-black no-underline focus:shadow-sm"
                        >
                          <ArticleCard.Root className="block w-full cursor-pointer rounded-md border border-solid border-transparent p-2 text-center shadow-sm transition-shadow focus-within:shadow-xl hover:shadow-md">
                            <div className="relative m-auto mb-2 flex h-20 items-center justify-center overflow-hidden sm:mb-2.5 sm:h-24">
                              <Image
                                src={
                                  article.image_url?.trim() ? article.image_url : DEFAULT_IMG_URL
                                }
                                className="block h-auto max-h-full w-auto max-w-full"
                                alt="alt"
                                width={200}
                                height={100}
                                unoptimized
                              />
                            </div>
                            <ArticleCard.Title className="m-0 mb-1.5 max-h-8 overflow-hidden text-xs sm:mb-2 sm:text-sm">
                              {article.name}
                            </ArticleCard.Title>
                          </ArticleCard.Root>
                        </PreviewSearch.ItemLink>
                      </PreviewSearch.Item>
                    ))}
                </PreviewSearch.Items>
              )}
            </PreviewSearch.Results>
          </React.Fragment>
        )}
      </PreviewSearch.Content>
    </PreviewSearch.Root>
  );
};

const PreviewSearchWidget = widget(
  PreviewSearchComponent,
  WidgetDataType.PREVIEW_SEARCH,
  'content'
);
export default PreviewSearchWidget;
