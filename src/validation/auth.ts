import { z } from 'zod';

const websiteRegex = /^(https?:\/\/)?(www\.)?([\w-]+\.)+[\w-]{2,}(\/[^\s]*)?$/;

export const registerSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, 'Username must be at least 3 characters')
      .max(32, 'Username must be at most 32 characters')
      .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),

    companyName: z
      .string()
      .trim()
      .min(2, 'Company name must be at least 2 characters')
      .max(100, 'Company name must be at most 100 characters'),

    email: z.email('Invalid email address').trim().min(1, 'Email is required'),

    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(128, 'Password must be at most 128 characters'),

    confirmPassword: z.string().min(1, 'Please confirm your password'),

    telegram: z.string().optional(),

    website: z
      .string()
      .trim()
      .optional()
      .refine(value => !value || websiteRegex.test(value), 'Invalid website URL'),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const verificationSchema = z.object({
  code: z.string().min(6, 'Code must be at least 6 characters').regex(/^\d+$/, 'Code must contain only numbers'),
});

export type VerificationFormData = z.infer<typeof verificationSchema>;
