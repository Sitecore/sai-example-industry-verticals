import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shadcn/components/ui/dropdown-menu';
import { useSearchResultsActions } from '@sitecore-search/react';
import { AccordionFacets, FacetItem, SearchResultsAccordionFacets } from '@sitecore-search/ui';
import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const FilterDropdown = ({
  options,
  selectedValues = [],
  placeholder,
  facetId,
  onFacetClick,
}: {
  options: { label: string; value: string; id: string }[];
  selectedValues: string[];
  placeholder: string;
  facetId: string;
  onFacetClick: ReturnType<typeof useSearchResultsActions>['onFacetClick'];
}) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = useState<number>(0);

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          ref={triggerRef}
          type="button"
          className={`border-border inline-flex h-9 w-full items-center justify-between gap-2 rounded-md border bg-transparent px-4 py-1 text-xs whitespace-nowrap shadow-xs focus:outline-none ${
            selectedValues?.length > 0 ? 'text-foreground' : 'text-foreground-muted'
          }`}
        >
          <span>{placeholder}</span>{' '}
          <div className="flex items-center gap-2">
            {selectedValues?.length > 0 && (
              <span className="bg-accent/20 text-accent ml-1 rounded-full px-2 py-0.5 text-xs font-bold">
                {selectedValues.length}
              </span>
            )}
            <ChevronDown size={16} className="text-foreground-muted shrink-0" />
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" style={{ minWidth: `${triggerWidth}px` }}>
        <SearchResultsAccordionFacets onFacetValueClick={onFacetClick} className="w-full">
          <AccordionFacets.Facet facetId={facetId}>
            <AccordionFacets.ValueList className="flex flex-col space-y-1">
              {options.map((option, index) => (
                <FacetItem
                  key={option.id}
                  value={option.value}
                  {...{ index, facetValueId: option.id }}
                  className="hover:bg-foreground-muted/10 [&:has([data-state=checked])]:bg-accent/20 flex cursor-pointer items-center px-1 py-1 text-xs"
                >
                  <AccordionFacets.ItemCheckbox className="form-checkbox h-4 w-4 flex-none cursor-pointer rounded">
                    <AccordionFacets.ItemCheckboxIndicator className="text-accent">
                      <Check className="size-3" strokeWidth={4} />
                    </AccordionFacets.ItemCheckboxIndicator>
                  </AccordionFacets.ItemCheckbox>
                  <AccordionFacets.ItemLabel className="ms-2 flex-1">
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

export default FilterDropdown;
