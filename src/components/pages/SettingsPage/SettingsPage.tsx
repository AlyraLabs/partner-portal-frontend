'use client';

import React, { useState } from 'react';

import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';

import './SettingsPage.scss';

import { Button, Icon, Input, Wrapper } from '@/components';
import Corners from '@/components/ui/Corners/Corners';

type PasswordForm = {
  password: string;
  confirmPassword: string;
};

export const SettingsPage: React.FC = () => {
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleResetPassword = () => {
    setIsModalOpen(true);
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
          onSubmit={values => {
            console.log(values);
            setIsModalOpen(false);
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Wrapper>
  );
};

type ChangePasswordModalProps = {
  onSubmit: (values: PasswordForm) => void;
  onClose: () => void;
};

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ onSubmit, onClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordForm>({
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
          <button type="button" className="settings-page__modal-close" onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </div>

        <form
          className="settings-page__modal-form"
          onSubmit={handleSubmit(values => {
            if (values.password !== values.confirmPassword) {
              return;
            }
            onSubmit(values);
          })}>
          <label className="settings-page__modal-field">
            <span className="settings-page__modal-label">New Password</span>
            <Input
              type="password"
              placeholder="Enter new password"
              {...register('password', { required: true })}
              className={errors.password ? 'input--error' : ''}
            />
          </label>

          <label className="settings-page__modal-field">
            <span className="settings-page__modal-label">Confirm New Password</span>
            <Input
              type="password"
              placeholder="Confirm new password"
              {...register('confirmPassword', {
                required: true,
                validate: value => value === watch('password'),
              })}
              className={errors.confirmPassword ? 'input--error' : ''}
            />
            {confirmPasswordValue && errors.confirmPassword && (
              <span className="settings-page__modal-error">Passwords do not match</span>
            )}
          </label>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disableTitleAnimation
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
