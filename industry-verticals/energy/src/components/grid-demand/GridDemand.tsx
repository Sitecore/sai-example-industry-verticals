import React from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import {
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  ComponentRendering,
  ComponentParams,
  RichTextField,
  TextField,
} from '@sitecore-content-sdk/nextjs';
import {
  ChartTooltip,
  ChartTooltipContent,
  ChartContainer,
  type ChartConfig,
} from '@/shadcn/components/ui/chart';
import { useI18n } from 'next-localization';
import { generateChartData } from '@/helpers/chartDataHelper';

type chartDataType = { day: string; forecast1: number; forecast2: number }[];

const chartConfig = {
  desktop: { label: 'Desktop', color: 'var(--chart-1)' },
  mobile: { label: 'Mobile', color: 'var(--chart-2)' },
} satisfies ChartConfig;

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
          <Chart t={t} unit={unit} var_one={var_one} var_two={var_two} chartData={chartData} />
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
          <Chart t={t} unit={unit} var_one={var_one} var_two={var_two} chartData={chartData} />
        </div>
      </div>
    </div>
  );
};

type ChartProps = {
  unit: string;
  var_one: string;
  var_two: string;
  t: (key: string) => string;
  chartData: chartDataType;
  type?: 'line' | 'area';
  colors?: { forecast1?: string; forecast2?: string };
};

const Chart = (props: ChartProps) => {
  return (
    <div className="w-full">
      {/* Variables Section */}
      <div className="flex items-center justify-end gap-6 text-sm">
        {/* Variable One */}
        <div className="flex items-center gap-2">
          <span className="h-1 w-4 rounded bg-blue-500" />
          <span>{props.t(props.var_one) || props.var_one}</span>
        </div>
        {/* Variable Two */}
        <div className="flex items-center gap-2">
          <span className="h-1 w-4 rounded bg-green-500" />
          <span>{props.t(props.var_two) || props.var_two}</span>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-[1fr_20fr] gap-4 py-5">
        <div className="flex items-center justify-center">
          <h6 className="-rotate-90">{props.t(`${props.unit}`) || `${props.unit}`}</h6>
        </div>
        <ChartContainer config={chartConfig} color='red'>
          <LineChart
            accessibilityLayer
            data={props.chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={60}
              tickFormatter={(value) => `${Math.floor(value / 1000)}K`}
              tick={{ fill: 'black', fontSize: 16 }}
            />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
              tick={{ fill: 'black', fontSize: 16 }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="forecast1"
              type="linear"
              stroke="var(--color-accent)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="forecast2"
              type="linear"
              stroke="var(--color-accent-dark)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
};
