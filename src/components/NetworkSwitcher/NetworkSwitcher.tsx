'use client';

import React, { useState } from 'react';

import { X } from 'lucide-react';

import './NetworkSwitcher.scss';

import { Button } from '@/components';
import { useWallet } from '@/contexts/WalletContext';
import { CHAIN_IDS } from '@/contracts/constants';

interface Network {
  id: number;
  name: string;
  symbol: string;
  rpcUrl: string;
}

const SUPPORTED_NETWORKS: Network[] = [
  { id: CHAIN_IDS.ARBITRUM, name: 'Arbitrum', symbol: 'ETH', rpcUrl: 'https://arb1.arbitrum.io/rpc' },
  { id: CHAIN_IDS.BSC, name: 'BSC', symbol: 'BNB', rpcUrl: 'https://bsc-dataseed.binance.org' },
  { id: CHAIN_IDS.POLYGON, name: 'Polygon', symbol: 'MATIC', rpcUrl: 'https://polygon-rpc.com' },
  { id: CHAIN_IDS.OPTIMISM, name: 'Optimism', symbol: 'ETH', rpcUrl: 'https://mainnet.optimism.io' },
];

export const NetworkSwitcher: React.FC = () => {
  const { isEVMConnected, evmChainId, switchNetwork, disconnect } = useWallet();
  const [isOpen, setIsOpen] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);

  const currentNetwork = SUPPORTED_NETWORKS.find(network => network.id === evmChainId);
  const isCurrentNetworkSupported = currentNetwork !== undefined;

  const handleNetworkSwitch = async (chainId: number) => {
    if (!isEVMConnected) {
      console.warn('Cannot switch network: wallet is not connected');
      return;
    }

    if (evmChainId === chainId) {
      setIsOpen(false);
      return;
    }

    setIsSwitching(true);
    try {
      await switchNetwork(chainId);
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to switch network:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      if (errorMessage.includes('user rejected') || errorMessage.includes('User rejected')) {
        alert('Network switch was cancelled by user');
      } else if (errorMessage.includes('not added') || errorMessage.includes('not configured')) {
        alert(`Network is not added to your wallet. Please add it manually in your wallet settings.`);
      } else {
        alert(`Failed to switch network: ${errorMessage}`);
      }
    } finally {
      setIsSwitching(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error('Failed to disconnect:', error);
      alert(`Failed to disconnect: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  if (!isEVMConnected) {
    return null;
  }

  return (
    <div className="network-switcher">
      <div className="network-switcher__current">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="network-switcher__button"
          disabled={isSwitching}>
          {currentNetwork ? <>{currentNetwork.name}</> : <>Chain {evmChainId}</>}
        </Button>
      </div>

      {isOpen && (
        <div className="network-switcher__dropdown">
          <div className="network-switcher__header">
            <h4>Switch Network</h4>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="network-switcher__close"
              aria-label="Close network switcher">
              <X size={16} aria-hidden="true" />
            </Button>
          </div>

          {!isCurrentNetworkSupported && (
            <div className="network-switcher__warning">
              <p>Current network is not supported. Please switch to a supported network.</p>
            </div>
          )}

          <div className="network-switcher__networks">
            {SUPPORTED_NETWORKS.map(network => (
              <button
                key={network.id}
                type="button"
                className={`network-switcher__network ${
                  network.id === evmChainId ? 'network-switcher__network--active' : ''
                }`}
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log(`Network button clicked: ${network.name} (${network.id})`);
                  handleNetworkSwitch(network.id);
                }}
                disabled={isSwitching || network.id === evmChainId}>
                <div className="network-switcher__network-info">
                  <span className="network-switcher__network-name">{network.name}</span>
                  <span className="network-switcher__network-symbol">{network.symbol}</span>
                </div>
                {network.id === evmChainId && <span className="network-switcher__network-status">Current</span>}
              </button>
            ))}
          </div>

          <div className="network-switcher__footer">
            <Button variant="secondary" size="sm" onClick={handleDisconnect} className="network-switcher__disconnect">
              Disconnect Wallet
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
