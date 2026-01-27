// chart data generator
type generateChartDataType = {
  var_one: string;
  var_two: string;
};

export const generateChartData = (props: generateChartDataType) => {
  const min1 = Math.floor(Math.random() * (125000 - 20000 + 1));
  const max1 = Math.floor(Math.random() * (150000 - 50000 + 1));

  const min2 = Math.floor(Math.random() * (125000 - 20000 + 1));
  const max2 = Math.floor(Math.random() * (150000 - 50000 + 1));

  return Array.from({ length: 25 }, (_, i) => ({
    day: String(i),
    [props.var_one]: Math.floor(Math.random() * (max1 - min1 + 1)) + min1,
    [props.var_two]: Math.floor(Math.random() * (max2 - min2 + 1)) + min2,
  }));
};

// chart line styles
export type LineCurveType = 'linear' | 'monotone' | 'basis' | 'bump' | 'natural' | 'step';

const allowedStyles: readonly LineCurveType[] = [
  'linear',
  'monotone',
  'basis',
  'bump',
  'natural',
  'step',
];

export const formatNumber = (num: number) => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M';
  } else if (num >= 1_000) {
    return Math.floor(num / 1_000) + 'K';
  } else {
    return num.toString();
  }
};

export function filterStyle(value?: string): LineCurveType | null {
  if (!value) return null;

  return allowedStyles.includes(value as LineCurveType) ? (value as LineCurveType) : null;
}
