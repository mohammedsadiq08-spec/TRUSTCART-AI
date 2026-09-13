import { request } from './client';
import { PersonaPreferences } from '../types';

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  created_at: string;
  saved_products_count: number;
  analyses_count: number;
}

export interface SavedProductItem {
  id: string;
  product_id: string;
  saved_at: string;
  product: {
    id: string;
    name: string;
    description?: string;
    category: string;
    brand: string;
    price: number;
    currency: string;
    original_price?: number;
    image_url?: string;
    source_platform: string;
    source_url?: string;
    rating: number;
    review_count: number;
    thirty_day_avg_price: number;
    all_time_low: number;
    market_min: number;
    market_max: number;
  };
}

export interface AnalysisHistoryItem {
  id: string;
  product_id: string;
  product_name: string;
  product_image?: string;
  brand: string;
  category: string;
  price: number;
  currency: string;
  trust_score: number;
  recommendation: 'BUY' | 'WAIT' | 'AVOID';
  confidence: number;
  analyzed_at: string;
}

export const userApi = {
  async getProfile(): Promise<UserProfile> {
    return request<UserProfile>('/users/me', { method: 'GET' });
  },

  async updateProfile(payload: { full_name?: string; password?: string }): Promise<UserProfile> {
    return request<UserProfile>('/users/me', {
      method: 'PATCH',
      body: JSON.stringify(payload)
    });
  },

  async getSavedProducts(): Promise<SavedProductItem[]> {
    return request<SavedProductItem[]>('/users/me/saved-products', { method: 'GET' });
  },

  async getAnalysisHistory(): Promise<AnalysisHistoryItem[]> {
    return request<AnalysisHistoryItem[]>('/users/me/analysis-history', { method: 'GET' });
  },

  async getPreferences(): Promise<PersonaPreferences> {
    return request<PersonaPreferences>('/users/me/preferences', { method: 'GET' });
  },

  async updatePreferences(prefs: PersonaPreferences): Promise<PersonaPreferences> {
    return request<PersonaPreferences>('/users/me/preferences', {
      method: 'POST',
      body: JSON.stringify(prefs)
    });
  }
};
