'use client';

import React, { useEffect, useState } from 'react';

import './ContractActions.scss';

import { Button } from '@/components';
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
      return;
    }

    setIsLoading(true);
    try {
      console.log('Withdrawing integrator fees for token:', USDC_ARBITRUM);
      console.log('Integrator address:', evmAddress);

      // Call real contract method
      const tx = await feeCollectorService.withdrawIntegratorFees(USDC_ARBITRUM);

      console.log('Transaction hash:', tx.hash);
    } catch (error) {
      console.error('Withdraw failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.log(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetBalance = async () => {
    if (!feeCollectorService || !evmAddress) {
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

      // if (balanceInWei === '0') {
      //   alert(
      //     `Token balance: ${balanceInWei} wei (${balanceInUSDC} USDC)\n\nNote: This means your address is not found in the contract's _balances mapping. This is normal if you haven't collected any fees yet.`
      //   );
      // } else {
      //   alert(`Token balance: ${balanceInWei} wei (${balanceInUSDC} USDC)`);
      // }
    } catch (error) {
      console.error('Get balance failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Get balance failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetBalance();
  }, [isEVMConnected]);

  if (!isEVMConnected || !evmAddress) {
    return null;
  }

  // Check if current chain is supported
  const isSupportedChain = evmChainId && [1, 56, 137, 42161, 10, 324].includes(evmChainId);

  return (
    <div className="contract-actions">
      <table className="contract-actions__table">
        <thead>
          <tr>
            <th>CHAIN</th>
            <th>COLLECTABLE FEES </th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <p>USDC (Arbitrum)</p>
            </td>

            <td>${balance}</td>

            <td style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleWithdraw}
                loading={isLoading}
                className="contract-actions__button">
                WITHDRAW FEES
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
