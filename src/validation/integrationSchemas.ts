import { z } from 'zod';

const optionalEvm = z
  .string()
  .trim()
  .optional()
  .or(z.literal(''))
  .refine(v => !v || /^0x[a-fA-F0-9]{40}$/.test(v), { message: 'Invalid EVM address' });

const optionalSui = z
  .string()
  .trim()
  .optional()
  .or(z.literal(''))
  .refine(v => !v || /^0x[a-fA-F0-9]{64}$/.test(v), { message: 'Invalid Sui address (0x + 64 hex)' });

const optionalSolana = z
  .string()
  .trim()
  .optional()
  .or(z.literal(''))
  .refine(v => !v || /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(v), {
    message: 'Invalid Solana address (base58)',
  });

export const integrationSchema = z.object({
  string: z
    .string()
    .trim()
    .min(3, 'String must be at least 3 characters')
    .max(32)
    .regex(/^[a-z0-9](?:[a-z0-9-_]*[a-z0-9])?$/i, 'Use letters, numbers, - or _, no spaces'),

  evmWallet: optionalEvm,
  solanaWallet: optionalSolana,
  suiWallet: optionalSui,

  confirmation: z.literal('I SAVED IT', {
    message: 'Type "I SAVED IT" to confirm',
  }),
});
export type IntegrationFormValues = z.infer<typeof integrationSchema>;
