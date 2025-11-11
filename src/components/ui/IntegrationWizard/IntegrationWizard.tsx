'use client';

import React, { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import Corners from '@components/ui/Corners/Corners';

import StepApiKey from './Steps/StepApiKey';
import StepCreateString from './Steps/StepCreateString';
import StepWallets from './Steps/StepWallets';

import './IntegrationWizard.scss';

import { Button, Icon } from '@/components';
import { CreateIntegrationDto } from '@/types';
import { type IntegrationFormValues, integrationSchema } from '@/validation/integrationSchemas';

type Props = {
  initialData?: Partial<IntegrationFormValues>;
  onComplete: (data: CreateIntegrationDto) => Promise<void>;
};

const DEFAULTS: IntegrationFormValues = {
  string: '',
  evmWallet: '',
  solanaWallet: '',
  confirmation: '' as never,
};

const STEP_FIELDS: Record<number, (keyof IntegrationFormValues)[]> = {
  0: ['string'],
  1: ['evmWallet', 'solanaWallet'],
  2: ['confirmation'],
};

export function IntegrationWizard({ initialData, onComplete }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCreating, setIsCreating] = useState(false);
  const [apiKey, setApiKey] = useState('');

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
      await onComplete({
        string: values.string,
        evmWallet: values.evmWallet,
        solanaWallet: values.solanaWallet,
        apiKey: apiKey,
      });
    } finally {
      setIsCreating(false);
    }
  };

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
            <Corners />
            {currentStep === 0 && <StepCreateString />}
            {currentStep === 1 && <StepWallets />}
            {currentStep === 2 && (
              <StepApiKey
                setApiKey={(key: string) => setApiKey(key)}
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
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
