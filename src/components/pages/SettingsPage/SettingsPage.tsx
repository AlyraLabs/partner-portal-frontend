'use client';

import React, { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';

import useAuth from '@hooks/useAuth';

import './SettingsPage.scss';

import { Button, Icon, Input, Wrapper } from '@/components';
import Corners from '@/components/ui/Corners/Corners';
import { ChangePasswordFormValues, changePasswordSchema } from '@/validation/auth';

type PasswordForm = {
  password: string;
  confirmPassword: string;
};

export const SettingsPage: React.FC = () => {
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { resetPassword } = useAuth();

  const handleResetPassword = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (data: PasswordForm) => {
    resetPassword
      .mutateAsync({
        newPassword: data.password,
      })
      .then(() => {
        setIsModalOpen(false);
        resetPassword.reset();
      });
  };

  return (
    <Wrapper>
      <div className="settings-page">
        <h1 className="settings-page__title">SETTINGS</h1>
        <hr className="settings-page__divider" />

        <section className="settings-page__row">
          <div className="settings-page__row-content settings-page__row-content--password">
            <p className="settings-page__row-title">PASSWORD</p>
            <Button
              variant="primary"
              size="lg"
              disableTitleAnimation
              className="settings-page__reset-btn"
              onClick={handleResetPassword}>
              <span>Reset</span>
              <Icon name="right-arrow" size="sm" className="settings-page__reset-icon" />
            </Button>
          </div>
        </section>

        <hr className="settings-page__divider" />

        <section className="settings-page__row">
          <div className="settings-page__row-content">
            <p className="settings-page__row-title">EMAIL NOTIFICATIONS</p>
            <p className="settings-page__row-description">Receive email notifications about Alyra updates.</p>
          </div>

          <button
            type="button"
            className={`settings-page__toggle ${emailNotificationsEnabled ? 'settings-page__toggle--active' : ''}`.trim()}
            onClick={() => setEmailNotificationsEnabled(!emailNotificationsEnabled)}
            aria-pressed={emailNotificationsEnabled}
            aria-label="Toggle email notifications">
            <span className="settings-page__toggle-thumb" aria-hidden="true" />
          </button>
        </section>

        <hr className="settings-page__divider" />
      </div>
      {isModalOpen && (
        <ChangePasswordModal
          onSubmit={handleSubmit}
          onClose={() => setIsModalOpen(false)}
          isPending={resetPassword.isPending}
        />
      )}
    </Wrapper>
  );
};

type ChangePasswordModalProps = {
  onSubmit: (values: PasswordForm) => void;
  onClose: () => void;
  isPending: boolean;
};

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ onSubmit, onClose, isPending }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const confirmPasswordValue = watch('confirmPassword');

  const modalContent = (
    <div className="settings-page__modal-backdrop" onClick={onClose}>
      <div
        className="settings-page__modal"
        onClick={event => {
          event.stopPropagation();
        }}>
        <Corners />
        <div className="settings-page__modal-header">
          {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
          <p className="settings-page__modal-title">// CHANGE PASSWORD</p>
          <Button
            variant="secondary"
            size="sm"
            onClick={onClose}
            className="settings-page__modal-close"
            aria-label="Close modal"
            disableTitleAnimation>
            <X size={16} aria-hidden="true" />
          </Button>
        </div>

        <form
          className="settings-page__modal-form"
          onSubmit={handleSubmit(values => {
            onSubmit(values);
          })}>
          <label className="settings-page__modal-field">
            <span className="settings-page__modal-label">New Password</span>
            <Input
              type="password"
              placeholder="Enter new password"
              {...register('password')}
              className={errors.password ? 'input--error' : ''}
              errorMessage={errors?.password?.message}
            />
          </label>

          <label className="settings-page__modal-field">
            <span className="settings-page__modal-label">Confirm New Password</span>
            <Input
              type="password"
              placeholder="Confirm new password"
              {...register('confirmPassword')}
              className={errors.confirmPassword ? 'input--error' : ''}
            />
            {confirmPasswordValue && errors.confirmPassword && (
              <span className="settings-page__modal-error">{errors.confirmPassword.message}</span>
            )}
          </label>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disableTitleAnimation
            loading={isPending}
            className="settings-page__modal-submit">
            <span>Reset</span>
            <Icon name="right-arrow" size="sm" className="settings-page__reset-icon" />
          </Button>
        </form>
      </div>
    </div>
  );

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(modalContent, document.body);
};
