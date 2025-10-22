'use client';

import React from 'react';

import './MembersPage.scss';

import { NoDataYet, Wrapper } from '@/components';

export const MembersPage: React.FC = () => {
  return (
    <Wrapper>
      <div className="members-page">
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
        <p className="members-page__title">// MEMBERS</p>
        <div className="members-page__content">
          <NoDataYet />
        </div>
      </div>
    </Wrapper>
  );
};
