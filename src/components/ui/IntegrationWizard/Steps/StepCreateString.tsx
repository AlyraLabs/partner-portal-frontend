import { useFormContext } from 'react-hook-form';

import { Input } from '@/components';
import type { IntegrationFormValues } from '@/validation/integrationSchemas';

type Props = { nameDisplay: string };

export default function StepCreateString({ nameDisplay }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<IntegrationFormValues>();

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
            value={nameDisplay}
            readOnly
            className="integration-wizard__name-display"
          />
        </div>

        <div className="integration-wizard__field">
          <Input
            id="string"
            type="text"
            placeholder="Create your own"
            aria-invalid={!!errors.string || undefined}
            {...register('string')}
          />
          {errors.string && <div className="integration-wizard__error">{errors.string.message}</div>}
        </div>
      </div>
    </div>
  );
}
