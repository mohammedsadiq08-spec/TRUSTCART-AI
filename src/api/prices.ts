import { request } from './client';
import { PriceHistoryPoint } from '../types';

export interface PriceAnalysisResult {
  productId: string;
  productName: string;
  currentPrice: number;
  currency: string;
  thirtyDayAvgPrice: number;
  allTimeLow: number;
  marketRange: { min: number; max: number };
  priceIntelligenceScore: number;
  timingAdvice: 'BUY NOW' | 'WAIT';
  timingReason: string;
  fakeDiscountDetected: boolean;
  priceHistory: PriceHistoryPoint[];
}

export const pricesApi = {
  async getPriceHistory(productId: string): Promise<PriceHistoryPoint[]> {
    return request<PriceHistoryPoint[]>(`/prices/product/${productId}/history`, { method: 'GET' });
  },

  async analyzePrice(productId: string): Promise<PriceAnalysisResult> {
    return request<PriceAnalysisResult>(`/prices/product/${productId}/analysis`, { method: 'POST' });
  }
};
