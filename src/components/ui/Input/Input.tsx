import * as React from 'react';

import './Input.scss';

import Eye from '@/../public/icons/eye.svg';
import EyeClosed from '@/../public/icons/eye-closed.svg';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<HTMLInputElement>;
  showPassword?: boolean;
  toggleShowPassword?: () => void;
  disabled?: boolean;
  errorMessage?: string;
}

export function Input({
  className,
  type,
  ref,
  showPassword,
  toggleShowPassword,
  disabled,
  errorMessage,
  ...props
}: InputProps) {
  const hasShowPasswordControl = showPassword !== undefined && toggleShowPassword !== undefined;

  return (
    <div className="input-container">
      {errorMessage && <p className="input-error-message">{errorMessage}</p>}
      <div className="input-wrapper">
        <input type={type} className={`input ${className}`} ref={ref} disabled={disabled || undefined} {...props} />
        {hasShowPasswordControl && (
          <div
            className={`input-password-control ${disabled && 'input-password-control--disabled'}`}
            onClick={toggleShowPassword}>
            {showPassword ? <EyeClosed /> : <Eye />}
          </div>
        )}
      </div>
    </div>
  );
}
