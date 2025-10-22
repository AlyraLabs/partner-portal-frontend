import { useFormContext } from 'react-hook-form';

import Error from '@/../public/icons/error.svg';
import Required from '@/../public/icons/required.svg';
import { Input } from '@/components';
import type { IntegrationFormValues } from '@/validation/integrationSchemas';

export default function StepCreateString() {
  const {
    register,
    formState: { errors },
  } = useFormContext<IntegrationFormValues>();

  return (
    <div className="integration-wizard__step">
      {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
      <h1 className="integration-wizard__title">// Create your String</h1>
      <hr />
      <div className="integration-wizard__subtitle-container">
        <p className="integration-wizard__subtitle">
          Your string is permanent and will serve as your name across all chains and apps.{' '}
          <a className="integration-wizard__link" href="https://dashboard.galxe.com/overview?space=83850">
            Learn more
          </a>
        </p>
        <Error />
      </div>

      <div className="integration-wizard__form">
        <div className="integration-wizard__field">
          <label className="integration-wizard__field-label" htmlFor="string">
            String
            <Required />
          </label>
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
