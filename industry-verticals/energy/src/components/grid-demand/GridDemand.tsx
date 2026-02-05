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
import { GRID_SUPPLY_DEMAND_CHART_DATA, GRID_SYSTEMWIDE_DATA } from './gridChartData';
import { isParamEnabled } from '@/helpers/isParamEnabled';

interface Fields {
  Title: TextField;
  Description: RichTextField;
}

type GridDemandProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

type GridChartProps = GridDemandProps & {
  dataset?: typeof GRID_SUPPLY_DEMAND_CHART_DATA | typeof GRID_SYSTEMWIDE_DATA;
  chartType: 'line' | 'area';
  var_one: string;
  var_two: string;
  unit: string;
};

const GridChart = (props: GridChartProps) => {
  const { unit, var_one, var_two, dataset, chartType } = props;
  const { styles, id, UseDynamicallyGeneratedData } = props.params;
  const { t } = useI18n();

  const useDataGeneration = isParamEnabled(UseDynamicallyGeneratedData);
  const lineType = filterStyle(props.params.Styles);
  const chartData =
    dataset && dataset.length > 0 && !useDataGeneration
      ? dataset
      : generateChartData({
          var_one,
          var_two,
        });

  return (
    <div className={`container py-10 ${styles}`} id={id}>
      <div className="flex flex-col rounded-xl border p-10 shadow-sm">
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
            type={chartType}
            lineType={lineType}
          />
        </div>
      </div>
    </div>
  );
};

export const Default = (props: GridDemandProps) => {
  const { t } = useI18n();

  const unit = t('system_demand_unit') || 'MW';
  const var_one = t('system_demand_variable_one') || 'CurrentForecast';
  const var_two = t('system_demand_variable_two') || 'DayAheadForecast';

  return (
    <GridChart
      {...props}
      chartType="line"
      var_one={var_one}
      var_two={var_two}
      unit={unit}
      dataset={GRID_SUPPLY_DEMAND_CHART_DATA}
    />
  );
};

export const Area = (props: GridDemandProps) => {
  const { t } = useI18n();

  const unit = t('supply_demand_unit') || 'MW';
  const var_one = t('supply_demand_variable_one') || 'CommitedCapacity';
  const var_two = t('supply_demand_variable_two') || 'Demand';

  return (
    <GridChart
      {...props}
      chartType="area"
      var_one={var_one}
      var_two={var_two}
      unit={unit}
      dataset={GRID_SYSTEMWIDE_DATA}
    />
  );
};
