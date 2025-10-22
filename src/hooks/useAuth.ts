import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
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
  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      return await axios.post('/api/auth/login', data);
    },
    onSuccess: data => {
      router.push('/dashboard');
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
    logout().then(() => {
      router.push('/login');
      // setUserData(null);
      // queryClient.removeQueries();
    });
  };

  return {
    loginMutation,
    registerMutation,
    handleLogout,
  };
}

export default UseAuth;
