'use client';

import React from 'react';

import { IntegrationWizard } from '@components/ui/IntegrationWizard';
import { useIntegrations } from '@hooks/useIntegrations';

import './AddIntegrationPage.scss';

import { LoggedInWrapper } from '@/components';
import { CreateIntegrationDto } from '@/types';

export const AddIntegrationPage: React.FC = () => {
  const { createIntegration } = useIntegrations();

  const handleIntegrationComplete = (data: CreateIntegrationDto) => {
    createIntegration.mutate(data);
  };

  return (
    <LoggedInWrapper>
      <div className="add-integration-page">
        <IntegrationWizard onComplete={handleIntegrationComplete} />
      </div>
    </LoggedInWrapper>
  );
};
