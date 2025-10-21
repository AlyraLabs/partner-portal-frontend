'use client';

import React, { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import StepApiKey from './Steps/StepApiKey';
import StepCreateString from './Steps/StepCreateString';
import StepWallets from './Steps/StepWallets';

import './IntegrationWizard.scss';

import { Button, Icon } from '@/components';
import { type IntegrationFormValues, integrationSchema } from '@/validation/integrationSchemas';

type Props = {
  initialData?: Partial<IntegrationFormValues>;
  onComplete: (data: { string: string }) => Promise<void> | void;
};

const DEFAULTS: IntegrationFormValues = {
  string: '',
  evmWallet: '',
  solanaWallet: '',
  suiWallet: '',
  confirmation: '' as never,
};

const STEP_FIELDS: Record<number, (keyof IntegrationFormValues)[]> = {
  0: ['string'],
  1: ['evmWallet', 'solanaWallet', 'suiWallet'],
  2: ['confirmation'],
};

export function IntegrationWizard({ initialData, onComplete }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCreating, setIsCreating] = useState(false);

  const methods = useForm<IntegrationFormValues>({
    resolver: zodResolver(integrationSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: { ...DEFAULTS, ...initialData },
  });

  const nextStep = async () => {
    const fields = STEP_FIELDS[currentStep];
    const valid = await methods.trigger(fields, { shouldFocus: true });
    if (!valid) return;
    setCurrentStep(s => Math.min(2, s + 1));
  };

  const handleComplete = async () => {
    const valid = await methods.trigger(STEP_FIELDS[2], { shouldFocus: true });
    if (!valid) return;

    const values = methods.getValues();
    try {
      setIsCreating(true);
      // map confirmation -> apiKeyConfirmed true for your backend, if needed
      await onComplete({ string: values.string });
    } finally {
      setIsCreating(false);
    }
  };

  const skipStep = () => setCurrentStep(s => Math.min(2, s + 1));

  return (
    <FormProvider {...methods}>
      <form
        className="integration-wizard"
        onSubmit={e => {
          e.preventDefault();
          if (currentStep < 2) {
            nextStep();
          } else {
            handleComplete();
          }
        }}
        noValidate>
        <div className="integration-wizard__container">
          <div className="integration-wizard__content">
            {currentStep === 0 && <StepCreateString />}
            {currentStep === 1 && <StepWallets />}
            {currentStep === 2 && (
              <StepApiKey
                apiKeyMasked="alyra_sk_****2f6d8f1e7c3b"
                onCopy={text => navigator.clipboard?.writeText(text).catch(() => {})}
              />
            )}
          </div>

          <div className="integration-wizard__actions">
            {currentStep < 2 ? (
              <Button type="button" variant="primary" onClick={nextStep} className="integration-wizard__btn">
                Next step
                <Icon name="right-arrow" size="md" />
              </Button>
            ) : (
              <Button type="submit" variant="primary" disabled={isCreating} className="integration-wizard__btn">
                {isCreating ? 'Creating...' : 'Confirm'}
                <Icon name="right-arrow" size="md" />
              </Button>
            )}

            {currentStep === 1 && (
              <Button type="button" variant="secondary" className="integration-wizard__btn" onClick={skipStep}>
                Skip
                <Icon name="right-arrow-white" size="md" />
              </Button>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
