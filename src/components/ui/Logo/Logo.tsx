import React from "react";
import "./Logo.scss";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = "md", className = "" }) => {
  return (
    <div className={`logo logo--${size} ${className}`.trim()}>
      <div className="logo__icon">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="currentColor" />
          <path
            d="M8 12h16v2H8v-2zm0 4h16v2H8v-2zm0 4h12v2H8v-2z"
            fill="white"
          />
        </svg>
      </div>
      <span className="logo__text">BLACKHOLE PORTAL</span>
    </div>
  );
};
