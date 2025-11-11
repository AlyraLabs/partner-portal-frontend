export interface LoginFormData {
  email: string;
  password: string;
  newUser?: boolean;
}

export interface User {
  id: string;
  email: string;
  username: string;
  companyName: string;
  createdAt: string;
  deletedAt: string | null;
  updatedAt: string | null;
  emailVerificationSession: string | null;
  emailVerificationToken: string | null;
  emailVerificationTokenExpiresAt: string | null;
  isActive: boolean;
  isEmailVerified: boolean;
  telegram: string | null;
  website: string | null;
}

export interface AuthState {
  user: User | null;
}
