import { ComponentParams, ComponentRendering } from '@sitecore-content-sdk/nextjs';
import { useI18n } from 'next-localization';
import React from 'react';

type GridStatusGaugeProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
};

export const Default = (props: GridStatusGaugeProps) => {
  const { t } = useI18n();
  const { styles, id } = props.params;
  const bars = 10;

  return (
    <div className={`container py-10 ${styles}`} id={id}>
      <div className="flex flex-col items-center rounded-xl border p-10 shadow-sm">
        {/* Title */}
        <h2 className="text-foreground mb-6 text-center text-3xl font-bold">
          {t('grid_conditions_status_title') || 'Grid Conditions'}
        </h2>

        {/* Gauge */}
        <div className="relative h-36 w-72">
          {/* Bars */}
          <div className="absolute inset-0 flex items-end justify-center">
            {Array.from({ length: bars }).map((_, i) => {
              const rotation = -85 + (170 / (bars - 1)) * i;
              return (
                <div
                  key={i}
                  className="absolute bottom-0 origin-bottom"
                  style={{
                    transform: `rotate(${rotation}deg) translateY(-200%)`,
                  }}
                >
                  <div className="h-12 w-5 rounded-full bg-green-500" />
                </div>
              );
            })}
          </div>

          {/* Center Content */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 text-center">
            <p className="text-accent-dark text-xs font-bold tracking-wide uppercase">
              {t('grid_conditions_status_subtitle') || 'Operating Reserves'}
            </p>
            <p className="text-foreground text-2xl font-bold">
              {t('grid_conditions_status_amount') || '13,531 MW'}
            </p>
            <p className="text-foreground mt-1 text-xs font-bold uppercase">
              {t('grid_conditions_status_description') || 'Normal Conditions'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
