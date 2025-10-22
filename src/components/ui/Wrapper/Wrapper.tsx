'use client';

import React from 'react';

import './Wrapper.scss';

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const Wrapper: React.FC<WrapperProps> = ({ children, className = '' }) => {
  return (
    <div className={`logged-in-wrapper ${className}`.trim()}>
      <main className="logged-in-wrapper__content">
        <div className="logged-in-wrapper__container">{children}</div>
      </main>
    </div>
  );
};
