'use client';

import React, { createContext, useContext, useMemo } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { CreateIntegrationDto, Integration } from '../types/integration';

interface IntegrationContextType {
  integrations: Integration[];
  isLoading: boolean;
  error: string | null;
  createIntegration: (data: CreateIntegrationDto) => Promise<Integration>;
  isCreating: boolean;
  refetchIntegrations: () => void;
  hasExistingIntegrations: boolean;
  integrationCount: number;
}

const IntegrationContext = createContext<IntegrationContextType | undefined>(undefined);

// API base URL
const API_BASE_URL = 'http://localhost:3001';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface IntegrationProviderProps {
  children: React.ReactNode;
}

export const IntegrationProvider: React.FC<IntegrationProviderProps> = ({ children }) => {
  const queryClient = useQueryClient();

  // Fetch integrations
  const {
    data: integrations = [],
    isLoading,
    error,
    refetch: refetchIntegrations,
  } = useQuery({
    queryKey: ['integrations'],
    queryFn: async (): Promise<Integration[]> => {
      const response = await apiClient.get('/integrations');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  // Create integration mutation
  const { mutateAsync: createIntegration, isPending: isCreating } = useMutation({
    mutationFn: async (data: CreateIntegrationDto): Promise<Integration> => {
      const response = await apiClient.post('/integrations', data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch integrations after successful creation
      queryClient.invalidateQueries({ queryKey: ['integrations'] });
    },
    onError: error => {
      console.error('Failed to create integration:', error);
    },
  });

  // Computed values for integration status
  const integrationCount = useMemo(() => integrations.length, [integrations]);
  const hasExistingIntegrations = useMemo(() => integrations.length > 0, [integrations]);

  const value: IntegrationContextType = {
    integrations,
    isLoading,
    error: error?.message || null,
    createIntegration,
    isCreating,
    refetchIntegrations,
    hasExistingIntegrations,
    integrationCount,
  };

  return <IntegrationContext.Provider value={value}>{children}</IntegrationContext.Provider>;
};

export const useIntegrations = () => {
  const context = useContext(IntegrationContext);
  if (context === undefined) {
    throw new Error('useIntegrations must be used within an IntegrationProvider');
  }
  return context;
};
