import { request } from './client';
import { ReviewSample } from '../types';

export interface ReviewAnalyzeResult {
  suspicionScore: number;
  credibilityScore: number;
  label: string;
  credibilityLabel: string;
  signals: string[];
  sentimentScore: number;
  entropyScore: number;
  botProbability: number;
  isSuspicious: boolean;
}

export const reviewsApi = {
  async getProductReviews(productId: string): Promise<ReviewSample[]> {
    return request<ReviewSample[]>(`/reviews/product/${productId}`, { method: 'GET' });
  },

  async analyzeReviewText(
    reviewText: string,
    rating: number = 5,
    verifiedPurchase: boolean = true
  ): Promise<ReviewAnalyzeResult> {
    return request<ReviewAnalyzeResult>('/reviews/analyze', {
      method: 'POST',
      body: JSON.stringify({
        review_text: reviewText,
        rating,
        verified_purchase: verifiedPurchase
      })
    });
  }
};
