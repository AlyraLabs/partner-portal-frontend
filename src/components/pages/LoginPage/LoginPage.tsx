'use client';

import React from 'react';

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
        <Icon name="logo" size="lg" className="login-page__logo-icon" />
        <span className="login-page__logo-text">Alyra</span>
      </div>

      <div className="login-page__container">
        <div className="login-page__corner login-page__corner--top-left"></div>
        <div className="login-page__corner login-page__corner--top-right"></div>
        <div className="login-page__corner login-page__corner--bottom-left"></div>
        <div className="login-page__corner login-page__corner--bottom-right"></div>
        <h2 className="login-page__title">&#47;&#47; LOGIN</h2>
        <hr />
        <LoginForm onSubmit={handleLogin} isLoading={loginMutation.isPending} />
      </div>

      {/* <div className="login-page__footer">
        <Copyright />
        <Link href="/terms-of-use">Terms of Use</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
      </div> */}
    </div>
  );
};
