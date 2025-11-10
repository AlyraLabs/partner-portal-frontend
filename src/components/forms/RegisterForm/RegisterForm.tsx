'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import './RegisterForm.scss';

import Arrow from '@/../public/icons/right-arrow.svg';
import { Button } from '@/components';
import { Input } from '@/components';
import { RegisterFormData, registerSchema } from '@/validation/auth';

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
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      companyName: '',
      email: '',
      password: '',
      confirmPassword: '',
      telegram: '',
      website: '',
    },
  });

  const handleFormSubmit = (data: RegisterFormData) => {
    onSubmit({
      companyName: data.companyName,
      confirmPassword: '',
      username: data.username,
      email: data.email,
      password: data.password,
      website: data.website,
      telegram: data.telegram,
    });
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
        <div className="register-form__field">
          <label htmlFor="username" className="register-form__label">
            Username
          </label>
          <Input
            id="username"
            type="text"
            placeholder="username"
            {...register('username')}
            errorMessage={errors.username?.message}
          />
        </div>

        <div className="register-form__field">
          <label htmlFor="companyName" className="register-form__label">
            Company name
          </label>
          <Input
            id="companyName"
            type="text"
            placeholder="company"
            {...register('companyName')}
            errorMessage={errors.companyName?.message}
          />
        </div>

        <div className="register-form__field register-form__field--full">
          <label htmlFor="email" className="register-form__label">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            {...register('email')}
            errorMessage={errors.email?.message}
          />
        </div>

        <div className="register-form__field">
          <label htmlFor="password" className="register-form__label">
            Password
          </label>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder=""
            {...register('password')}
            errorMessage={errors.password?.message}
            toggleShowPassword={togglePasswordVisibility}
            showPassword={showPassword}
          />
        </div>

        <div className="register-form__field">
          <label htmlFor="confirmPassword" className="register-form__label">
            Confirm password
          </label>
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder=""
            {...register('confirmPassword')}
            errorMessage={errors.confirmPassword?.message}
            toggleShowPassword={toggleConfirmPasswordVisibility}
            showPassword={showConfirmPassword}
          />
        </div>

        <div className="register-form__field">
          <label htmlFor="telegram" className="register-form__label register-form__label--optional">
            Telegram
          </label>
          <Input
            id="telegram"
            type="text"
            placeholder="username"
            {...register('telegram')}
            errorMessage={errors.telegram?.message}
          />
        </div>

        <div className="register-form__field">
          <label htmlFor="website" className="register-form__label register-form__label--optional">
            Website
          </label>
          <Input
            id="website"
            type="text"
            placeholder="example.com"
            {...register('website')}
            errorMessage={errors.website?.message}
          />
        </div>
      </div>

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
          <Link href="https://alyra.finance/policy" target="_blank" className="register-form__link">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link href="https://alyra.finance/terms" target="_blank" className="register-form__link">
            Terms of Use
          </Link>
          .
        </p>
      </div>
    </form>
  );
};
