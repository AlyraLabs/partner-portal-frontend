'use client';

import React from 'react';

import { useIntegrations } from '@context/IntegrationContext';

import { IntegrationWizard } from '@components/ui/IntegrationWizard';

import './AddIntegrationPage.scss';

import { LoggedInWrapper } from '@/components';
import { IntegrationFormValues } from '@/validation/integrationSchemas';

export const AddIntegrationPage: React.FC = () => {
  const { createIntegration } = useIntegrations();

  const handleIntegrationComplete = (data: IntegrationFormValues) => {
    createIntegration({
      string: data.string,
    });
  };

  return (
    <LoggedInWrapper>
      <div className="add-integration-page">
        <IntegrationWizard onComplete={handleIntegrationComplete} />
      </div>
    </LoggedInWrapper>
  );
};
