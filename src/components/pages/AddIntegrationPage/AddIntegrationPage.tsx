'use client';

import React from 'react';

import { useIntegrations } from '@context/IntegrationContext';

import { IntegrationWizard } from '@components/ui/IntegrationWizard';

import './AddIntegrationPage.scss';

import { LoggedInWrapper } from '@/components';
import { CreateIntegrationDto } from '@/types';

export const AddIntegrationPage: React.FC = () => {
  const { createIntegration } = useIntegrations();

  const handleIntegrationComplete = (data: CreateIntegrationDto) => {
    createIntegration({ string: data.string });
  };

  return (
    <LoggedInWrapper>
      <div className="add-integration-page">
        <IntegrationWizard onComplete={handleIntegrationComplete} />
      </div>
    </LoggedInWrapper>
  );
};
