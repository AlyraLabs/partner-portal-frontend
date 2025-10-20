'use client';

import React from 'react';

import { Wallet, Zap } from 'lucide-react';

import './ConnectWalletButton.scss';

import { Button } from '@/components';
import { useWallet } from '@/contexts/WalletContext';

interface ConnectWalletButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const { isEVMConnected, evmAddress, isSolanaConnected, solanaAddress, connectEVM, connectSolana, disconnect } =
    useWallet();

  const isAnyConnected = isEVMConnected || isSolanaConnected;

  const handleConnect = () => {
    if (isAnyConnected) {
      disconnect();
    } else {
      // Show connection options
      const choice = window.confirm(
        'Choose wallet type:\n\nOK - Connect EVM Wallet (MetaMask, WalletConnect, etc.)\nCancel - Connect Solana Wallet (Phantom, Solflare, etc.)'
      );

      if (choice) {
        connectEVM();
      } else {
        connectSolana();
      }
    }
  };

  const getButtonText = () => {
    if (isEVMConnected && evmAddress) {
      return `EVM: ${evmAddress.slice(0, 6)}...${evmAddress.slice(-4)}`;
    }
    if (isSolanaConnected && solanaAddress) {
      return `SOL: ${solanaAddress.slice(0, 6)}...${solanaAddress.slice(-4)}`;
    }
    return 'Connect Wallet';
  };

  return (
    <Button variant={variant} size={size} className={`connect-wallet-button ${className}`} onClick={handleConnect}>
      {isEVMConnected || isSolanaConnected ? <Zap className="w-4 h-4 mr-2" /> : <Wallet className="w-4 h-4 mr-2" />}
      {getButtonText()}
    </Button>
  );
};
