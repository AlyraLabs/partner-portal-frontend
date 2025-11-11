'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { useAuthContext } from '@context/AuthContext';

import './IntegrationCard.scss';

import { Button, Icon } from '@/components';
import { Integration } from '@/types/integration';

interface IntegrationCardProps {
  integration: Integration;
  onEdit?: (id: string) => void;
}

export const IntegrationCard: React.FC<IntegrationCardProps> = ({ integration, onEdit }) => {
  const router = useRouter();
  const { user } = useAuthContext();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(integration.string);
      // You can add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(integration.id);
    } else {
      router.push(`/integrations/${integration.id}/edit`);
    }
  };

  return (
    <div className="integration-card">
      <div className="integration-card__logo">
        <div className="integration-card__logo-gradient"></div>
      </div>

      <div className="integration-card__content-wrapper">
        <div className="integration-card__header">
          <div className="integration-card__title">
            <h3>{integration.string.toUpperCase()}</h3>
          </div>

          {/*<Button variant="primary" size="sm" className="integration-card__edit-btn" onClick={handleEdit}>*/}
          {/*  EDIT*/}
          {/*  <Icon name="right-arrow" size="sm" />*/}
          {/*</Button>*/}
        </div>

        <div className="integration-card__fields">
          <div className="integration-card__field">
            <span className="integration-card__label">String</span>
            <div className="integration-card__value-with-copy">
              <span className="integration-card__value">{integration.string.toUpperCase()}</span>
              <button className="integration-card__copy-btn" onClick={handleCopy} aria-label="Copy string">
                <Icon name="copy" size="sm" />
              </button>
            </div>
          </div>
          {user?.website && (
            <div className="integration-card__field">
              <span className="integration-card__label">Website</span>
              <span className="integration-card__value">{user.website}</span>
            </div>
          )}

          <div className="integration-card__field">
            <span className="integration-card__label">Plan</span>
            <span className="integration-card__value">{integration.plan || 'Standard'}</span>
          </div>

          <div className="integration-card__field">
            <span className="integration-card__label">RPMs</span>
            <span className="integration-card__value">{integration.rpm || '100'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
