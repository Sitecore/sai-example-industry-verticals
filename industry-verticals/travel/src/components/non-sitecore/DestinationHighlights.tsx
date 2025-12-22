import { NextImage as Image, Text } from '@sitecore-content-sdk/nextjs';
import { DestinationFields } from '@/types/destination';
import { useI18n } from 'next-localization';

export const DestinationHighlights = ({
  highlights,
}: {
  highlights: DestinationFields['Highlights'];
}) => {
  const { t } = useI18n();

  return (
    <div>
      <h4 className="mb-4">{t('top_highlights_label') || 'Top Highlights'}</h4>
      <div className="grid gap-4 lg:grid-cols-2">
        {highlights.map((h) => (
          <div className="" key={h.id}>
            <div className="flex h-full flex-col overflow-hidden rounded-lg border shadow-sm">
              <div className="bg-background-accent relative h-48">
                <Image field={h.fields.Image} className="h-full w-full object-cover" />
                <span className="bg-accent absolute top-3 left-3 z-2 rounded-sm px-2 py-1 text-xs font-semibold text-white">
                  <Text field={h.fields.Label} />
                </span>
              </div>
              <div className="space-y-2 p-6">
                <h6 className="text-base">
                  <Text field={h.fields.Title} />
                </h6>
                <p className="text-sm">
                  <Text field={h.fields.Description} />
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
