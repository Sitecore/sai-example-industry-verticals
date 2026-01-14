'use client';

import Link from 'next/link';
import { CalendarDays, Clock, MapPin, Star, Thermometer } from 'lucide-react';
import { useI18n } from 'next-localization';
import Image from 'next/image';
import { DestinationSearchResult } from '@/types/destination';

interface DestinationCardProps {
  destination: DestinationSearchResult;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  const { t } = useI18n();
  const {
    image_url: image,
    review_rating: rating,
    name: title,
    country,
    description,
    price,
    temperatures,
    continent,
    label,
    highlights,
    activities,
    url,
    trip_duration,
    trip_periods,
  } = destination;

  return (
    <div className="group overflow-hidden rounded-xl shadow-sm transition-shadow hover:shadow-xl">
      {/* Image */}
      <div className="relative">
        {image && (
          <Image
            src={image}
            width={300}
            height={256}
            alt={title || 'Destination'}
            className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}

        {/* Label Badge */}
        {label && (
          <div className="bg-accent text-background absolute top-4 left-4 rounded px-2 py-1 text-xs font-semibold">
            {label}
          </div>
        )}

        {/* Rating */}
        {rating > 0 && (
          <div className="bg-background/90 absolute top-4 right-4 flex items-center gap-1 rounded-md px-2 py-1">
            <Star className="inline size-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        )}

        {/* Title and Country */}
        <div className="text-background absolute bottom-4 left-4">
          <h4 className="text-background">{title}</h4>
          {country}
        </div>

        {/* Price */}
        <div className="bg-background text-foreground absolute right-4 bottom-4 rounded-md border px-2 py-0.5 font-bold">
          {price}
        </div>
      </div>

      <div className="space-y-5 p-6">
        {/* Short Description */}
        {description && <p className="line-clamp-2">{description}</p>}

        {/* Trip Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          {trip_periods && (
            <div className="flex items-center gap-2">
              <CalendarDays className="text-accent h-4 w-4" />
              {trip_periods}
            </div>
          )}

          {trip_duration && (
            <div className="flex items-center gap-2">
              <Clock className="text-accent h-4 w-4" />
              {trip_duration}
            </div>
          )}

          {temperatures && (
            <div className="flex items-center gap-2">
              <Thermometer className="text-accent h-4 w-4" />
              {temperatures}
            </div>
          )}

          {continent && (
            <div className="flex items-center gap-2">
              <MapPin className="text-accent h-4 w-4" />
              {continent}
            </div>
          )}
        </div>

        {/* Top Highlights */}
        {highlights && highlights.length > 0 && (
          <div className="">
            <p className="mb-2 font-semibold">{t('top_highlights_label') || 'Top Highlights'}</p>
            <div className="flex flex-wrap gap-2">
              {highlights.slice(0, 3).map((highlight, idx) => (
                <div
                  key={idx}
                  className="bg-foreground-muted/10 text-foreground rounded px-2 py-1 text-xs"
                >
                  {highlight}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activities */}
        {activities && activities.length > 0 && (
          <div className="">
            <p className="mb-2 font-semibold">{t('acitivities_label') || 'Activities'}</p>
            <div className="flex flex-wrap gap-2">
              {activities.slice(0, 3).map((activity, idx) => (
                <div
                  key={idx}
                  className="bg-foreground-muted/10 text-foreground rounded px-2 py-1 text-xs"
                >
                  {activity}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2 text-sm 2xl:text-base">
          <button className="bg-foreground text-background hover:bg-foreground/90 flex-1 rounded-md py-2 font-semibold transition-colors">
            {t('book_flight') || 'Book Flight'}
          </button>

          <Link
            href={url}
            className="hover:bg-accent-light/20 flex-1 rounded-md border py-2 text-center font-semibold transition-colors"
          >
            {t('learn_more') || 'Learn More'}
          </Link>
        </div>
      </div>
    </div>
  );
}
