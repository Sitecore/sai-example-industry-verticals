import { useScreenWidth } from '@/hooks/useScreenWidth';
import {
  ChartTooltip,
  ChartTooltipContent,
  ChartContainer,
  type ChartConfig,
} from '@/shadcn/components/ui/chart';
import {
  ResponsiveContainer,
  CartesianGrid,
  Line,
  Area,
  LineChart,
  AreaChart,
  XAxis,
  YAxis,
} from 'recharts';

const chartConfig = {
  desktop: { label: 'Desktop', color: 'var(--chart-1)' },
  mobile: { label: 'Mobile', color: 'var(--chart-2)' },
} satisfies ChartConfig;

type chartDataType = { day: string; [key: string]: string | number }[];

type LineCurveType = 'linear' | 'monotone' | 'basis' | 'bump' | 'natural' | 'step';

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
              dataKey={props.var_one}
              type={props.lineType || 'monotone'}
              stroke={props.colors?.forecast1 || 'var(--color-accent)'}
              fill={props.colors?.forecast1 || 'var(--color-accent)'}
              {...sharedAreaProps}
            />
            <Area
              dataKey={props.var_two}
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
              dataKey={props.var_one}
              type={props.lineType || 'linear'}
              stroke={props.colors?.forecast1 || 'var(--color-accent)'}
              {...sharedLineProps}
            />
            <Line
              dataKey={props.var_two}
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

      <div className="flex w-full gap-4 py-5 md:h-100">
        <div className="hidden items-center justify-center lg:visible lg:flex">
          <h6 className="-rotate-90">{props.unit}</h6>
        </div>
        <div className="w-full flex-1">
          <ResponsiveContainer className="flex w-full md:h-100">
            <ChartContainer className="w-full" config={chartConfig}>
              {renderChart()}
            </ChartContainer>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
