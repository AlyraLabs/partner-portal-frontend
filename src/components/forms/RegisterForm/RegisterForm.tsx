'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { useForm } from 'react-hook-form';

import './RegisterForm.scss';

import Arrow from '@/../public/icons/right-arrow.svg';
import { Button } from '@/components';
import { Input } from '@/components';
import { RegisterFormData } from '@/types';

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
  isLoading?: boolean;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, isLoading = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  const handleFormSubmit = (data: RegisterFormData) => {
    onSubmit({ email: data.email, password: data.password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="register-form">
      <div className="register-form__inputs">
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
          showPassword={showPassword}
        />
        <Input
          id="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm your password"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: value => value === password || 'Passwords do not match',
          })}
          errorMessage={errors.confirmPassword?.message}
          toggleShowPassword={toggleConfirmPasswordVisibility}
          showPassword={showConfirmPassword}
        />
      </div>

      <div className="register-form__checkbox">
        <label htmlFor="register-checkbox" className="checkbox-label">
          <input
            checked={isChecked}
            onChange={e => {
              setIsChecked(prev => !prev);
            }}
            id="register-checkbox"
            type="checkbox"
            className="checkbox-input"
          />
          <div className="checkbox-custom" />
          <div>
            I have read and agree to <Link href="/terms-of-use">Terms of Use</Link> &
            <Link href="/privacy-policy"> Privacy Policy</Link>
          </div>
        </label>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={isLoading || isSubmitting}
        disabled={!isChecked}
        className="register-form__submit">
        Continue
        <Arrow />
      </Button>

      <div className="register-form__footer">
        <p>
          Already have an account?{' '}
          <Link href="/login" className="register-form__link">
            Log in
          </Link>
        </p>
      </div>
    </form>
  );
};
