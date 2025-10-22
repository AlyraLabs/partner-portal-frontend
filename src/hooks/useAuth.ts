import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { logout } from '@/actions/authActions';
import { LoginFormData, RegisterFormData } from '@/types';

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
      return await axios.post('/api/auth/register', data);
    },
    onSuccess: data => {
      router.push('/login');
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
    handleLogout,
  };
}

export default UseAuth;
