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
    if (showOnlyFilled && i > safeRating) break;

    let starFill = 'currentColor';
    let starOpacity = 1;

    if (!showOnlyFilled) {
      if (i <= fullStars) {
        starOpacity = 1;
      } else if (i === fullStars + 1 && hasPartial) {
        const fillPercentage = (safeRating - fullStars) * 100;
        stars.push(
          <div key={i} className="relative" style={{ width: starSize, height: starSize }}>
            {/* Empty Star */}
            <Star
              size={starSize}
              className="absolute top-0 left-0"
              stroke="currentColor"
              opacity={0.3}
            />
            {/* Filled portion */}
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
              <Star size={starSize} fill={starFill} stroke={starFill} />
            </div>
          </div>
        );
        continue;
      } else {
        // empty star
        starOpacity = 0.3;
      }
    }

    stars.push(
      <Star key={i} size={starSize} fill={starFill} stroke={starFill} opacity={starOpacity} />
    );
  }

  return <div className={`text-accent flex gap-1 ${className}`}>{stars}</div>;
};

export default StarRating;
