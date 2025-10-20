'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import { BottomNavigation } from '../BottomNavigation';
import { Header } from '../Header';

import './LoggedInWrapper.scss';

interface LoggedInWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const LoggedInWrapper: React.FC<LoggedInWrapperProps> = ({ children, className = '' }) => {
  const pathname = usePathname();
  return (
    <div className={`logged-in-wrapper ${className}`.trim()}>
      <Header />
      <main className="logged-in-wrapper__content">
        <div className="logged-in-wrapper__container">{children}</div>
      </main>
      {pathname !== '/new-integration' && <BottomNavigation />}
    </div>
  );
};
