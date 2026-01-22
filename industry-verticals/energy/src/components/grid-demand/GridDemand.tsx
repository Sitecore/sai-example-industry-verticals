import React from 'react';
import {
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  ComponentRendering,
  ComponentParams,
  RichTextField,
  TextField,
} from '@sitecore-content-sdk/nextjs';

import { useI18n } from 'next-localization';
import { filterStyle, generateChartData } from '@/helpers/chartDataHelper';
import { Chart } from '../non-sitecore/Chart';

interface Fields {
  Title: TextField;
  Description: RichTextField;
}

type GridDemandProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: GridDemandProps) => {
  const { styles, id } = props.params;
  const { t } = useI18n();

  const unit = t('system_demand_unit') || 'MW';
  const var_one = t('system_demand_variable_one') || 'CurrentForecast';
  const var_two = t('system_demand_variable_two') || 'DayAheadForecast';
  const chartData = generateChartData();
  const lineType = filterStyle(props.params.Styles);

  return (
    <div className={`p-4 md:p-6 ${styles}`} id={id}>
      <div className="container flex flex-col rounded-xl border p-10 shadow-sm">
        {/* Title */}
        <h2 className="text-foreground mb-6 text-3xl font-bold">
          <ContentSdkText field={props.fields.Title} />
        </h2>

        {/* Description */}
        <ContentSdkRichText field={props.fields.Description} />

        {/* Chart */}
        <div className="mt-5">
          <Chart
            t={t}
            unit={unit}
            var_one={var_one}
            var_two={var_two}
            chartData={chartData}
            type="line"
            lineType={lineType}
          />
        </div>
      </div>
    </div>
  );
};

export const Area = (props: GridDemandProps) => {
  const { styles, id } = props.params;
  const { t } = useI18n();

  const unit = t('supply_demand_unit') || 'MW';
  const var_one = t('supply_demand_variable_one') || 'CommitedCapacity';
  const var_two = t('supply_demand_variable_two') || 'Demand';
  const lineType = filterStyle(props.params.Styles);
  const chartData = generateChartData();

  return (
    <div className={`p-4 md:p-6 ${styles}`} id={id}>
      <div className="container flex flex-col rounded-xl border p-10 shadow-sm">
        {/* Title */}
        <h2 className="text-foreground mb-6 text-3xl font-bold">
          <ContentSdkText field={props.fields.Title} />
        </h2>

        {/* Description */}
        <ContentSdkRichText field={props.fields.Description} />

        {/* Chart */}
        <div className="mt-5">
          <Chart
            t={t}
            unit={unit}
            var_one={var_one}
            var_two={var_two}
            chartData={chartData}
            type="area"
            lineType={lineType}
          />
        </div>
      </div>
    </div>
  );
};
