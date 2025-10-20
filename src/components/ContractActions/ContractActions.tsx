'use client';

import React, { useState } from 'react';

import './ContractActions.scss';

import { Button } from '@/components';
import { NetworkSwitcher } from '@/components/NetworkSwitcher';
import { useWallet } from '@/contexts/WalletContext';
import { CHAIN_IDS, getFeeCollectorAddress, USDC_ARBITRUM } from '@/contracts/constants';
import { useFeeCollectorService } from '@/services/FeeCollectorService';

export const ContractActions: React.FC = () => {
  const { isEVMConnected, evmAddress, evmChainId } = useWallet();
  const feeCollectorService = useFeeCollectorService();
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState<string | null>(null);

  // Get contract address for current chain
  const contractAddress = evmChainId ? getFeeCollectorAddress(evmChainId as CHAIN_IDS) : null;

  const handleWithdraw = async () => {
    if (!feeCollectorService || !evmAddress) {
      alert('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Withdrawing integrator fees for token:', USDC_ARBITRUM);
      console.log('Integrator address:', evmAddress);

      // Call real contract method
      const tx = await feeCollectorService.withdrawIntegratorFees(USDC_ARBITRUM);

      console.log('Transaction hash:', tx.hash);
      alert(
        `Withdraw transaction sent! Hash: ${tx.hash}\n\nNote: If you have no fees to withdraw, the transaction will still succeed but won't transfer any tokens.`
      );
    } catch (error) {
      console.error('Withdraw failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(
        `Withdraw failed: ${errorMessage}\n\nThis might happen if you have no fees to withdraw or if the contract doesn't allow withdrawals.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetBalance = async () => {
    if (!feeCollectorService || !evmAddress) {
      alert('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Getting token balance for integrator:', evmAddress);
      console.log('Token address:', USDC_ARBITRUM);

      // Call real contract method to get balance from mapping
      const balance = await feeCollectorService.getTokenBalance(evmAddress, USDC_ARBITRUM);

      // Convert from wei to readable format
      const balanceInWei = balance.toString();
      setBalance(balanceInWei);

      // Convert to USDC (6 decimals)
      const balanceInUSDC = (parseInt(balanceInWei) / 1e6).toFixed(6);

      console.log('Token balance retrieved:', balanceInWei);

      if (balanceInWei === '0') {
        alert(
          `Token balance: ${balanceInWei} wei (${balanceInUSDC} USDC)\n\nNote: This means your address is not found in the contract's _balances mapping. This is normal if you haven't collected any fees yet.`
        );
      } else {
        alert(`Token balance: ${balanceInWei} wei (${balanceInUSDC} USDC)`);
      }
    } catch (error) {
      console.error('Get balance failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Get balance failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isEVMConnected || !evmAddress) {
    return null;
  }

  // Check if current chain is supported
  const isSupportedChain = evmChainId && [1, 56, 137, 42161, 10, 324].includes(evmChainId);

  return (
    <div className="contract-actions">
      <div className="contract-actions__header">
        <h3>FeeCollector Contract Actions</h3>
        <NetworkSwitcher />
      </div>

      <div className="contract-actions__info">
        <p>
          Connected: {evmAddress.slice(0, 6)}...{evmAddress.slice(-4)}
        </p>
        <p>Chain ID: {evmChainId}</p>
        <p>
          Contract: {contractAddress?.slice(0, 6)}...{contractAddress?.slice(-4)}
        </p>
        <p>Token: USDC (Arbitrum) - {USDC_ARBITRUM}</p>
      </div>

      {!isSupportedChain && (
        <div className="contract-actions__warning">
          <p>
            ⚠️ Current chain (ID: {evmChainId}) is not supported. Please switch to Arbitrum, BSC, Polygon, Optimism, or
            Polygon zkEVM.
          </p>
        </div>
      )}

      <div className="contract-actions__buttons">
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={handleWithdraw}
          loading={isLoading}
          className="contract-actions__button">
          Withdraw Integrator Fees
        </Button>

        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={handleGetBalance}
          loading={isLoading}
          className="contract-actions__button">
          Get Token Balance
        </Button>
      </div>

      {balance && (
        <div className="contract-actions__balance">
          <p>Token Balance: {balance} wei</p>
          <p>
            Balance (USDC): {(BigInt(balance) / BigInt(1e6)).toString()}.
            {((BigInt(balance) % BigInt(1e6)) / BigInt(1e3)).toString().padStart(3, '0')} USDC
          </p>
        </div>
      )}
    </div>
  );
};
