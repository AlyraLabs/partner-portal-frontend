'use client';

import React from 'react';

import { useIntegrations } from '@context/IntegrationContext';

import { IntegrationWizard } from '@components/ui/IntegrationWizard';

import './AddIntegrationPage.scss';

import { Wrapper } from '@/components';
import { CreateIntegrationDto } from '@/types';

export const AddIntegrationPage: React.FC = () => {
  const { createIntegration } = useIntegrations();

  const handleIntegrationComplete = async (data: CreateIntegrationDto) => {
    await createIntegration({
      string: data.string as string,
    });
  };

  return (
    <Wrapper>
      <div className="add-integration-page">
        <IntegrationWizard onComplete={handleIntegrationComplete} />
      </div>
    </Wrapper>
  );
};
