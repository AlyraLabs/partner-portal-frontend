'use client';

import React, { useEffect, useState } from 'react';

import './ContractActions.scss';

import { Button } from '@/components';
import { useWallet } from '@/contexts/WalletContext';
import { CHAIN_IDS, getChainName, getFeeCollectorAddress, getPopularTokens } from '@/contracts/constants';
import { useFeeCollectorService } from '@/services/FeeCollectorService';

export const ContractActions: React.FC = () => {
  const { isEVMConnected, evmAddress, evmChainId } = useWallet();
  const feeCollectorService = useFeeCollectorService();
  const [isLoading, setIsLoading] = useState(false);
  const [, setBalance] = useState<string | null>(null);

  const isSupportedChain = React.useMemo(() => {
    if (!evmChainId) return false;
    try {
      getFeeCollectorAddress(evmChainId as CHAIN_IDS);
      return true;
    } catch {
      return false;
    }
  }, [evmChainId]);

  const handleWithdraw = async () => {
    if (!feeCollectorService || !evmAddress || !evmChainId) {
      return;
    }

    setIsLoading(true);
    try {
      const popularTokens = getPopularTokens(evmChainId as CHAIN_IDS);

      await feeCollectorService.batchWithdrawIntegratorFees(popularTokens);

      setTimeout(() => {
        handleGetBalance();
      }, 2000);
    } catch (error) {
      console.error('Batch withdraw failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.log(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetBalance = async () => {
    if (!feeCollectorService || !evmAddress || !evmChainId) {
      return;
    }

    setIsLoading(true);
    try {
      const popularTokens = getPopularTokens(evmChainId as CHAIN_IDS);
      const firstToken = popularTokens[0];

      // Call real contract method to get balance from mapping
      const balance = await feeCollectorService.getTokenBalance(evmAddress, firstToken);

      // Convert from wei to readable format
      const balanceInWei = balance.toString();

      // Convert to USDC (6 decimals)
      const balanceInUSDC = (parseInt(balanceInWei) / 1e6).toFixed(6);
      setBalance(balanceInUSDC);

      // if (balanceInWei === '0') {
      //   alert(
      //     `Token balance: ${balanceInWei} wei (${balanceInUSDC} USDC)\n\nNote: This means your address is not found in the contract's _balances mapping. This is normal if you haven't collected any fees yet.`
      //   );
      // } else {
      //   alert(`Token balance: ${balanceInWei} wei (${balanceInUSDC} USDC)`);
      // }
    } catch (error) {
      console.error('Get balance failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset balance when chain changes
  useEffect(() => {
    setBalance(null);
  }, [evmChainId]);

  // Load balance when chain, connection, or address changes
  useEffect(() => {
    if (isSupportedChain && isEVMConnected && evmAddress && feeCollectorService) {
      handleGetBalance();
    }
  }, [isEVMConnected, isSupportedChain, evmAddress, evmChainId, feeCollectorService]);

  if (!isEVMConnected || !evmAddress) {
    return null;
  }

  if (!isSupportedChain) {
    return (
      <div className="contract-actions">
        <div className="contract-actions__unsupported">
          <p>
            FeeCollector contract is not available on this network. Please switch to Arbitrum, BSC, Polygon, or
            Optimism.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="contract-actions">
      <table className="contract-actions__table">
        <thead>
          <tr>
            <th>CHAIN</th>
            {/* <th>COLLECTABLE FEES </th> */}
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="contract-actions__cell contract-actions__cell--chain" data-label="Chain">
              <p>
                {evmChainId
                  ? `${getChainName(evmChainId)} (${getPopularTokens(evmChainId as CHAIN_IDS).length} tokens)`
                  : 'Multiple Tokens'}
              </p>
            </td>

            {/* <td className="contract-actions__cell contract-actions__cell--amount" data-label="Collectable fees">
              {balance !== null ? `$${balance}` : '--'}
            </td> */}

            <td className="contract-actions__cell contract-actions__cell--action" data-label="Action">
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleWithdraw}
                loading={isLoading}
                className="contract-actions__button">
                WITHDRAW ALL FEES
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
