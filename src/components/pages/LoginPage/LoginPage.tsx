'use client';

import React from 'react';

import Corners from '@components/ui/Corners/Corners';
import useAuth from '@hooks/useAuth';

import './LoginPage.scss';

import { LoginForm } from '@/components';
import { Icon } from '@/components';
import { LoginFormData } from '@/types/auth';

export const LoginPage: React.FC = () => {
  const { loginMutation } = useAuth();

  const handleLogin = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="login-page">
      <div className="login-page__logo">
        <Icon name="logo" size="xl" className="login-page__logo-icon" />
        <span className="login-page__logo-text">Alyra</span>
      </div>

      <div className="login-page__container">
        <Corners />
        <h2 className="login-page__title">&#47;&#47; LOGIN</h2>
        <hr />
        <LoginForm onSubmit={handleLogin} isLoading={loginMutation.isPending} />
      </div>
    </div>
  );
};
