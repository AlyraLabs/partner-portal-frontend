'use client';

import React from 'react';

import './AnalyticsPage.scss';

import { NoDataYet, Wrapper } from '@/components';

export const AnalyticsPage: React.FC = () => {
  return (
    <Wrapper>
      <div className="analytics-page">
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
        <p className="analytics-page__title">// ANALYTICS</p>
        <div className="analytics-page__content">
          <NoDataYet />
        </div>
      </div>
    </Wrapper>
  );
};
