import { request } from './client';

export interface SellerProfile {
  id: string;
  name: string;
  platform: string;
  profile_url?: string;
  rating: number;
  review_count: number;
  location?: string;
  account_age: string;
  fulfillment_type: string;
  risk_level: string;
  return_policy: string;
  warnings: string[];
}

export const sellersApi = {
  async getSeller(sellerId: string): Promise<SellerProfile> {
    return request<SellerProfile>(`/sellers/${sellerId}`, { method: 'GET' });
  },

  async analyzeSeller(payload: { seller_id?: string; seller_name?: string; platform?: string }) {
    return request('/sellers/analyze', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }
};
