'use client';

import React from 'react';

import './BugReportPage.scss';

import { NoDataYet, Wrapper } from '@/components';

export const BugReportPage: React.FC = () => {
  return (
    <Wrapper>
      <div className="bug-report-page">
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
        <p className="bug-report-page__title">// BUG REPORT</p>
        <div className="bug-report-page__content">
          <NoDataYet />
        </div>
      </div>
    </Wrapper>
  );
};
