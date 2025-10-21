'use client';

import React from 'react';

import { Icon } from '../Icon';

import './Header.scss';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`header ${className}`.trim()}>
      <div className="header__main">
        <div className="header__brand">
          <Icon name="logo" size="xl" className="header__logo" />
          <span className="header__brand-text">Alyra</span>
        </div>
        <div></div>
      </div>
    </header>
  );
};
