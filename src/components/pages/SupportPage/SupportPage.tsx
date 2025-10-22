'use client';

import React from 'react';

import './SupportPage.scss';

import { NoDataYet, Wrapper } from '@/components';

export const SupportPage: React.FC = () => {
  return (
    <Wrapper>
      <div className="support-page">
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
        <p className="support-page__title">// SUPPORT</p>
        <div className="support-page__content">
          <NoDataYet />
        </div>
      </div>
    </Wrapper>
  );
};
