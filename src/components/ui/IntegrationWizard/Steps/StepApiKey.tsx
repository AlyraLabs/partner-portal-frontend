import { useFormContext } from 'react-hook-form';

import { Icon, Input } from '@/components';
import type { IntegrationFormValues } from '@/validation/integrationSchemas';

type Props = {
  apiKeyMasked: string;
  onCopy: (text: string) => void;
};

export default function StepApiKey({ apiKeyMasked, onCopy }: Props) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<IntegrationFormValues>();

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
              value={apiKeyMasked}
              readOnly
              className="integration-wizard__api-key-input"
            />
            <div className="integration-wizard__copy-btn" onClick={() => onCopy(apiKeyMasked)}>
              <Icon name="copy" size="md" />
            </div>
          </div>
        </div>

        <p className="integration-wizard__confirm-text">
          Type <span>&quot;I SAVED IT&quot;</span> to confirm
        </p>

        <div className="integration-wizard__field">
          <Input
            id="confirmation"
            type="text"
            placeholder="I SAVED IT"
            aria-invalid={!!errors.confirmation || undefined}
            {...register('confirmation')}
            onChange={e => {
              setValue('confirmation', e.target.value as never, { shouldValidate: true });
            }}
          />
          {errors.confirmation && <div className="integration-wizard__error">{errors.confirmation.message}</div>}
        </div>
      </div>
    </div>
  );
}
