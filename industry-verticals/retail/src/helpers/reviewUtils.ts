import { Review } from '@/components/product-reviews/ProductReviews';

export const getFilteredReviewsById = (reviews: Review[], productId?: string) => {
  if (!reviews || reviews.length === 0 || !productId) return [];
  return reviews.filter(
    (review) => review.product.jsonValue.id.trim().toLowerCase() === productId.trim().toLowerCase()
  );
};
