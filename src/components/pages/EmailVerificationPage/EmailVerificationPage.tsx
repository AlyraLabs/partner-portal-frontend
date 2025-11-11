'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Corners from '@components/ui/Corners/Corners';
import useAuth from '@hooks/useAuth';

import './EmailVerificationPage.scss';

import Check from '@/../public/icons/check.svg';
import Arrow from '@/../public/icons/right-arrow.svg';
import { Logo } from '@/components';
import { Input } from '@/components';
import { Button } from '@/components';
import { VerificationFormData, verificationSchema } from '@/validation/auth';

export const EmailVerificationPage: React.FC = () => {
  const searchParams = useSearchParams();
  const { emailVerificationMutation, loginMutation } = useAuth();
  const isSuccess = emailVerificationMutation.isSuccess;

  const session = searchParams.get('session') as string;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: '',
    },
  });

  const handleVerification = (data: VerificationFormData) => {
    if (isSuccess) {
      const credentials = JSON.parse(sessionStorage.getItem('creds') as string);
      loginMutation.mutate({
        newUser: true,
        ...credentials,
      });
      return;
    }
    emailVerificationMutation.mutate({
      code: data.code,
      session,
    });
  };

  return (
    <div className="email-verification-page">
      <Logo />
      <div className="email-verification-page__container">
        <Corners />
        <h2 className="email-verification-page__title">{isSuccess ? '// SUCCESS' : '// ACTIVATE YOUR ACCOUNT'}</h2>
        <hr />
        <div
          className="email-verification-page__confirmation-message"
          style={{ marginBottom: isSuccess ? '36px' : '18px' }}>
          <Check />
          {!isSuccess ? <p>CONFIRMATION CORE SENT TO YOUR EMAIL</p> : <p>ACCOUNT HAS BEEN VERIFIED!</p>}
        </div>
        <form onSubmit={handleSubmit(handleVerification)} className="email-verification-form">
          {!isSuccess && (
            <>
              <div className="email-verification-form__inputs">
                <label htmlFor="code" className="email-verification-form__label">
                  Paste confirmation code
                </label>
                <Input
                  id="code"
                  type="text"
                  placeholder="12345"
                  {...register('code')}
                  errorMessage={errors.code?.message}
                  disabled={emailVerificationMutation.isPending}
                />
              </div>
              <div className="email-verification-form__resend-link">
                <a href="#">Resend confirmation email</a>
              </div>
            </>
          )}

          <div className="email-verification-form__buttons">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={emailVerificationMutation.isPending || loginMutation.isPending}
              disabled={emailVerificationMutation.isPending || loginMutation.isPending}>
              CONTINUE
              <Arrow />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
