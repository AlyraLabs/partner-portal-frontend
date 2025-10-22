'use client';

import React from 'react';

import './SettingsPage.scss';

import { NoDataYet, Wrapper } from '@/components';

export const SettingsPage: React.FC = () => {
  return (
    <Wrapper>
      <div className="settings-page">
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
        <p className="settings-page__title">// SETTINGS</p>
        <div className="settings-page__content">
          <NoDataYet />
        </div>
      </div>
    </Wrapper>
  );
};
