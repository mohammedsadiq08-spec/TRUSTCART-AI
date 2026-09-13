import { request } from './client';
import { PersonaPreferences } from '../types';

export interface PersonalizedRecommendationResult {
  productId: string;
  productName: string;
  price: string;
  matchPercent: number;
  reason: string;
  badge: string;
  rating: number;
  supportingSignals: string[];
}

export const recommendationsApi = {
  async getPersonalizedRecommendation(
    prefs: PersonaPreferences
  ): Promise<PersonalizedRecommendationResult> {
    return request<PersonalizedRecommendationResult>('/recommendations/personalized', {
      method: 'POST',
      body: JSON.stringify(prefs)
    });
  },

  async getMatrixCriteria(): Promise<Record<string, { title: string; criteria: string[] }>> {
    return request<Record<string, { title: string; criteria: string[] }>>('/recommendations/matrix', {
      method: 'GET'
    });
  }
};
