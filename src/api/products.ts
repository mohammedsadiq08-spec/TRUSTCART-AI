import { request } from './client';
import { ComparisonItem } from '../types';

export interface ProductItem {
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
}

export const productsApi = {
  async getProducts(limit: number = 20): Promise<ProductItem[]> {
    return request<ProductItem[]>(`/products?limit=${limit}`, { method: 'GET' });
  },

  async getProductById(id: string): Promise<ProductItem> {
    return request<ProductItem>(`/products/${id}`, { method: 'GET' });
  },

  async searchProducts(query: string, category?: string): Promise<ProductItem[]> {
    return request<ProductItem[]>('/products/search', {
      method: 'POST',
      body: JSON.stringify({ query, category })
    });
  },

  async compareProducts(productIds: string[]): Promise<ComparisonItem[]> {
    return request<ComparisonItem[]>('/products/compare', {
      method: 'POST',
      body: JSON.stringify({ product_ids: productIds })
    });
  },

  async saveProduct(productId: string): Promise<{ status: string; saved: boolean; product_id: string }> {
    return request<{ status: string; saved: boolean; product_id: string }>(`/products/${productId}/save`, {
      method: 'POST'
    });
  },

  async unsaveProduct(productId: string): Promise<{ status: string; saved: boolean; product_id: string }> {
    return request<{ status: string; saved: boolean; product_id: string }>(`/products/${productId}/save`, {
      method: 'DELETE'
    });
  }
};
