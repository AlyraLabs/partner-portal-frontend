export interface Integration {
  id: string;
  string: string;
  plan: string;
  fee: string;
  rpms: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateIntegrationDto {
  string: string;
  apiKey?: string;
  evmWallet?: string;
  solanaWallet?: string;
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
