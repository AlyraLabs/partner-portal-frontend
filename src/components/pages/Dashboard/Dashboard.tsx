'use client';

import React from 'react';

import './Dashboard.scss';

import { NoDataYet, Wrapper } from '@/components';

export const Dashboard: React.FC = () => {
  return (
    <Wrapper>
      <div className="dashboard">
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
        <p className="dashboard__title">// DASHBOARD</p>
        <div className="dashboard__content">
          <NoDataYet />
        </div>
      </div>
    </Wrapper>
  );
};
