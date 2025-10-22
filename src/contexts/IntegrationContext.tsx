'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { CreateIntegrationDto, Integration } from '../types/integration';

import { isAuthenticated } from '@/actions/authActions';

interface IntegrationContextType {
  // List operations
  integrations: Integration[];
  isLoading: boolean;
  error: string | null;
  refetchIntegrations: () => void;
  hasExistingIntegrations: boolean;
  integrationCount: number;

  // Create
  createIntegration: (data: CreateIntegrationDto) => Promise<Integration>;
  isCreating: boolean;

  // Get single
  getIntegration: (id: string) => Promise<Integration>;

  // Update
  updateIntegration: (id: string, data: Partial<CreateIntegrationDto>) => Promise<Integration>;
  isUpdating: boolean;

  // Delete
  deleteIntegration: (id: string) => Promise<void>;
  isDeleting: boolean;
}

const IntegrationContext = createContext<IntegrationContextType | undefined>(undefined);

interface IntegrationProviderProps {
  children: React.ReactNode;
}

export const IntegrationProvider: React.FC<IntegrationProviderProps> = ({ children }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: integrations = [],
    isLoading,
    error,
    refetch: refetchIntegrations,
  } = useQuery({
    queryKey: ['integrations'],
    queryFn: async (): Promise<Integration[]> => {
      const response = await axios.get('/api/integrations');
      return response.data.data || [];
    },
    refetchOnMount: true,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  // Create integration
  const { mutateAsync: createIntegration, isPending: isCreating } = useMutation({
    mutationFn: async (data: CreateIntegrationDto): Promise<Integration> => {
      const response = await axios.post('/api/integrations', data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['integrations'] });
      refetchIntegrations();
      router.push('/dashboard');
    },
    onError: error => {
      console.error('Failed to create integration:', error);
    },
  });

  // Update integration
  const { mutateAsync: updateIntegration, isPending: isUpdating } = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreateIntegrationDto> }): Promise<Integration> => {
      const response = await axios.patch(`/api/integrations/${id}`, data);
      return response.data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['integrations'] });
      queryClient.invalidateQueries({ queryKey: ['integrations', variables.id] });
    },
    onError: error => {
      console.error('Failed to update integration:', error);
    },
  });

  // Delete integration
  const { mutateAsync: deleteIntegration, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await axios.delete(`/api/integrations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['integrations'] });
    },
    onError: error => {
      console.error('Failed to delete integration:', error);
    },
  });

  // Get single integration (non-cached, direct fetch)
  const getIntegration = async (id: string): Promise<Integration> => {
    const response = await axios.get(`/api/integrations/${id}`);
    return response.data.data;
  };

  // Computed values
  const integrationCount = useMemo(() => integrations.length, [integrations]);
  const hasExistingIntegrations = useMemo(() => integrations.length > 0, [integrations]);

  const value: IntegrationContextType = {
    // List
    integrations,
    isLoading,
    error: error?.message || null,
    refetchIntegrations,
    hasExistingIntegrations,
    integrationCount,

    // Create
    createIntegration,
    isCreating,

    // Get single
    getIntegration,

    // Update
    updateIntegration: (id, data) => updateIntegration({ id, data }),
    isUpdating,

    // Delete
    deleteIntegration,
    isDeleting,
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
