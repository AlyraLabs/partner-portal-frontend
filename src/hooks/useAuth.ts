import { useRouter, useSearchParams } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { logout } from '@/actions/authActions';
import { LoginFormData } from '@/types';
import { RegisterFormData } from '@/validation/auth';

interface RegisterResponse {
  success: boolean;
  session: string;
  message: string;
}

interface EmailVerificationData {
  code: string;
  session: string;
}

interface ErrorResponse {
  response: {
    data: {
      success: boolean;
      message: string;
      status: number;
    };
  };
}

function UseAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      return await axios.post('/api/auth/login', data);
    },
    onSuccess: async data => {
      await queryClient.invalidateQueries({ queryKey: ['integrations'] });
      await queryClient.refetchQueries({ queryKey: ['integrations'] });
      router.push('/projects');
      console.log(data);
    },
    onError: (error: ErrorResponse) => {
      console.log(error?.response?.data);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      console.log(data);
      const { data: responseData } = await axios.post<RegisterResponse>('/api/auth/register', data);
      return responseData;
    },
    onSuccess: data => {
      router.push(`/email-verification?session=${data.session}`);
    },
    onError: (error: ErrorResponse) => {
      console.log(error?.response?.data);
    },
  });

  const emailVerificationMutation = useMutation({
    mutationFn: async (data: EmailVerificationData) => {
      return await axios.post(`/api/auth/email-verification?session=${data.session}`, data);
    },
    onSuccess: data => {
      console.log(data);
    },
    onError: (error: ErrorResponse) => {
      console.log(error?.response?.data);
    },
  });

  const handleLogout = () => {
    logout().then(async () => {
      router.push('/login');
      // setUserData(null);
      await queryClient.cancelQueries();
      queryClient.clear();
      queryClient.setQueryData(['integrations'], []);
    });
  };

  return {
    loginMutation,
    registerMutation,
    emailVerificationMutation,
    handleLogout,
  };
}

export default UseAuth;
