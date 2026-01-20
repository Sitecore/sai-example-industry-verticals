import React, { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';
import { useI18n } from 'next-localization';
import { Activity, Thermometer, TrendingDown, TrendingUp, Unplug, Zap } from 'lucide-react';
import { Progress } from '@/shadcn/components/ui/progress';
import { GRID_CONDITIONS_DATA } from './gridData';
import { isParamEnabled } from '@/helpers/isParamEnabled';

export type GridConditionsProps = ComponentProps;

export const Default = (props: GridConditionsProps): JSX.Element => {
  const {
    styles,
    RenderingIdentifier: id,
    HideGridSection,
    HideTemperatureSection,
    HideOutagesSection,
  } = props.params;

  const hideGridSection = isParamEnabled(HideGridSection);
  const hideTemperatureSection = isParamEnabled(HideTemperatureSection);
  const hideOutagesSection = isParamEnabled(HideOutagesSection);

  const nothingToShowWarning = hideGridSection && hideTemperatureSection && hideOutagesSection && (
    <h5>Please select at least one section to show.</h5>
  );

  return (
    <section className={`py-20 in-[.section-wrapper]:py-0 ${styles}`} id={id}>
      <div className="container">
        <div className="grid gap-6">
          {!hideGridSection && <SectionGrid />}
          {!hideTemperatureSection && <SectionTemperature />}
          {!hideOutagesSection && <SectionOutages />}
          {nothingToShowWarning}
        </div>
      </div>
    </section>
  );
};

const SectionGrid = () => {
  const { t } = useI18n();

  const operatingCapacity =
    (GRID_CONDITIONS_DATA.grid.load.value / GRID_CONDITIONS_DATA.grid.capacity.value) * 100;

  return (
    <>
      <div className="grid grid-cols-4 gap-6">
        <div className="info-card">
          <h6 className="flex items-center justify-between gap-4 text-sm font-semibold">
            {t('grid_current_load') || 'Current Load'}
            <TrendingUp className="text-danger size-4" />
          </h6>
          <p className="text-foreground">
            <span className="text-2xl font-bold">
              {GRID_CONDITIONS_DATA.grid.load.value.toLocaleString()}
            </span>{' '}
            <span>MW</span>
          </p>
          <span
            className="grid-load-status"
            data-status={GRID_CONDITIONS_DATA.grid.load.status.value}
          >
            {t(GRID_CONDITIONS_DATA.grid.load.status.tLabel) ||
              GRID_CONDITIONS_DATA.grid.load.status.value}
          </span>
        </div>

        <div className="info-card">
          <h6 className="flex items-center justify-between gap-4 text-sm font-semibold">
            {t('grid_avaliable_capacity') || 'Available Capacity'}
            <Activity className="text-accent-dark size-4" />
          </h6>
          <p className="text-foreground">
            <span className="text-2xl font-bold">
              {GRID_CONDITIONS_DATA.grid.capacity.value.toLocaleString()}
            </span>{' '}
            <span>MW</span>
          </p>
          <span
            className="grid-load-status"
            data-status={GRID_CONDITIONS_DATA.grid.capacity.status.value}
          >
            {t(GRID_CONDITIONS_DATA.grid.capacity.status.tLabel) ||
              GRID_CONDITIONS_DATA.grid.capacity.status.value}
          </span>
        </div>

        <div className="info-card">
          <h6 className="flex items-center justify-between gap-4 text-sm font-semibold">
            {t('grid_reserve_margin') || 'Reserve Margin'}
            <TrendingDown className="text-success size-4" />
          </h6>
          <p className="text-foreground">
            <span className="text-2xl font-bold">
              {GRID_CONDITIONS_DATA.grid.margin.value.toLocaleString()}
            </span>{' '}
            <span>%</span>
          </p>
          <span
            className="grid-load-status"
            data-status={GRID_CONDITIONS_DATA.grid.margin.status.value}
          >
            {t(GRID_CONDITIONS_DATA.grid.margin.status.tLabel) ||
              GRID_CONDITIONS_DATA.grid.margin.status.value}
          </span>
        </div>

        <div className="info-card">
          <h6 className="flex items-center justify-between gap-4 text-sm font-semibold">
            {t('grid_frequency') || 'Frequency'}
            <Activity className="text-accent-dark size-4" />
          </h6>
          <p className="text-foreground">
            <span className="text-2xl font-bold">
              {GRID_CONDITIONS_DATA.grid.frequency.value.toLocaleString()}
            </span>{' '}
            <span>Hz</span>
          </p>
          <span
            className="grid-load-status"
            data-status={GRID_CONDITIONS_DATA.grid.frequency.status.value}
          >
            {t(GRID_CONDITIONS_DATA.grid.frequency.status.tLabel) ||
              GRID_CONDITIONS_DATA.grid.frequency.status.value}
          </span>
        </div>
      </div>

      <div className="info-card">
        <h6 className="info-card-title">
          <Zap />
          {t('grid_current_grid_load') || 'Current Grid Load'}
        </h6>
        <div className="flex justify-between">
          <span>
            {t('grid_load_label') || 'Load'}:{' '}
            {GRID_CONDITIONS_DATA.grid.load.value.toLocaleString()} MW
          </span>
          <span>
            {t('grid_capacity_label') || 'Capacity'}:{' '}
            {GRID_CONDITIONS_DATA.grid.capacity.value.toLocaleString()} MW
          </span>
        </div>
        <Progress value={operatingCapacity} aria-label="Grid Load Chart" />
        <span>
          {t('grid_operating_at') || 'Operating at'} {operatingCapacity.toFixed(1)}%{' '}
          {(t('grid_capacity_label') || 'Capacity').toLowerCase()}.{' '}
          {t('grid_reserve_margin') || 'Reserve margin'}: {GRID_CONDITIONS_DATA.grid.margin.value}%
        </span>
      </div>
    </>
  );
};

const SectionTemperature = () => {
  const { t } = useI18n();

  return (
    <div className="info-card">
      <h6 className="info-card-title">
        <Thermometer />
        {t('grid_temperature_impact') || 'Temperature Impact'}
      </h6>
      <div className="grid grid-cols-3">
        <div className="text-center">
          <p className="text-danger text-3xl font-bold">
            {GRID_CONDITIONS_DATA.temperature.current}
            {GRID_CONDITIONS_DATA.temperature.unit}
          </p>
          <span>{t('grid_current_temperature') || 'Current Temperature'}</span>
        </div>
        <div className="text-center">
          <p className="text-warning text-3xl font-bold">
            {GRID_CONDITIONS_DATA.temperature.forecast}
            {GRID_CONDITIONS_DATA.temperature.unit}
          </p>
          <span>{t('grid_forecast_high') || 'Forecast High'}</span>
        </div>
        <div className="text-center">
          <p className="text-accent-dark text-3xl font-bold">
            {GRID_CONDITIONS_DATA.temperature.loadIncrease}
          </p>
          <span>{t('grid_load_increase') || 'Load Increase'}</span>
        </div>
      </div>
    </div>
  );
};

const SectionOutages = () => {
  const { t } = useI18n();

  return (
    <div className="info-card">
      <h6 className="info-card-title">
        <Unplug />
        {t('grid_current_outages') || 'Current Outages'}
      </h6>
      {GRID_CONDITIONS_DATA.outages.map((outage, index) => (
        <div key={index} className="flex justify-between rounded-md border px-4 py-3">
          <span className="font-semibold">{outage.area}</span>
          <span className="grid-outage-status" data-status={outage.status.value}>
            {t(outage.status.tLabel) || outage.status.value}
          </span>
        </div>
      ))}
    </div>
  );
};
