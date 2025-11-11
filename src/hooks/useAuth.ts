import { useRouter } from 'next/navigation';

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

interface ResetPasswordData {
  newPassword: string;
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
    mutationFn: async (formData: LoginFormData) => {
      const { data } = await axios.post('/api/auth/login', formData);
      return {
        newUser: formData.newUser,
        ...data,
      };
    },
    onSuccess: async data => {
      console.log(data);
      await queryClient.invalidateQueries({ queryKey: ['integrations', 'user'] });
      await queryClient.refetchQueries({ queryKey: ['integrations'] });
      if (data?.newUser) {
        router.push('/new-integration');
        return;
      }
      router.push('/projects');
    },
    onError: (error: ErrorResponse) => {
      console.log(error?.response?.data);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      console.log(data);
      const { data: responseData } = await axios.post<RegisterResponse>('/api/auth/register', data);
      sessionStorage.setItem(
        'creds',
        JSON.stringify({
          email: data.email,
          password: data.password,
        })
      );
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

  const deleteAccountMutation = useMutation({
    mutationFn: async () => {
      return await axios.delete('/api/auth/delete');
    },
    onSuccess: data => {
      console.log(data);
      router.push('/login');
    },
    onError: (error: ErrorResponse) => {
      console.log(error?.response?.data);
    },
  });

  const resetPassword = useMutation({
    mutationFn: async (data: ResetPasswordData) => {
      return await axios.post(`/api/auth/reset-password`, { newPassword: data.newPassword });
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
    deleteAccountMutation,
    resetPassword,
  };
}

export default UseAuth;
