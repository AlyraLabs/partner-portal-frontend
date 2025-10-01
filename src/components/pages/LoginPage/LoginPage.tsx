'use client';

import React from 'react';

import { useAuth } from '../../../contexts/AuthContext';
import { LoginFormData } from '../../../types/auth';
import { LoginForm } from '../../forms/LoginForm';
import { Icon } from '../../ui/Icon';

import './LoginPage.scss';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();

  const handleLogin = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password, data.rememberMe);
    } catch (error) {
      // Error handling is done in the LoginForm component
      throw error;
    }
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
