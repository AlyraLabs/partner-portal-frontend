'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { IntegrationWizard } from '../../ui/IntegrationWizard';
import { LoggedInWrapper } from '../../ui/LoggedInWrapper';

import './AddIntegrationPage.scss';

// Define the integration data type
interface IntegrationData {
  name: string;
  website?: string;
  string: string;
  evmWallet: string;
  solanaWallet: string;
  suiWallet: string;
  apiKeyConfirmed: boolean;
}

export const AddIntegrationPage: React.FC = () => {
  const router = useRouter();

  const handleIntegrationComplete = (data: IntegrationData) => {
    console.log('Integration created:', data);
    // Redirect to dashboard after successful creation
    router.push('/dashboard');
  };

  const handleCancel = () => {
    // Redirect back to dashboard on cancel
    router.push('/dashboard');
  };

  return (
    <LoggedInWrapper>
      <div className="add-integration-page">
        <IntegrationWizard onComplete={handleIntegrationComplete} onCancel={handleCancel} />
      </div>
    </LoggedInWrapper>
  );
};
