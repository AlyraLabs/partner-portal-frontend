'use client';

import React, { useState } from 'react';

import { useIntegrations } from '../../../hooks/useIntegrations';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Input } from '../Input';

import './IntegrationWizard.scss';

interface IntegrationData {
  name: string;
  website?: string;
  string: string;
  evmWallet: string;
  solanaWallet: string;
  suiWallet: string;
  apiKeyConfirmed: boolean;
}

interface IntegrationWizardProps {
  onComplete?: (data: IntegrationData) => void;
  onCancel?: () => void;
}

export const IntegrationWizard: React.FC<IntegrationWizardProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<IntegrationData>({
    name: '',
    website: '',
    string: '',
    evmWallet: '',
    solanaWallet: '',
    suiWallet: '',
    apiKeyConfirmed: false,
  });

  const { createIntegration, isCreating, hasExistingIntegrations, integrationCount } = useIntegrations();

  const updateData = (field: keyof IntegrationData, value: string | boolean) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const skipStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleComplete = async () => {
    try {
      // Prepare data for API call
      const createIntegrationDto = {
        name: data.name,
        website: data.website,
        string: data.string,
        evmWallet: data.evmWallet || undefined,
        solanaWallet: data.solanaWallet || undefined,
        suiWallet: data.suiWallet || undefined,
        apiKeyConfirmed: data.apiKeyConfirmed,
      };

      // Create integration via API
      const newIntegration = await createIntegration(createIntegrationDto);

      console.log('Integration created successfully:', newIntegration);

      // Call the original onComplete callback with the form data
      onComplete?.(data);

      // You could also redirect to dashboard here
      // window.location.href = '/dashboard';
    } catch (error) {
      console.error('Failed to create integration:', error);
      // Handle error - maybe show a toast notification
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="integration-wizard__step">
            <h1 className="integration-wizard__title">
              {hasExistingIntegrations ? `Create integration ${integrationCount + 1}` : 'Create your first integration'}
            </h1>

            {hasExistingIntegrations && (
              <p className="integration-wizard__subtitle">
                You currently have {integrationCount} integration{integrationCount !== 1 ? 's' : ''}.
              </p>
            )}

            <div className="integration-wizard__form">
              <div className="integration-wizard__field">
                <Input
                  id="name"
                  type="text"
                  placeholder="Name"
                  value={data.name}
                  onChange={e => updateData('name', e.target.value)}
                />
              </div>

              <div className="integration-wizard__field">
                <Input
                  id="website"
                  type="url"
                  placeholder="Website (optional)"
                  value={data.website}
                  onChange={e => updateData('website', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="integration-wizard__step">
            <h1 className="integration-wizard__title">Create your String</h1>
            <p className="integration-wizard__subtitle">
              Your string is permanent and will serve as your name across all chains and apps.
            </p>

            <div className="integration-wizard__form">
              <div className="integration-wizard__field">
                <Input
                  id="name-display"
                  type="text"
                  value={data.name}
                  readOnly
                  className="integration-wizard__name-display"
                />
              </div>

              <div className="integration-wizard__field">
                <Input
                  id="string"
                  type="text"
                  placeholder="Create your own"
                  value={data.string}
                  onChange={e => updateData('string', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="integration-wizard__step">
            <h1 className="integration-wizard__title">Add fee-collection wallets</h1>
            <p className="integration-wizard__subtitle">
              Add a wallet to collect fees and sign transactions on all supported chains.{' '}
              <a href="#" className="integration-wizard__link">
                Learn more
              </a>
            </p>

            <div className="integration-wizard__form">
              <div className="integration-wizard__field">
                <div className="integration-wizard__wallet-field">
                  <Icon name="ethereum" size="md" className="integration-wizard__wallet-icon" />
                  <Input
                    id="evm"
                    type="text"
                    placeholder="EVM"
                    value={data.evmWallet}
                    onChange={e => updateData('evmWallet', e.target.value)}
                  />
                </div>
              </div>

              <div className="integration-wizard__field">
                <div className="integration-wizard__wallet-field">
                  <Icon name="solana" size="md" className="integration-wizard__wallet-icon" />
                  <Input
                    id="solana"
                    type="text"
                    placeholder="Solana"
                    value={data.solanaWallet}
                    onChange={e => updateData('solanaWallet', e.target.value)}
                  />
                </div>
              </div>

              <div className="integration-wizard__field">
                <div className="integration-wizard__wallet-field">
                  <Icon name="sui" size="md" className="integration-wizard__wallet-icon" />
                  <Input
                    id="sui"
                    type="text"
                    placeholder="Sui"
                    value={data.suiWallet}
                    onChange={e => updateData('suiWallet', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <p className="integration-wizard__warning">
              Keep in mind that any wallet change requires submitting a{' '}
              <a href="#" className="integration-wizard__link">
                support
              </a>{' '}
              request.
            </p>
          </div>
        );

      case 3:
        return (
          <div className="integration-wizard__step">
            <h1 className="integration-wizard__title">Secure Your API Key</h1>
            <p className="integration-wizard__subtitle">
              Keep it safe and use only in backend or server scripts. Do not expose it in frontend.
            </p>

            <div className="integration-wizard__form">
              <div className="integration-wizard__field">
                <div className="integration-wizard__api-key-field">
                  <Input
                    id="apiKey"
                    type="text"
                    value="alyra_sk_****2f6d8f1e7c3b"
                    readOnly
                    className="integration-wizard__api-key-input"
                  />
                  <button className="integration-wizard__copy-btn" aria-label="Copy API key">
                    <Icon name="copy" size="sm" />
                  </button>
                </div>
              </div>

              <p className="integration-wizard__confirm-text">Type &quot;I SAVED IT&quot; to confirm</p>

              <div className="integration-wizard__field">
                <Input
                  id="confirmation"
                  type="text"
                  placeholder="I SAVED IT"
                  value={data.apiKeyConfirmed ? 'I SAVED IT' : ''}
                  onChange={e => updateData('apiKeyConfirmed', e.target.value === 'I SAVED IT')}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="integration-wizard">
      <div className="integration-wizard__container">
        <div className="integration-wizard__content">{renderStep()}</div>

        <div className="integration-wizard__actions">
          <div className="integration-wizard__next-section">
            {currentStep < 3 ? (
              <Button variant="primary" onClick={nextStep} className="integration-wizard__next-btn">
                Next step
                <Icon name="right-arrow" size="sm" />
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleComplete}
                disabled={!data.apiKeyConfirmed || isCreating}
                className="integration-wizard__complete-btn">
                {isCreating ? 'Creating...' : 'Confirm'}
                <Icon name="right-arrow" size="sm" />
              </Button>
            )}
          </div>

          {currentStep === 2 && (
            <div className="integration-wizard__skip-section">
              <button className="integration-wizard__skip-btn" onClick={skipStep}>
                Skip
                <Icon name="right-arrow" size="sm" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
