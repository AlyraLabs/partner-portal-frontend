'use client';

import React from 'react';

import { ConnectWalletButton } from '@components/ConnectWalletButton';
import { ContractActions } from '@components/ContractActions';

import './FeesPage.scss';

import { Wrapper } from '@/components';

export const FeesPage: React.FC = () => {
  return (
    <Wrapper>
      <div className="fees-page">
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
        <p className="fees-page__title">// WALLETS</p>
        <hr />
        <div className="fees-page__content">
          <ConnectWalletButton variant="secondary" size="lg" className="wallet-button" />
          <hr />
          <div className="fees-page__contract-actions">
            {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
            <p className="fees-page__title">// AVAILABLE FEES</p>
            <ContractActions />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
