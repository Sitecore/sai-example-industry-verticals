import { Field, ImageField, RichTextField } from '@sitecore-content-sdk/nextjs';
import { SitecoreItem } from './common';

export interface DestinationFields {
  Title: Field<string>;
  Content: RichTextField;
  ShortDescription: Field<string>;
  Image: ImageField;
  Label: Field<string>;
  Country: Field<string>;
  Continent: Field<string>;
  Temperatures: Field<string>;
  TripDuration: Field<string>;
  TripPeriods: Field<string>;
  Rating: Field<number>;
  NumberOfReviews: Field<number>;
  Price: Field<string>;
  FlightTime: Field<string>;
  Airports: Field<string>;
  DirectFlights: Field<string>;
  Language: Field<string>;
  Currency: Field<string>;
  TimeZone: Field<string>;
  Visa: Field<string>;
  Activities: SitecoreItem<Activity>[];
  Highlights: SitecoreItem<Highlight>[];
  Hotels: SitecoreItem<Hotel>[];
  TravelTips: SitecoreItem<TravelTip>[];
  Weather: SitecoreItem<Weather>[];
}

export type Destination = SitecoreItem<DestinationFields>;

export interface Activity {
  Title: Field<string>;
  Description: RichTextField;
}

export interface Highlight {
  Title: Field<string>;
  Description: RichTextField;
  Label: Field<string>;
  Image: ImageField;
}

export interface Hotel {
  Title: Field<string>;
  Description: RichTextField;
  PriceRange: Field<string>;
  PopularOptions: RichTextField;
}

export interface TravelTip {
  Title: Field<string>;
  Description: RichTextField;
}

export interface Weather {
  Title: Field<string>;
  Duration: Field<string>;
  Temperature: Field<string>;
  Description: Field<string>;
  Image: ImageField;
}

export type DestinationSearchResult = {
  id: string;
  activities: string[];
  continent: string;
  country: string;
  description: string;
  highlights: string[];
  image_url: string;
  label: string;
  name: string;
  price: string;
  review_rating: number;
  srouce_id: string;
  temperatures: string;
  type: string;
  url: string;
  trip_duration: string;
  trip_periods: string;
};
