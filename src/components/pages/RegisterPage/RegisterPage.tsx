'use client';

import React from 'react';

import Corners from '@components/ui/Corners/Corners';
import useAuth from '@hooks/useAuth';

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
        <Corners />
        <h2 className="register-page__title">&#47;&#47; CREATE YOUR ACCOUNT</h2>
        <hr />
        <RegisterForm onSubmit={handleRegister} isLoading={registerMutation.isPending} />
      </div>

      {/* <div className="register-page__footer">
        <Copyright />
        <Link href="/terms-of-use">Terms of Use</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
      </div> */}
    </div>
  );
};
