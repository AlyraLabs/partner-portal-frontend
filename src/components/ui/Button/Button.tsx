'use client';

import React, { useEffect, useRef } from 'react';

import './Button.scss';

import { clearAnimationForElement, initializeTitleAnimation } from '@/services/title-animation.service';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
  disableTitleAnimation?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className = '',
  disabled,
  disableTitleAnimation = false,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonClass = `btn btn--${variant} btn--${size} ${className}`.trim();

  useEffect(() => {
    const buttonElement = buttonRef.current;
    if (!buttonElement) {
      return undefined;
    }

    if (disableTitleAnimation) {
      clearAnimationForElement(buttonElement);
      return undefined;
    }

    if (loading) {
      clearAnimationForElement(buttonElement);
      return undefined;
    }

    return initializeTitleAnimation(buttonElement);
  }, [children, loading, disableTitleAnimation]);

  return (
    <button ref={buttonRef} className={buttonClass} disabled={disabled || loading} {...props}>
      {loading ? (
        <div className="btn__spinner">
          <div className="spinner"></div>
        </div>
      ) : (
        children
      )}
    </button>
  );
};
