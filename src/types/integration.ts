export interface Integration {
  id: string;
  name: string;
  url: string;
  string: string;
  plan: string;
  fee: string;
  rpms: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateIntegrationDto {
  name: string;
  website?: string;
  string: string;
  evmWallet?: string;
  solanaWallet?: string;
  suiWallet?: string;
  apiKeyConfirmed: boolean;
}

export interface IntegrationResponse {
  success: boolean;
  data: Integration;
  message?: string;
}

export interface IntegrationsResponse {
  success: boolean;
  data: Integration[];
  message?: string;
}
