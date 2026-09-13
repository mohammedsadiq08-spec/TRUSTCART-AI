import { request } from './client';
import { ProductInvestigation } from '../types';

export interface AnalyzeProductPayload {
  input_text: string;
  mode?: 'link' | 'image' | 'search';
  category?: string;
  user_budget?: number;
}

export const analysisApi = {
  async analyzeProduct(payload: AnalyzeProductPayload): Promise<ProductInvestigation> {
    return request<ProductInvestigation>('/analysis/product', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  async getProductAnalysis(productId: string): Promise<ProductInvestigation> {
    return request<ProductInvestigation>(`/analysis/product/${productId}`, {
      method: 'GET'
    });
  }
};
