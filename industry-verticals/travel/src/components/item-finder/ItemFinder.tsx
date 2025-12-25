'use client';

import React, { useState, useMemo, JSX } from 'react';
import { Field, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { useI18n } from 'next-localization';
import { Search, MapPin, Users, Plane, ChevronDown, Check } from 'lucide-react';
import Calendar from '@/components/non-sitecore/CustomCalendar';

interface Fields {
  PlaceholderText?: Field<string>;
  SearchButtonText?: Field<string>;
}

interface ItemFinderProps extends ComponentProps {
  fields?: Fields;
}

// Simple variant - Simple search bar
export const Simple = ({ params, fields }: ItemFinderProps): JSX.Element => {
  const { page } = useSitecore();
  const { t } = useI18n();
  const { styles, RenderingIdentifier: id } = params;
  const isPageEditing = page.mode.isEditing;
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
  };

  if (!fields && !isPageEditing) {
    return <></>;
  }

  return (
    <div
      className={`component item-finder article-search mx-auto max-w-md ${styles || ''}`}
      id={id || undefined}
    >
      {isPageEditing && !fields && (
        <div className="text-foreground-muted p-4 text-center">[ITEM FINDER - SIMPLE]</div>
      )}
      {(!isPageEditing || fields) && (
        <form onSubmit={handleSubmit}>
          <div className="relative w-full">
            <div className="text-foreground-muted absolute top-1/2 left-4 -translate-y-1/2">
              <Search size={20} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('search_articles_placeholder') || 'Search articles...'}
              className="item-finder-input bg-background text-foreground placeholder:text-foreground-muted focus:ring-accent w-full rounded-lg px-12 py-3 focus:ring-2 focus:outline-none"
            />
          </div>
        </form>
      )}
    </div>
  );
};

// Large variant - Complex form with date pickers
export const Large = ({ params, fields }: ItemFinderProps): JSX.Element => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;
  const { t } = useI18n();
  const isPageEditing = page.mode.isEditing;
  const [tripType, setTripType] = useState<'round-trip' | 'one-way' | 'multi-city'>('round-trip');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [passengers, setPassengers] = useState(1);
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);

  const passengerOptions = useMemo(
    () => [
      { label: t('1adult') || '1 Adult', value: 1 },
      { label: t('2adults') || '2 Adults', value: 2 },
      { label: t('3adults'), value: 3 },
      { label: t('4adults') || '4 Adults', value: 4 },
    ],
    [t]
  );

  const tripTypeOptions = useMemo(
    () => [
      { value: 'round-trip' as const, dictKey: 'round_trip_label', defaultLabel: 'Round Trip' },
      { value: 'one-way' as const, dictKey: 'one_way_label', defaultLabel: 'One Way' },
      { value: 'multi-city' as const, dictKey: 'multi_city_label', defaultLabel: 'Multi-city' },
    ],
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle flight search logic here
  };

  if (!fields && !isPageEditing) {
    return <></>;
  }

  return (
    <div
      className={`component item-finder flight-booking-form ${styles || ''}`}
      id={id || undefined}
    >
      {isPageEditing && !fields && (
        <div className="text-foreground-muted p-4 text-center">[ITEM FINDER - LARGE]</div>
      )}
      {(!isPageEditing || fields) && (
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flight-booking-card w-full rounded-xl p-6 shadow-xl">
            {/* Trip Type Selection */}
            <div className="mb-6 flex gap-2">
              {tripTypeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTripType(option.value)}
                  className={`trip-type-btn border-border rounded-md border px-2.5 py-1.5 text-sm font-medium transition-all ${
                    tripType === option.value
                      ? 'bg-foreground text-background border-foreground shadow-sm'
                      : 'text-foreground-muted hover:bg-background-muted hover:border-foreground-muted bg-transparent'
                  }`}
                >
                  {t(option.dictKey) || option.defaultLabel}
                </button>
              ))}
            </div>

            {/* Input Fields Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[1.15fr_1.15fr_1fr_1fr_0.85fr]">
              {/* From */}
              <div className="flight-input-group">
                <label className="flight-input-label">{t('from_label') || 'From'}</label>
                <div className="relative">
                  <div className="text-foreground-muted absolute top-1/2 left-3 z-10 -translate-y-1/2">
                    <MapPin size={16} />
                  </div>
                  <input
                    type="text"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder={t('departure_city_placeholder') || 'Departure city'}
                    className="flight-input border-border text-foreground placeholder:text-foreground-muted focus:border-accent focus:ring-accent/20 focus:bg-background w-full rounded-lg border bg-transparent py-2 pr-3 pl-9 text-sm placeholder:text-xs focus:ring-2 focus:outline-none"
                  />
                </div>
              </div>

              {/* To */}
              <div className="flight-input-group">
                <label className="flight-input-label">{t('to_label') || 'To'}</label>
                <div className="relative">
                  <div className="text-foreground-muted absolute top-1/2 left-3 z-10 -translate-y-1/2">
                    <MapPin size={16} />
                  </div>
                  <input
                    type="text"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder={t('destination_city_placeholder') || 'Destination city'}
                    className="flight-input border-border text-foreground placeholder:text-foreground-muted focus:border-accent focus:ring-accent/20 focus:bg-background w-full rounded-lg border bg-transparent py-2 pr-3 pl-9 text-sm placeholder:text-xs focus:ring-2 focus:outline-none"
                  />
                </div>
              </div>

              {/* Departure Date */}
              <div className="flight-input-group">
                <label className="flight-input-label">{t('departure_label') || 'Departure'}</label>
                <Calendar
                  selected={departureDate}
                  onChange={(date: Date | null) => {
                    setDepartureDate(date);
                  }}
                  placeholderText={t('select_date_placeholder') || 'Select date'}
                  dateFormat="MMM d, yyyy"
                  minDate={new Date()}
                  inputClassName="flight-input"
                />
              </div>

              {/* Return Date */}
              {tripType === 'round-trip' && (
                <div className="flight-input-group">
                  <label className="flight-input-label">{t('return_label') || 'Return'}</label>
                  <Calendar
                    selected={returnDate}
                    onChange={(date: Date | null) => {
                      setReturnDate(date);
                    }}
                    placeholderText={t('select_date_placeholder') || 'Select date'}
                    dateFormat="MMM d, yyyy"
                    minDate={departureDate || new Date()}
                    inputClassName="flight-input"
                  />
                </div>
              )}

              {/* Passengers */}
              <div className="flight-input-group relative">
                <label className="flight-input-label">
                  {t('passengers_label') || 'Passengers'}
                </label>
                <div className="relative w-full">
                  <div className="text-foreground-muted absolute top-1/2 left-3 z-10 -translate-y-1/2">
                    <Users size={16} />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
                    className="flight-input border-border text-foreground focus:border-accent focus:ring-accent/20 focus:bg-background w-full rounded-lg border bg-transparent py-2 pr-8 pl-9 text-left text-sm focus:ring-2 focus:outline-none"
                  >
                    {passengerOptions.find((opt) => opt.value === passengers)?.label ||
                      t('1adult') ||
                      '1 Adult'}
                  </button>
                  <div className="text-foreground-muted pointer-events-none absolute top-1/2 right-3 z-10 -translate-y-1/2">
                    <ChevronDown size={16} />
                  </div>
                  {showPassengerDropdown && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowPassengerDropdown(false)}
                      />
                      <div className="border-border bg-background absolute top-full right-0 left-0 z-20 mt-1 min-w-[140px] rounded-lg border shadow-lg">
                        {passengerOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setPassengers(option.value);
                              setShowPassengerDropdown(false);
                            }}
                            className={`hover:bg-background-muted flex w-full items-center justify-between px-4 py-2 text-left text-sm transition-colors ${
                              passengers === option.value
                                ? 'bg-background-muted text-foreground'
                                : 'text-foreground'
                            }`}
                          >
                            <span>{option.label}</span>
                            {passengers === option.value && (
                              <Check size={16} className="text-foreground ml-2 shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="flight-search-btn bg-accent text-background hover:bg-accent-dark focus:ring-accent flex items-center gap-2 rounded-lg text-sm font-semibold shadow-md transition-all hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                <Plane size={16} />
                <span>{t('search_button_text') || 'Search'}</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

// Default variant - uses Simple
export const Default = Simple;
