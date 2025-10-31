'use client';

import React, { useEffect, useMemo, useState } from 'react';

import { Wallet } from 'lucide-react';

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
  const { isEVMConnected, evmAddress, isSolanaConnected, solanaAddress, connectEVM, disconnect } = useWallet();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const isAnyConnected = isEVMConnected || isSolanaConnected;
  const displayConnected = isHydrated ? isAnyConnected : false;

  const handleConnect = () => {
    if (displayConnected) {
      disconnect();
    } else {
      connectEVM();
    }
  };

  const buttonText = useMemo(() => {
    if (!isHydrated) {
      return 'Connect Wallet';
    }
    if (isEVMConnected && evmAddress) {
      return `EVM: ${evmAddress}`;
    }
    if (isSolanaConnected && solanaAddress) {
      return `SOL: ${solanaAddress}`;
    }
    return 'Connect Wallet';
  }, [isHydrated, isEVMConnected, evmAddress, isSolanaConnected, solanaAddress]);

  return (
    <Button
      variant={variant}
      size={size}
      className={`connect-wallet-button ${className}`}
      onClick={handleConnect}
      disableTitleAnimation={displayConnected}
      data-connected={displayConnected ? 'true' : 'false'}>
      {!displayConnected ? <Wallet className="w-4 h-4 mr-2" /> : null}
      <span className={`connect-wallet-button__text${displayConnected ? ' connect-wallet-button__text--full' : ''}`}>
        {buttonText}
      </span>
    </Button>
  );
};
