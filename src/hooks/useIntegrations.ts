import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { CreateIntegrationDto } from '@/types';

interface ErrorResponse {
  response: {
    data: {
      success: boolean;
      message: string;
      status: number;
    };
  };
}

export const useIntegrations = () => {
  const router = useRouter();

  const createIntegration = useMutation({
    mutationFn: async (data: CreateIntegrationDto) => {
      return await axios.post('/api/integration/create', data);
    },
    onSuccess: data => {
      router.push('/dashboard');
      console.log(data);
    },
    onError: (error: ErrorResponse) => {
      console.log(error?.response?.data);
    },
  });

  return {
    createIntegration,
  };
};
