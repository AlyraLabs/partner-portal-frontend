'use client';

import React from 'react';

import './FeesPage.scss';

import { NoDataYet, Wrapper } from '@/components';

export const FeesPage: React.FC = () => {
  return (
    <Wrapper>
      <div className="fees-page">
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
        <p className="fees-page__title">// FEES</p>
        <div className="fees-page__content">
          <NoDataYet />
        </div>
      </div>
    </Wrapper>
  );
};
