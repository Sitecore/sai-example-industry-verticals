import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
  showOnlyFilled?: boolean;
  starSize?: number;
}

export const StarRating = ({
  rating,
  maxRating = 5,
  className = '',
  showOnlyFilled,
  starSize = 16,
}: StarRatingProps) => {
  // Clamp rating between 0 and maxRating
  const safeRating = Math.max(0, Math.min(rating, maxRating));
  const stars = [];

  if (showOnlyFilled) {
    for (let i = 1; i <= safeRating; i++) {
      stars.push(<Star key={i} size={starSize} fill="currentColor" stroke="currentColor" />);
    }
  } else {
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <Star
          key={i}
          size={starSize}
          fill="currentColor"
          stroke="currentColor"
          opacity={i <= safeRating ? 1 : 0.3}
        />
      );
    }
  }

  return <div className={`text-accent flex gap-1 ${className}`}>{stars}</div>;
};

export default StarRating;
