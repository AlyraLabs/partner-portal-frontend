import Image from 'next/image';

import { useFormContext } from 'react-hook-form';

import Required from '../../../../../public/icons/required.svg';

import Error from '@/../public/icons/error.svg';
import { Icon, Input } from '@/components';
import type { IntegrationFormValues } from '@/validation/integrationSchemas';

export default function StepWallets() {
  const {
    register,
    formState: { errors },
  } = useFormContext<IntegrationFormValues>();

  return (
    <div className="integration-wizard__step">
      {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
      <h1 className="integration-wizard__title">// Add fee-collection wallets</h1>
      <hr />
      <div className="integration-wizard__subtitle-container">
        <p className="integration-wizard__subtitle">
          Make sure you enter the correct address, funds sent to an exchange may be lost.{' '}
          <a href="#" className="integration-wizard__link">
            Learn more
          </a>
        </p>
        <Error />
      </div>

      <div className="integration-wizard__form">
        <div className="integration-wizard__field">
          <label className="integration-wizard__field-label" htmlFor="evm">
            EVM
          </label>
          <Input
            id="evm"
            type="text"
            placeholder="0xdfaA....DSff"
            aria-invalid={!!errors.evmWallet || undefined}
            {...register('evmWallet')}
          />
          {errors.evmWallet && <div className="integration-wizard__error">{errors.evmWallet.message}</div>}
        </div>
        <div className="integration-wizard__field">
          <label className="integration-wizard__field-label" htmlFor="solana">
            Solana
          </label>
          <Input
            id="solana"
            type="text"
            placeholder="0xdfaA....DSff"
            aria-invalid={!!errors.solanaWallet || undefined}
            {...register('solanaWallet')}
          />
          {errors.solanaWallet && <div className="integration-wizard__error">{errors.solanaWallet.message}</div>}
        </div>
      </div>
    </div>
  );
}
