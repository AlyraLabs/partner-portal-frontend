const BLACKHOLE_API_URL = process.env.NEXT_PUBLIC_ALYRA_API_URL || 'http://localhost:3000';

export class AlyraApiService {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || BLACKHOLE_API_URL;
  }

  async getUserTokens(userAddress: string, chainId?: number): Promise<string[]> {
    try {
      const url = chainId
        ? `${this.baseUrl}/v1/user/tokens?userAddress=${encodeURIComponent(userAddress)}&chainId=${chainId}`
        : `${this.baseUrl}/v1/user/tokens?userAddress=${encodeURIComponent(userAddress)}`;

      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch user tokens: ${response.statusText}`);
      }

      const data = await response.json();

      const tokens = data.tokens || [];

      return tokens;
    } catch (error) {
      console.error('[AlyraApiService] Error fetching user tokens:', error);
      return [];
    }
  }
}

export const alyraApiService = new AlyraApiService();
