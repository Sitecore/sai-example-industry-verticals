import { RichText, Text, NextImage as Image } from '@sitecore-content-sdk/nextjs';
import { DestinationFields } from '@/types/destination';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shadcn/components/ui/tabs';
import { Bed, Camera, Navigation } from 'lucide-react';
import { useI18n } from 'next-localization';

export const DestinationLinkedContent = ({ destination }: { destination: DestinationFields }) => {
  const { t } = useI18n();
  return (
    <Tabs defaultValue="activities">
      <TabsList className="w-full">
        <TabsTrigger value="activities">{t('activities_label') || 'Activities'}</TabsTrigger>
        <TabsTrigger value="weather">{t('weather_label') || 'Weather'}</TabsTrigger>
        <TabsTrigger value="travel-tips">{t('travel_tips_label') || 'Travel Tips'}</TabsTrigger>
        <TabsTrigger value="hotels">{t('hotels_label') || 'Hotels'}</TabsTrigger>
      </TabsList>
      <TabsContent value="activities" className="grid gap-4">
        {destination.Activities?.map((a) => (
          <div className="info-card" key={a.id}>
            <h5 className="info-card-title">
              <Camera />
              <Text field={a.fields.Title} />
            </h5>
            <div className="rich-text ck-content">
              <RichText field={a.fields.Description} />
            </div>
          </div>
        ))}
      </TabsContent>
      <TabsContent value="weather" className="grid gap-4 lg:grid-cols-2">
        {destination.Weather?.map((w) => (
          <div className="info-card" key={w.id}>
            <div className="flex items-center gap-4">
              <Image field={w.fields.Image} width={24} height={24} />
              <div>
                <h5 className="info-card-title mb-0!">
                  <Text field={w.fields.Title} />
                </h5>
                <p>
                  <Text field={w.fields.Duration} />
                </p>
              </div>
            </div>

            <p className="grid grid-cols-2">
              <span>{t('temperature_label') || 'Temperature:'}</span>
              <span className="text-foreground justify-self-end font-semibold">
                <Text field={w.fields.Temperature} />
              </span>
            </p>
            <p>
              <Text field={w.fields.Description} />
            </p>
          </div>
        ))}
      </TabsContent>
      <TabsContent value="travel-tips" className="grid gap-4">
        {destination.TravelTips?.map((t) => (
          <div className="info-card" key={t.id}>
            <h5 className="info-card-title">
              <Navigation />
              <Text field={t.fields.Title} />
            </h5>
            <div className="rich-text ck-content">
              <RichText field={t.fields.Description} />
            </div>
          </div>
        ))}
      </TabsContent>
      <TabsContent value="hotels" className="grid gap-4">
        {destination.Hotels?.map((h) => (
          <div className="info-card" key={h.id}>
            <div className="flex flex-wrap justify-between">
              <h5 className="info-card-title mb-0!">
                <Bed />
                <Text field={h.fields.Title} />
              </h5>
              <p className="self-start rounded-md border px-2 py-1 text-xs font-bold">
                <Text field={h.fields.PriceRange} />
              </p>
            </div>
            <p>
              <Text field={h.fields.Description} />
            </p>
            <div>
              <h6 className="mb-2 text-sm">{t('popular_options_label') || 'Popular options:'}</h6>
              <div className="rich-text ck-content">
                <RichText field={h.fields.PopularOptions} />
              </div>
            </div>
          </div>
        ))}
      </TabsContent>
    </Tabs>
  );
};
