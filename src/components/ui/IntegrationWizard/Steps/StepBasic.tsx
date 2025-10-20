import { useFormContext } from 'react-hook-form';

import { Input } from '@/components';
import type { IntegrationFormValues } from '@/validation/integrationSchemas';

export default function StepBasicInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext<IntegrationFormValues>();

  return (
    <div className="integration-wizard__step">
      <div className="integration-wizard__form">
        <div className="integration-wizard__field">
          <Input
            id="name"
            type="text"
            placeholder="Name"
            aria-invalid={!!errors.name || undefined}
            {...register('name')}
          />
          {errors.name && <div className="integration-wizard__error">{errors.name.message}</div>}
        </div>

        <div className="integration-wizard__field">
          <Input
            id="website"
            type="url"
            placeholder="Website (optional)"
            aria-invalid={!!errors.website || undefined}
            {...register('website')}
          />
          {errors.website && <div className="integration-wizard__error">{errors.website.message}</div>}
        </div>
      </div>
    </div>
  );
}
