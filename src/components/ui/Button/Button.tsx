import React from "react";
import "./Button.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  loading = false,
  children,
  className = "",
  disabled,
  ...props
}) => {
  const buttonClass = `btn btn--${variant} btn--${size} ${className}`.trim();

  return (
    <button className={buttonClass} disabled={disabled || loading} {...props}>
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
