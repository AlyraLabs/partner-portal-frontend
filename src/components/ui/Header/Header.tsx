'use client';

import React from 'react';

import { Icon } from '../Icon';

import './Header.scss';

interface HeaderProps {
  className?: string;
}

export function Header({ className = '' }: HeaderProps) {
  return (
    <header className={`header ${className}`.trim()}>
      <div className="header__main">
        <div className="header__brand">
          <Icon name="logo" size="xl" className="header__logo" />
          <span className="header__brand-text">Alyra</span>
        </div>
        <p className="header__beta-text">BETA</p>
      </div>
    </header>
  );
}
