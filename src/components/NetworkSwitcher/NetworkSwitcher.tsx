'use client';

import React, { useState } from 'react';

import { ChevronDown, Wifi, WifiOff } from 'lucide-react';

import './NetworkSwitcher.scss';

import { Button } from '@/components';
import { useWallet } from '@/contexts/WalletContext';

interface Network {
  id: number;
  name: string;
  symbol: string;
  rpcUrl: string;
}

const SUPPORTED_NETWORKS: Network[] = [
  { id: 1, name: 'Ethereum', symbol: 'ETH', rpcUrl: 'https://eth.llamarpc.com' },
  { id: 56, name: 'BSC', symbol: 'BNB', rpcUrl: 'https://bsc-dataseed.binance.org' },
  { id: 137, name: 'Polygon', symbol: 'MATIC', rpcUrl: 'https://polygon-rpc.com' },
  { id: 42161, name: 'Arbitrum', symbol: 'ETH', rpcUrl: 'https://arb1.arbitrum.io/rpc' },
  { id: 10, name: 'Optimism', symbol: 'ETH', rpcUrl: 'https://mainnet.optimism.io' },
  { id: 8453, name: 'Base', symbol: 'ETH', rpcUrl: 'https://mainnet.base.org' },
];

export const NetworkSwitcher: React.FC = () => {
  const { isEVMConnected, evmChainId, switchNetwork, disconnect } = useWallet();
  const [isOpen, setIsOpen] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);

  const currentNetwork = SUPPORTED_NETWORKS.find(network => network.id === evmChainId);

  const handleNetworkSwitch = async (chainId: number) => {
    if (!isEVMConnected) return;

    setIsSwitching(true);
    try {
      await switchNetwork(chainId);
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to switch network:', error);
      alert(`Failed to switch network: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
          <Wifi className="w-4 h-4 mr-2" />
          {currentNetwork ? (
            <>
              {currentNetwork.name}
              <ChevronDown className="w-4 h-4 ml-2" />
            </>
          ) : (
            <>
              Chain {evmChainId}
              <ChevronDown className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>

      {isOpen && (
        <div className="network-switcher__dropdown">
          <div className="network-switcher__header">
            <h4>Switch Network</h4>
            <Button variant="secondary" size="sm" onClick={() => setIsOpen(false)} className="network-switcher__close">
              ×
            </Button>
          </div>

          <div className="network-switcher__networks">
            {SUPPORTED_NETWORKS.map(network => (
              <button
                key={network.id}
                className={`network-switcher__network ${
                  network.id === evmChainId ? 'network-switcher__network--active' : ''
                }`}
                onClick={() => handleNetworkSwitch(network.id)}
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
              <WifiOff className="w-4 h-4 mr-2" />
              Disconnect Wallet
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
