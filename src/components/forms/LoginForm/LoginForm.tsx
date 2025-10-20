'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { useForm } from 'react-hook-form';

import './LoginForm.scss';

import Arrow from '@/../public/icons/right-arrow.svg';
import { Button } from '@/components';
import { Input } from '@/components';
import { ConnectWalletButton } from '@/components/ConnectWalletButton';
import { ContractActions } from '@/components/ContractActions';
import { LoginFormData } from '@/types/auth';

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading = false }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleFormSubmit = (data: LoginFormData) => {
    onSubmit(data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="login-form">
        <div className="login-form__inputs">
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            errorMessage={errors.email?.message}
          />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            errorMessage={errors.password?.message}
            toggleShowPassword={togglePasswordVisibility}
            showPassword={!showPassword}
          />
        </div>

        <div className="login-form__buttons">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isLoading || isSubmitting}
            className="login-form__submit">
            Continue
            <Arrow />
          </Button>

          <div className="login-form__divider">
            <span>or</span>
          </div>

          <ConnectWalletButton variant="secondary" size="lg" className="login-form__wallet-button" />
        </div>

        <div className="login-form__footer">
          <p>
            Don&apos;t have an account?{' '}
            <Link href="/register" className="login-form__link">
              Sign up
            </Link>
          </p>
          <a href="/forgot-password" className="login-form__link">
            Forgot Password?
          </a>
        </div>
      </form>

      <ContractActions />
    </>
  );
};
