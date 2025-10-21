import { ReviewFields } from '@/types/review';
import { Field } from '@sitecore-content-sdk/nextjs';
import { IGQLField } from '@/types/igql';

/**
 * Calculates the average rating from a list of reviews
 * @param reviews - Array of review objects with rating fields
 * @returns Average rating rounded to 1 decimal places, or 0 if no reviews
 */
export const calculateAverageRating = (reviews: ReviewFields[]): number => {
  if (!reviews || reviews.length === 0) return 0;

  const totalRating = reviews.reduce((sum, review) => sum + (review.fields.Rating?.value || 0), 0);
  return parseFloat((totalRating / reviews.length).toFixed(1));
};

/**
 * Calculates the average rating from IGQL review format (used in ProductListing)
 * @param reviews - Array of IGQL review objects with rating fields
 * @returns Average rating rounded to 1 decimal places, or 0 if no reviews
 */
export const calculateAverageRatingFromIGQL = (
  reviews: Array<{ rating: IGQLField<Field<number>> }>
): number => {
  if (!reviews || reviews.length === 0) return 0;

  const totalRating = reviews.reduce(
    (sum, review) => sum + (review.rating?.jsonValue?.value || 0),
    0
  );
  return parseFloat((totalRating / reviews.length).toFixed(1));
};
