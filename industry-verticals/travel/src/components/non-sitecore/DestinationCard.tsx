'use client';

import { NextImage as ContentSdkImage, Text as ContentSdkText } from '@sitecore-content-sdk/nextjs';
import Link from 'next/link';
import { Destination } from '@/types/destination';
import { CalendarDays, Clock, MapPin, Star, Thermometer } from 'lucide-react';
import { useI18n } from 'next-localization';

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  const { t } = useI18n();
  const fields = destination.fields;
  const image = fields.Image;
  const Label = fields.Label;
  const rating = fields.Rating;
  const title = fields.Title;
  const country = fields.Country;
  const description = fields.ShortDescription;
  const price = fields.Price;
  const tripPeriod = fields.TripPeriods;
  const tripDuration = fields.TripDuration;
  const temparatures = fields.Temperatures;
  const continent = fields.Continent;

  return (
    <div className="group overflow-hidden rounded-xl shadow-sm transition-shadow hover:shadow-xl">
      {/* Image */}
      <div className="relative">
        {image.value?.src && (
          <ContentSdkImage
            field={image}
            alt={fields.Title?.value || 'Destination'}
            className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}

        {/* Label Badge */}
        {fields.Label?.value && (
          <div className="bg-accent text-background absolute top-4 left-4 rounded-md px-3 py-1 text-xs font-semibold">
            <ContentSdkText field={Label} />
          </div>
        )}

        {/* Rating */}
        {rating.value > 0 && (
          <div className="bg-background/90 absolute top-4 right-4 flex items-center gap-1 rounded-full px-2 py-1">
            <Star className="inline size-4 fill-yellow-400 text-yellow-400" />
            <ContentSdkText field={rating} />
          </div>
        )}

        {/* Title and Country */}
        <div className="text-background absolute bottom-4 left-4">
          <h4 className="text-background">
            <ContentSdkText field={title} />
          </h4>
          <ContentSdkText field={country} />
        </div>

        {/* Price */}
        <div className="bg-background text-foreground absolute right-4 bottom-4 rounded-md border px-2 py-0.5 font-bold">
          <ContentSdkText field={price} />
        </div>
      </div>

      <div className="space-y-5 p-6">
        {/* Short Description */}
        {fields.ShortDescription?.value && (
          <p className="line-clamp-2">
            <ContentSdkText field={description} />
          </p>
        )}

        {/* Trip Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          {tripPeriod?.value && (
            <div className="flex items-center gap-2">
              <CalendarDays className="text-accent h-4 w-4" />
              <ContentSdkText field={tripPeriod} />
            </div>
          )}

          {tripDuration?.value && (
            <div className="flex items-center gap-2">
              <Clock className="text-accent h-4 w-4" />
              <ContentSdkText field={tripDuration} />
            </div>
          )}

          {temparatures?.value && (
            <div className="flex items-center gap-2">
              <Thermometer className="text-accent h-4 w-4" />
              <ContentSdkText field={temparatures} />
            </div>
          )}

          {continent?.value && (
            <div className="flex items-center gap-2">
              <MapPin className="text-accent h-4 w-4" />
              <ContentSdkText field={continent} />
            </div>
          )}
        </div>

        {/* Top Highlights */}
        {fields.Highlights && fields.Highlights.length > 0 && (
          <div className="">
            <p className="mb-2 font-semibold">{t('top_highlights_label') || 'Top Highlights'}</p>
            <div className="flex flex-wrap gap-2">
              {fields.Highlights.slice(0, 3).map((highlight) => (
                <div
                  key={highlight.id}
                  className="bg-foreground-muted/10 text-foreground rounded px-2 py-1 text-xs"
                >
                  <ContentSdkText field={highlight.fields.Title} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activities */}
        {fields.Activities && fields.Activities.length > 0 && (
          <div className="">
            <p className="mb-2 font-semibold">{t('acitivities_label') || 'Activities'}</p>
            <div className="flex flex-wrap gap-2">
              {fields.Activities.slice(0, 3).map((activity) => (
                <div
                  key={activity.id}
                  className="bg-foreground-muted/10 text-foreground rounded px-2 py-1 text-xs"
                >
                  <ContentSdkText field={activity.fields.Title} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2 text-sm 2xl:text-base">
          <button className="bg-foreground text-background hover:bg-foreground/90 flex-2 rounded-md py-2 font-semibold transition-colors xl:flex-3">
            {t('book_flight') || 'Book Flight'}
          </button>

          <Link
            href={destination.url}
            className="hover:bg-accent-light/20 flex-1 rounded-md border py-2 text-center font-semibold transition-colors"
          >
            {t('learn_more') || 'Learn More'}
          </Link>
        </div>
      </div>
    </div>
  );
}
