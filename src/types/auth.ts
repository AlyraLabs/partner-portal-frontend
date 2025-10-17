export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
}
