import { Text } from '@sitecore-content-sdk/nextjs';
import { DestinationFields } from '@/types/destination';
import { Phone, Plane } from 'lucide-react';
import { useI18n } from 'next-localization';

export const DestinationSidebar = ({ destination }: { destination: DestinationFields }) => {
  const { t } = useI18n();

  return (
    <div className="relative space-y-8">
      <div className="info-card bg-background-muted! lg:sticky lg:top-6">
        <h5 className="info-card-title">
          <Plane />
          {t('book_your_flight_label') || 'Book Your Flight'}
        </h5>
        <p className="flex flex-col items-center gap-2">
          <span className="text-accent text-3xl font-bold">
            <Text field={destination.Price} />
          </span>
          <span>{t('round_trip_per_person_label') || 'round trip per person'}</span>
        </p>
        <hr />
        <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
          <p>{t('flight_time_label') || 'Flight time:'}</p>
          <span className="text-foreground justify-self-end font-semibold">
            <Text field={destination.FlightTime} />
          </span>
          <p>{t('airports_label') || 'Airports:'}</p>
          <span className="text-foreground justify-self-end font-semibold">
            <Text field={destination.Airports} />
          </span>
        </div>
        <button className="btn-primary">{t('search_flights_label') || 'Search Flights'}</button>
        <p className="text-foreground-muted text-center text-xs">
          <Text field={destination.DirectFlights} />
        </p>
      </div>

      <div className="info-card">
        <h5 className="info-card-title">{t('quick_facts_label') || 'Quick Facts'}</h5>
        <div className="grid grid-cols-[auto_1fr] gap-2">
          <p>{t('language_label') || 'Language:'}</p>
          <span className="text-foreground justify-self-end font-semibold">
            <Text field={destination.Language} />
          </span>
          <p>{t('currency_label') || 'Currency:'}</p>
          <span className="text-foreground justify-self-end font-semibold">
            <Text field={destination.Currency} />
          </span>
          <p>{t('time_zone_label') || 'Time Zone:'}</p>
          <span className="text-foreground justify-self-end font-semibold">
            <Text field={destination.TimeZone} />
          </span>
          <p>{t('visa_label') || 'Visa:'}</p>
          <span className="text-foreground justify-self-end font-semibold">
            <Text field={destination.Visa} />
          </span>
        </div>
      </div>

      <div className="info-card">
        <h5 className="info-card-title">
          <Phone />
          {t('need_help_label') || 'Need Help?'}
        </h5>
        <p>
          {t('need_help_description') ||
            'Our travel experts are here to help you plan the perfect trip.'}
        </p>
        <button className="btn-outline">{t('contact_support_label') || 'Contact Support'}</button>
      </div>
    </div>
  );
};
