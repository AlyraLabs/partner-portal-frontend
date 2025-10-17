'use client';

import React from 'react';
import Link from 'next/link';

import useAuth from '@hooks/useAuth';

import Copyright from '../../../../public/icons/copyright.svg';

import './RegisterPage.scss';

import { RegisterForm } from '@/components';
import { Icon } from '@/components';
import { RegisterFormData } from '@/types';

export const RegisterPage: React.FC = () => {
  const { registerMutation } = useAuth();

  const handleRegister = (data: RegisterFormData) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="register-page">
      <div className="register-page__logo">
        <Icon name="logo" size="lg" className="register-page__logo-icon" />
        <span className="register-page__logo-text">Alyra</span>
      </div>

      <div className="register-page__container">
        <h2 className="register-page__title">Create an account</h2>
        <RegisterForm onSubmit={handleRegister} isLoading={registerMutation.isPending} />
      </div>

      <div className="register-page__footer">
        <Copyright />
        <Link href="/terms-of-use">Terms of Use</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
      </div>
    </div>
  );
};
