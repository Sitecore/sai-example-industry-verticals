export const newsDateFormatter = (date: Date | null): string | undefined =>
  date?.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });