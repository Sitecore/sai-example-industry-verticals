import { useScreenWidth } from '@/hooks/useScreenWidth';
import {
  ChartTooltip,
  ChartTooltipContent,
  ChartContainer,
  type ChartConfig,
} from '@/shadcn/components/ui/chart';
import { CartesianGrid, Line, Area, LineChart, AreaChart, XAxis, YAxis } from 'recharts';

const chartConfig = {
  desktop: { label: 'Desktop', color: 'var(--chart-1)' },
  mobile: { label: 'Mobile', color: 'var(--chart-2)' },
} satisfies ChartConfig;

type chartDataType = { day: string; forecast1: number; forecast2: number }[];

type LineCurveType =
  | 'linear'
  | 'monotone'
  | 'basis'
  | 'bump'
  | 'natural'
  | 'step';

type ChartProps = {
  unit: string;
  var_one: string;
  var_two: string;
  t: (key: string) => string;
  chartData: chartDataType;
  type?: 'line' | 'area';
  colors?: { forecast1?: string; forecast2?: string };
  lineType?: LineCurveType | null;
};

export const Chart = (props: ChartProps) => {
  const sharedLineProps = { strokeWidth: 2, dot: false };
  const sharedAreaProps = { strokeWidth: 2, dot: false };
  const width = useScreenWidth();

  const fontSize = width < 480 ? 10 : width < 768 ? 12 : width < 1024 ? 14 : 16;

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
              tick={{ fill: 'black', fontSize }}
            />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: 'black', fontSize }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="forecast1"
              type={props.lineType || 'monotone'}
              stroke={props.colors?.forecast1 || 'var(--color-accent)'}
              fill={props.colors?.forecast1 || 'var(--color-accent)'}
              {...sharedAreaProps}
            />
            <Area
              dataKey="forecast2"
              type={props.lineType || 'monotone'}
              stroke={props.colors?.forecast2 || 'var(--color-accent-dark)'}
              fill={props.colors?.forecast2 || 'var(--color-accent-dark)'}
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
              tick={{ fill: 'black', fontSize }}
            />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: 'black', fontSize }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="forecast1"
              type={props.lineType || 'linear'}
              stroke={props.colors?.forecast1 || 'var(--color-accent)'}
              {...sharedLineProps}
            />
            <Line
              dataKey="forecast2"
              type={props.lineType || 'linear'}
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
      <div className="mb-2 flex flex-col items-end justify-end gap-2 text-sm md:flex-row md:gap-6">
        <div className="flex items-center gap-2">
          <span className="bg-accent h-1 w-4 rounded" />
          <span>{props.t(props.var_one) || props.var_one}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-accent-dark h-1 w-4 rounded" />
          <span>{props.t(props.var_two) || props.var_two}</span>
        </div>
      </div>

      <div className="flex gap-4 py-5">
        <div className="hidden items-center justify-center md:visible md:flex">
          <h6 className="-rotate-90">{props.unit}</h6>
        </div>
        <div className="flex-1">
          <ChartContainer config={chartConfig}>{renderChart()}</ChartContainer>
        </div>
      </div>
    </div>
  );
};
