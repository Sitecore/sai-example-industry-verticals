// chart data generator
export const generateChartData = () => {
  const min1 = Math.floor(Math.random() * (125000 - 20000 + 1)) + 20000;
  const max1 = Math.floor(Math.random() * (150000 - 50000 + 1)) + 50000;

  const min2 = Math.floor(Math.random() * (125000 - 20000 + 1)) + 20000;
  const max2 = Math.floor(Math.random() * (150000 - 50000 + 1)) + 50000;

  return Array.from({ length: 25 }, (_, i) => ({
    day: String(i),
    forecast1: Math.floor(Math.random() * (max1 - min1 + 1)) + min1,
    forecast2: Math.floor(Math.random() * (max2 - min2 + 1)) + min2,
  }));
};

// chart line styles
export type LineCurveType =
  | 'linear'
  | 'monotone'
  | 'basis'
  | 'bump'
  | 'natural'
  | 'step';

const allowedStyles: readonly LineCurveType[] = [
  'linear',
  'monotone',
  'basis',
  'bump',
  'natural',
  'step',
];

export function filterStyle(
  value?: string
): LineCurveType | null {
  if (!value) return null;

  return allowedStyles.includes(value as LineCurveType)
    ? (value as LineCurveType)
    : null;
}