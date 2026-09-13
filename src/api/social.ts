import { request } from './client';
import { SocialPostExtraction } from '../types';

export const socialApi = {
  async analyzeSocialPost(
    urlOrText: string,
    platform: string = 'Instagram'
  ): Promise<SocialPostExtraction> {
    return request<SocialPostExtraction>('/social/analyze', {
      method: 'POST',
      body: JSON.stringify({ url_or_text: urlOrText, platform })
    });
  }
};
