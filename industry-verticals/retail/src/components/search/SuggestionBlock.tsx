import { useRouter } from 'next/navigation';
import { usePreviewSearchActions } from '@sitecore-search/react';
import { PreviewSearch } from '@sitecore-search/ui';

type SuggestionBlockProps = {
  items: Array<{ text: string }>;
  title: string;
  blockId: string;
  filterAttribute?: string;
  disabled?: boolean;
};

const SuggestionBlock = ({
  items,
  title,
  blockId,
  filterAttribute,
  disabled,
}: SuggestionBlockProps) => {
  const { onSuggestionClick } = usePreviewSearchActions();
  const router = useRouter();
  return (
    <>
      {items.length > 0 && (
        <PreviewSearch.SuggestionsGroup
          className="flex flex-1 flex-col"
          id={blockId}
          filterAttribute={filterAttribute}
        >
          <h2 className="m-2 box-border block pl-1 text-lg font-bold">{title}</h2>
          {items.map(({ text }) => (
            <PreviewSearch.SuggestionTrigger
              className="text-foreground-light hover:text-foreground data-[state=active]:text-foreground cursor-pointer p-2 text-sm transition-colors hover:bg-white hover:outline-none focus:bg-white focus:outline-none data-[state=active]:bg-white data-[state=active]:outline-none"
              id={text}
              key={text}
              asChild
              disabled={disabled}
            >
              <a
                onClick={() => {
                  onSuggestionClick({
                    name: blockId,
                    title,
                    value: text,
                    displayName: text,
                  });
                  router.push('/search?q=' + text);
                }}
              >
                {text}
              </a>
            </PreviewSearch.SuggestionTrigger>
          ))}
        </PreviewSearch.SuggestionsGroup>
      )}
    </>
  );
};

export default SuggestionBlock;
