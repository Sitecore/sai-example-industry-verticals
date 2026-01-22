import {
  ChartTooltip,
  ChartTooltipContent,
  ChartContainer,
  type ChartConfig,
} from '@/shadcn/components/ui/chart';
import { CartesianGrid, Line, Area, LineChart, AreaChart, XAxis, YAxis, AreaProps, LineProps } from 'recharts';

const chartConfig = {
  desktop: { label: 'Desktop', color: 'var(--chart-1)' },
  mobile: { label: 'Mobile', color: 'var(--chart-2)' },
} satisfies ChartConfig;

type chartDataType = { day: string; forecast1: number; forecast2: number }[];

type ChartProps = {
  unit: string;
  var_one: string;
  var_two: string;
  t: (key: string) => string;
  chartData: chartDataType;
  type?: 'line' | 'area';
  colors?: { forecast1?: string; forecast2?: string };
};

export const Chart = (props: ChartProps) => {
  const sharedLineProps = { strokeWidth: 2, dot: false };
  const sharedAreaProps = { strokeWidth: 2, dot: false };

  const renderChart = () => {
    switch (props.type) {
      case 'area':
        return (
          <AreaChart data={props.chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={60}
              tickFormatter={(v) => `${Math.floor(v / 1000)}K`}
            />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: 'black', fontSize: 16 }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="forecast1"
              type="monotone"
              stroke={props.colors?.forecast1 || 'var(--color-accent)'}
              fill={(props.colors?.forecast1 || 'var(--color-accent)')}
              {...sharedAreaProps}
            />
            <Area
              dataKey="forecast2"
              type="monotone"
              stroke={props.colors?.forecast2 || 'var(--color-accent-dark)'}
              fill={(props.colors?.forecast2 || 'var(--color-accent-dark)')}
              {...sharedAreaProps}
            />
          </AreaChart>
        );

      case 'line':
      default:
        return (
          <LineChart data={props.chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={60}
              tickFormatter={(v) => `${Math.floor(v / 1000)}K`}
              tick={{ fill: 'black', fontSize: 16 }}
            />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: 'black', fontSize: 16 }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="forecast1"
              type="linear"
              stroke={props.colors?.forecast1 || 'var(--color-accent)'}
              {...sharedLineProps}
            />
            <Line
              dataKey="forecast2"
              type="linear"
              stroke={props.colors?.forecast2 || 'var(--color-accent-dark)'}
              {...sharedLineProps}
            />
          </LineChart>
        );
    }
  };

  return (
    <div className="w-full">
      {/* Variables Section */}
      <div className="flex items-center justify-end gap-6 text-sm mb-2">
        <div className="flex items-center gap-2">
          <span className="h-1 w-4 rounded bg-accent" />
          <span>{props.t(props.var_one) || props.var_one}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1 w-4 rounded bg-accent-dark" />
          <span>{props.t(props.var_two) || props.var_two}</span>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_20fr] gap-4 py-5">
        <div className="flex items-center justify-center">
          <h6 className="-rotate-90">{props.unit}</h6>
        </div>
        <ChartContainer config={chartConfig}>{renderChart()}</ChartContainer>
      </div>
    </div>
  );
};