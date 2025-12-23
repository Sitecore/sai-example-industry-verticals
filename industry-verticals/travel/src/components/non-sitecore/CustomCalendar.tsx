'use client';

import React, { JSX } from 'react';
import DatePicker, { DatePickerProps } from 'react-datepicker';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps extends Omit<DatePickerProps, 'onChange' | 'selected'> {
  selected?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholderText?: string;
  showIcon?: boolean;
  iconClassName?: string;
  inputClassName?: string;
  wrapperClassName?: string;
  popperClassName?: string;
  calendarClassName?: string;
}

const CustomCalendar: React.FC<CalendarProps> = ({
  selected,
  onChange,
  placeholderText = 'Select date',
  showIcon = true,
  iconClassName = '',
  inputClassName = '',
  wrapperClassName = '',
  popperClassName = 'react-datepicker-popper',
  calendarClassName = 'react-datepicker-calendar',
  dateFormat = 'MMM d, yyyy',
  ...restProps
}): JSX.Element => {
  const handleChange = (date: Date | null) => {
    if (onChange) {
      onChange(date);
    }
  };
  // Custom header renderer for datepicker
  const renderCustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: {
    date: Date;
    decreaseMonth: () => void;
    increaseMonth: () => void;
    prevMonthButtonDisabled: boolean;
    nextMonthButtonDisabled: boolean;
  }) => {
    const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    return (
      <div className="react-datepicker__header-custom">
        <button
          type="button"
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
          className="react-datepicker__navigation react-datepicker__navigation--previous"
          aria-label="Previous Month"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="react-datepicker__current-month">{monthYear}</div>
        <button
          type="button"
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
          className="react-datepicker__navigation react-datepicker__navigation--next"
          aria-label="Next Month"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    );
  };

  return (
    <div className="relative">
      {showIcon && (
        <div
          className={`text-foreground-muted absolute top-1/2 left-3 z-10 -translate-y-1/2 ${iconClassName}`}
        >
          <CalendarIcon size={16} />
        </div>
      )}
      <DatePicker
        selected={selected}
        onChange={handleChange}
        placeholderText={placeholderText}
        dateFormat={dateFormat}
        className={`calendar-input border-border bg-background text-foreground placeholder:text-foreground-muted focus:border-accent focus:ring-accent/20 w-full rounded-lg border py-2 pr-3 ${showIcon ? 'pl-9' : 'pl-3'} text-sm focus:ring-2 focus:outline-none ${inputClassName}`}
        wrapperClassName={wrapperClassName || 'w-full'}
        popperClassName={popperClassName}
        calendarClassName={calendarClassName}
        renderCustomHeader={renderCustomHeader}
        {...(restProps as any)}
      />
    </div>
  );
};

export default CustomCalendar;
