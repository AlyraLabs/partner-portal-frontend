import { useFormContext } from 'react-hook-form';

import Error from '@/../public/icons/error.svg';
import Key from '@/../public/icons/key.svg';
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
      {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
      <h1 className="integration-wizard__title">// Secure Your API Key</h1>
      <hr />
      <div className="integration-wizard__subtitle-container">
        <p className="integration-wizard__subtitle">
          Keep it safe and use only in backend or server scripts. Do not expose it in frontend.
        </p>
        <Error />
      </div>

      <div className="integration-wizard__form">
        <div className="integration-wizard__field">
          <label className="integration-wizard__field-label" htmlFor="apiKey">
            API Key
          </label>
          <div className="integration-wizard__api-key-field">
            <div className="integration-wizard__api-key-icon">
              <Key />
            </div>
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

        <div className="integration-wizard__field">
          <label className="integration-wizard__field-label integration-wizard__confirm-text" htmlFor="confirmation">
            Type <span>&quot;I SAVED&quot;</span> to confirm
          </label>
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
