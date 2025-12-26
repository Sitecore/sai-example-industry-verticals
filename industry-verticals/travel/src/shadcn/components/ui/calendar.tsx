'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isBefore,
  isAfter,
  startOfDay,
} from 'date-fns';

import { cn } from '@/shadcn/lib/utils';

export interface CalendarProps {
  selected?: Date | null;
  onSelect?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

export function Calendar({ selected, onSelect, minDate, maxDate, className }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(
    selected ? startOfMonth(selected) : startOfMonth(new Date())
  );

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const monthYear = format(currentMonth, 'MMMM yyyy');

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateClick = (day: Date) => {
    if (minDate && isBefore(day, startOfDay(minDate))) {
      return;
    }
    if (maxDate && isAfter(day, startOfDay(maxDate))) {
      return;
    }
    if (onSelect) {
      onSelect(day);
    }
  };

  const isDateDisabled = (day: Date) => {
    if (minDate && isBefore(day, startOfDay(minDate))) {
      return true;
    }
    if (maxDate && isAfter(day, startOfDay(maxDate))) {
      return true;
    }
    return false;
  };

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div className={cn('bg-background rounded-lg border p-2.5', className)}>
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={handlePreviousMonth}
          className="text-foreground-muted hover:text-foreground hover:bg-background-muted rounded-md p-1 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft size={14} />
        </button>
        <div className="text-foreground text-xs font-bold">{monthYear}</div>
        <button
          type="button"
          onClick={handleNextMonth}
          className="text-foreground-muted hover:text-foreground hover:bg-background-muted rounded-md p-1 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Week day names */}
      <div className="mb-2 grid grid-cols-7 gap-0.5">
        {weekDays.map((day) => (
          <div key={day} className="text-foreground-light/60 text-center text-xs font-semibold">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-x-0.5 gap-y-2">
        {days.map((day, dayIdx) => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isSelected = selected && isSameDay(day, selected);
          const isDisabled = isDateDisabled(day);
          const isToday = isSameDay(day, new Date());

          return (
            <button
              key={dayIdx}
              type="button"
              onClick={() => handleDateClick(day)}
              disabled={isDisabled}
              className={cn(
                'text-foreground hover:bg-background-muted relative flex h-7 w-7 items-center justify-center rounded-md text-xs transition-colors',
                !isCurrentMonth && 'text-foreground-muted opacity-50',
                isSelected && 'bg-foreground text-background hover:bg-foreground',
                isDisabled && 'cursor-not-allowed opacity-50 hover:bg-transparent',
                isToday && !isSelected && 'text-foreground'
              )}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
}
