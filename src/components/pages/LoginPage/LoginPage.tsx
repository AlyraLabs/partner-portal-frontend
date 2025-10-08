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
    // loginMutation.mutate(data);
  };

  return (
    <div className="login-page">
      <div className="login-page__logo">
        <Icon name="logo" size="lg" className="login-page__logo-icon" />
        <span className="login-page__logo-text">Alyra</span>
      </div>

      <div className="login-page__container">
        <h2 className="login-page__title">Log in</h2>

        <div className="login-page__form">
          <LoginForm onSubmit={handleLogin} />
        </div>

        <div className="login-page__footer">
          <span>©</span>
          <a href="#">Terms of Use</a>
          <span>•</span>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};
