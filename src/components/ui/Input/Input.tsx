import React, { forwardRef } from "react";
import "./Input.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, helperText, leftIcon, rightIcon, className = "", ...props },
    ref
  ) => {
    const inputClass = `input ${
      error ? "input--error" : ""
    } ${className}`.trim();
    const wrapperClass = `input-wrapper ${
      leftIcon ? "input-wrapper--left-icon" : ""
    } ${rightIcon ? "input-wrapper--right-icon" : ""}`.trim();

    return (
      <div className="input-container">
        {label && (
          <label className="input-label" htmlFor={props.id}>
            {label}
          </label>
        )}
        <div className={wrapperClass}>
          {leftIcon && (
            <div className="input-icon input-icon--left">{leftIcon}</div>
          )}
          <input ref={ref} className={inputClass} {...props} />
          {rightIcon && (
            <div className="input-icon input-icon--right">{rightIcon}</div>
          )}
        </div>
        {error && <span className="input-error">{error}</span>}
        {helperText && !error && (
          <span className="input-helper">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
