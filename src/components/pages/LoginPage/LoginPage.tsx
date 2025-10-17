'use client';

import React from 'react';
import Link from 'next/link';

import useAuth from '@hooks/useAuth';

import './LoginPage.scss';

import Copyright from '@/../public/icons/copyright.svg';
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
        <Icon name="logo" size="lg" className="login-page__logo-icon" />
        <span className="login-page__logo-text">Alyra</span>
      </div>

      <div className="login-page__container">
        <h2 className="login-page__title">Log in</h2>
        <LoginForm onSubmit={handleLogin} isLoading={loginMutation.isPending} />
      </div>

      <div className="login-page__footer">
        <Copyright />
        <Link href="/terms-of-use">Terms of Use</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
      </div>
    </div>
  );
};
