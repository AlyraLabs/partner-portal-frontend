'use client';

import React from 'react';

import './DangerZonePage.scss';

import { NoDataYet, Wrapper } from '@/components';

export const DangerZonePage: React.FC = () => {
  return (
    <Wrapper>
      <div className="danger-zone-page">
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
        <p className="danger-zone-page__title">// DANGER ZONE</p>
        <div className="danger-zone-page__content">
          <NoDataYet />
        </div>
      </div>
    </Wrapper>
  );
};
