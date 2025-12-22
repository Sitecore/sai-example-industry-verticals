import type { SearchResponseSortChoice } from '@sitecore-search/react';
import { useSearchResultsActions } from '@sitecore-search/react';
import { SortSelect } from '@sitecore-search/ui';

type SortOrderProps = {
  options: Array<SearchResponseSortChoice>;
  selected: string;
};
const SortOrder = ({ options, selected }: SortOrderProps) => {
  const selectedSortIndex = options.findIndex((s) => s.name === selected);
  const { onSortChange } = useSearchResultsActions();
  return (
    <SortSelect.Root defaultValue={options[selectedSortIndex]?.name} onValueChange={onSortChange}>
      <SortSelect.Trigger className="focus:outline-accent inline-flex h-10 cursor-pointer items-center gap-1 border-0 bg-transparent py-1">
        <SortSelect.SelectValue>
          {selectedSortIndex > -1 ? options[selectedSortIndex].label : ''}
        </SortSelect.SelectValue>
        <SortSelect.Icon />
      </SortSelect.Trigger>
      <SortSelect.Content className="bg-background absolute top-8 z-100 min-w-37.5 rounded-md shadow-sm">
        <SortSelect.Viewport className="z-50000 p-1">
          {options.map((option) => (
            <SortSelect.Option
              value={option}
              key={option.name}
              className="text-foreground-muted whitespace-no-wrap hover:text-foreground focus:outline-accent data-[state=checked]:bg-background-accent data-[state=checked]:text-foreground flex h-6 cursor-pointer items-center rounded-sm px-1 leading-none select-none"
            >
              <SortSelect.OptionText>{option.label}</SortSelect.OptionText>
            </SortSelect.Option>
          ))}
        </SortSelect.Viewport>
      </SortSelect.Content>
    </SortSelect.Root>
  );
};

export default SortOrder;
