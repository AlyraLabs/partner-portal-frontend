'use client';

import React, { useState } from 'react';

import './DangerZonePage.scss';

import { Button, Wrapper } from '@/components';

export const DangerZonePage: React.FC = () => {
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      // TODO: hook up to API once backend endpoint is ready
      await new Promise(resolve => setTimeout(resolve, 800));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <div className="danger-zone-page">
        <header className="danger-zone-page__header">
          {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
          <p className="danger-zone-page__title">// DANGER ZONE</p>
          <hr className="danger-zone-page__divider" />
        </header>

        <section className="danger-zone-page__body">
          <div className="danger-zone-page__info">
            <p className="danger-zone-page__info-title">Delete Organization</p>
            <p className="danger-zone-page__info-description">
              Your organization will be deleted and cannot be restored. This action is irreversible.
            </p>
          </div>

          <div className="danger-zone-page__form">
            <label className="danger-zone-page__info-title" htmlFor="delete-reason">
              Reason for Delete
            </label>
            <textarea
              id="delete-reason"
              className="danger-zone-page__textarea"
              placeholder="We would like to know why you want to delete your organization."
              value={reason}
              onChange={event => setReason(event.target.value)}
            />

            <Button
              variant="primary"
              size="lg"
              disableTitleAnimation
              className="danger-zone-page__delete-btn"
              onClick={handleDelete}
              loading={isSubmitting}>
              Delete Organization
            </Button>
          </div>
        </section>
      </div>
    </Wrapper>
  );
};
