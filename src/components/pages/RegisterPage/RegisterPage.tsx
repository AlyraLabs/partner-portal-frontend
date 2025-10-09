'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import useAuth from '@hooks/useAuth';

import './RegisterPage.scss';

import { RegisterForm } from '@/components';
import { Icon } from '@/components';

export const RegisterPage: React.FC = () => {
  const router = useRouter();
  const { registerMutation } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      await (registerMutation as any).mutateAsync(data);
      // Redirect to login page after successful registration
      router.push('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-page__logo">
        <Icon name="logo" size="lg" className="register-page__logo-icon" />
        <span className="register-page__logo-text">Alyra</span>
      </div>

      <div className="register-page__container">
        <h2 className="register-page__title">Create an account</h2>

        <div className="register-page__form">
          <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
        </div>

        <div className="register-page__footer">
          <span>©</span>
          <a href="#">Terms of Use</a>
          <span>•</span>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};
