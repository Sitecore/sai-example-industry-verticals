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
  const fullStars = Math.floor(safeRating);
  const hasPartial = safeRating % 1 !== 0;
  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    const isFull = i <= fullStars;
    const isPartial = i === fullStars + 1 && hasPartial;

    // Skip only *completely empty* stars when showOnlyFilled is true
    if (showOnlyFilled && !isFull && !isPartial) continue;

    const starFill = 'currentColor';

    if (isPartial) {
      const fillPercentage = (safeRating - fullStars) * 100;
      stars.push(
        <div key={i} className="relative" style={{ width: starSize, height: starSize }}>
          <Star
            size={starSize}
            className="absolute top-0 left-0"
            stroke="currentColor"
            opacity={0.3}
          />

          <div
            className="absolute top-0 left-0 overflow-hidden"
            style={{ width: `${fillPercentage}%` }}
          >
            <Star size={starSize} fill={starFill} stroke={starFill} />
          </div>
        </div>
      );
    } else {
      stars.push(
        <Star
          key={i}
          size={starSize}
          fill={isFull ? starFill : 'none'}
          stroke={starFill}
          opacity={isFull ? 1 : 0.3}
        />
      );
    }
  }

  return <div className={`!text-accent flex gap-1 ${className}`}>{stars}</div>;
};

export default StarRating;
