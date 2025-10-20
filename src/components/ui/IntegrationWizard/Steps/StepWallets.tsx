import Image from 'next/image';

import { useFormContext } from 'react-hook-form';

import { Icon, Input } from '@/components';
import type { IntegrationFormValues } from '@/validation/integrationSchemas';

export default function StepWallets() {
  const {
    register,
    formState: { errors },
  } = useFormContext<IntegrationFormValues>();

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
            <Image src="/icons/evm.png" width={30} height={30} className="integration-wizard__wallet-icon" alt="" />
            <Input
              id="evm"
              type="text"
              placeholder="EVM"
              aria-invalid={!!errors.evmWallet || undefined}
              {...register('evmWallet')}
            />
          </div>
          {errors.evmWallet && <div className="integration-wizard__error">{errors.evmWallet.message}</div>}
        </div>

        <div className="integration-wizard__field">
          <div className="integration-wizard__wallet-field">
            <Image src="/icons/solana.png" width={30} height={30} className="integration-wizard__wallet-icon" alt="" />
            <Input
              id="solana"
              type="text"
              placeholder="Solana"
              aria-invalid={!!errors.solanaWallet || undefined}
              {...register('solanaWallet')}
            />
          </div>
          {errors.solanaWallet && <div className="integration-wizard__error">{errors.solanaWallet.message}</div>}
        </div>

        <div className="integration-wizard__field">
          <div className="integration-wizard__wallet-field">
            <Image src="/icons/sui.png" width={30} height={30} className="integration-wizard__wallet-icon" alt="" />
            <Input
              id="sui"
              type="text"
              placeholder="Sui"
              aria-invalid={!!errors.suiWallet || undefined}
              {...register('suiWallet')}
            />
          </div>
          {errors.suiWallet && <div className="integration-wizard__error">{errors.suiWallet.message}</div>}
        </div>
      </div>

      <p className="integration-wizard__subtitle" style={{ marginTop: '32px' }}>
        Keep in mind that any wallet change requires submitting a{' '}
        <a href="#" className="integration-wizard__link">
          support
        </a>{' '}
        request.
      </p>
    </div>
  );
}
