'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { useForm } from 'react-hook-form';

import './LoginForm.scss';

import Arrow from '@/../public/icons/right-arrow.svg';
import { Button } from '@/components';
import { Input } from '@/components';
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
          <label htmlFor="email" className="login-form__label">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            errorMessage={errors.email?.message}
          />
          <label htmlFor="password" className="login-form__label">
            Password
          </label>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder=""
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

        <a href="/forgot-password" className="login-form__forgot-link">
          Forgot Password?
        </a>

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
        </div>

        <div className="login-form__footer">
          <p>
            Don&apos;t have an account?{' '}
            <Link href="/register" className="login-form__link">
              Create
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};
