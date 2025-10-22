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
        <label htmlFor="email" className="register-form__label">
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
        <label htmlFor="password" className="register-form__label">
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
          showPassword={showPassword}
        />
        <label htmlFor="confirmPassword" className="register-form__label">
          Confirm Password
        </label>
        <Input
          id="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder=""
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: value => value === password || 'Passwords do not match',
          })}
          errorMessage={errors.confirmPassword?.message}
          toggleShowPassword={toggleConfirmPasswordVisibility}
          showPassword={showConfirmPassword}
        />
      </div>

      {/* <div className="register-form__checkbox">
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
      </div> */}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={isLoading || isSubmitting}
        disabled={false}
        className="register-form__submit">
        Continue
        <Arrow />
      </Button>

      <div className="register-form__footer">
        <p>
          Already have an account?{' '}
          <Link href="/login" className="register-form__link">
            Login
          </Link>
        </p>
      </div>

      <div className="register-form__agreement">
        <p>
          By creating your account you agree to the <br />
          <Link href="/privacy-policy" className="register-form__link">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link href="/terms-of-use" className="register-form__link">
            Terms of Use
          </Link>
          .
        </p>
      </div>
    </form>
  );
};
