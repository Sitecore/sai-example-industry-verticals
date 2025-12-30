import { useSearchResultsActions } from '@sitecore-search/react';
import { Select, SortSelect } from '@sitecore-search/ui';

type ResultsPerPageProps = {
  defaultItemsPerPage: number;
};

const ResultsPerPage = ({ defaultItemsPerPage }: ResultsPerPageProps) => {
  const { onResultsPerPageChange } = useSearchResultsActions();

  const options = [10, 25, 50];
  return (
    <div>
      <label className="pr-1">Results Per Page</label>
      <Select.Root
        defaultValue={String(defaultItemsPerPage)}
        onValueChange={(v) =>
          onResultsPerPageChange({
            numItems: Number(v),
          })
        }
      >
        <Select.Trigger className="focus:outline-accent inline-flex h-10 cursor-pointer items-center gap-1 border-0 bg-transparent px-4 py-1">
          <Select.SelectValue />
          <Select.Icon />
        </Select.Trigger>
        <Select.SelectContent className="bg-background-surface z-100 min-w-25 rounded-md shadow-sm">
          <Select.Viewport className="p-1">
            {options.map((option, idx) => (
              <Select.SelectItem
                key={`${option}_${idx}`}
                value={String(option)}
                className="text-foreground-muted whitespace-no-wrap hover:text-foreground focus:outline-accent data-[state=checked]:bg-background-accent data-[state=checked]:text-foreground flex h-6 cursor-pointer items-center rounded-sm px-1 leading-none select-none"
              >
                <SortSelect.OptionText>{option}</SortSelect.OptionText>
              </Select.SelectItem>
            ))}
          </Select.Viewport>
        </Select.SelectContent>
      </Select.Root>
    </div>
  );
};

export default ResultsPerPage;
