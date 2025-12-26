'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { cn } from '@/shadcn/lib/utils';

export interface DatePickerProps {
  selected?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholderText?: string;
  dateFormat?: string;
  minDate?: Date;
  maxDate?: Date;
  showIcon?: boolean;
  inputClassName?: string;
}

export function DatePicker({
  selected,
  onChange,
  placeholderText = 'Select date',
  dateFormat = 'MMM d, yyyy',
  minDate,
  maxDate,
  showIcon = true,
  inputClassName,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (date: Date | null) => {
    if (onChange) {
      onChange(date);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'border-border text-foreground placeholder:text-foreground-muted focus:border-accent focus:ring-accent/20 focus:bg-background relative w-full rounded-md border bg-transparent py-1.5 pr-3 text-left text-xs leading-normal transition-all duration-200 ease-in-out focus:ring-2 focus:outline-none',
            showIcon ? 'pl-9' : 'pl-3',
            !selected && 'text-foreground-muted',
            inputClassName
          )}
        >
          {showIcon && (
            <div className="text-foreground-muted pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2">
              <CalendarIcon size={16} />
            </div>
          )}
          <span
            className={cn(
              showIcon ? 'pl-2' : '',
              !selected && 'text-xs font-semibold',
              selected && 'text-xs'
            )}
          >
            {selected ? format(selected, dateFormat) : placeholderText}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <Calendar selected={selected} onSelect={handleSelect} minDate={minDate} maxDate={maxDate} />
      </PopoverContent>
    </Popover>
  );
}
