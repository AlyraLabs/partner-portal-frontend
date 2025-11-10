'use client';

import React, { createContext, useContext, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { AuthState, User } from '@/types/auth';

const AuthContext = createContext<AuthState | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
  initialUser?: User;
}

interface UserResponse {
  success: boolean;
  data: User;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, initialUser }) => {
  const [user, setUser] = useState<User | null>(null);

  useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await axios.get<UserResponse>('/api/auth/me');
      if (data.success) {
        setUser(data.data);
        return data.data;
      }
      return null;
    },
    initialData: initialUser,
    staleTime: 0,
    retry: 0,
  });

  const value = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
