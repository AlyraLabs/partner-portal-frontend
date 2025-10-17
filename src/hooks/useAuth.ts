import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

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
  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      return await axios.post('/api/auth/login', data);
    },
    onSuccess: data => {
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
      console.log(data);
    },
    onError: (error: ErrorResponse) => {
      console.log(error?.response?.data);
    },
  });

  return {
    loginMutation,
    registerMutation,
  };
}

export default UseAuth;
