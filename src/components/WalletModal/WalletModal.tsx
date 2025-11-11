'use client';

import React, { useEffect, useState } from 'react';

import { X } from 'lucide-react';
import { useAccount, useConnect } from 'wagmi';

import './WalletModal.scss';

import { useWallet } from '@/contexts/WalletContext';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { connectSolana, isEVMConnected, isSolanaConnected } = useWallet();
  const { connect, connectors, isPending } = useConnect();
  const { isConnected } = useAccount();
  const [connectingWalletId, setConnectingWalletId] = useState<string | null>(null);

  const metamaskConnector =
    connectors.find(
      connector =>
        connector.name?.toLowerCase().includes('metamask') ||
        (connector.type === 'injected' && connector.id === 'metaMask')
    ) || connectors.find(connector => connector.type === 'injected');

  const handleConnectMetaMask = () => {
    if (!metamaskConnector) {
      console.error('MetaMask connector not found');
      alert('MetaMask not found. Please install MetaMask extension.');
      return;
    }

    setConnectingWalletId('metamask');
    try {
      connect({ connector: metamaskConnector });
    } catch (err) {
      console.error('Connection error:', err);
      setConnectingWalletId(null);
    }
  };

  const handleConnectPhantom = async () => {
    setConnectingWalletId('phantom');
    try {
      await connectSolana();
      setConnectingWalletId(null);
      onClose();
    } catch (err) {
      console.error('Connection error:', err);
      setConnectingWalletId(null);
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isConnected || isEVMConnected || isSolanaConnected) {
      const timer = setTimeout(() => {
        setConnectingWalletId(null);
        onClose();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isConnected, isEVMConnected, isSolanaConnected, onClose]);

  if (!isOpen) return null;

  const isConnectingMetaMask = connectingWalletId === 'metamask' && isPending;
  const isConnectingPhantom = connectingWalletId === 'phantom';

  return (
    <div className="wallet-modal-overlay" onClick={onClose}>
      <div className="wallet-modal" onClick={e => e.stopPropagation()}>
        <div className="wallet-modal__header">
          <h2>Connect Wallet</h2>
          <button type="button" className="wallet-modal__close" onClick={onClose} aria-label="Close modal">
            <X size={24} />
          </button>
        </div>

        <div className="wallet-modal__content">
          <p className="wallet-modal__description">Choose a wallet to connect to your account</p>

          <div className="wallet-modal__wallets">
            {/* MetaMask */}
            <button type="button" className="wallet-modal__wallet" onClick={handleConnectMetaMask} disabled={isPending}>
              <div className="wallet-modal__wallet-icon"></div>
              <div className="wallet-modal__wallet-info">
                <div className="wallet-modal__wallet-name">MetaMask</div>
                <div className="wallet-modal__wallet-status">
                  {isConnectingMetaMask ? (
                    <span className="wallet-modal__wallet-loading">Connecting...</span>
                  ) : (
                    'Connect using MetaMask'
                  )}
                </div>
              </div>
            </button>

            {/* Phantom */}
            <button
              type="button"
              className="wallet-modal__wallet"
              onClick={handleConnectPhantom}
              disabled={isConnectingPhantom}>
              <div className="wallet-modal__wallet-icon"></div>
              <div className="wallet-modal__wallet-info">
                <div className="wallet-modal__wallet-name">Phantom</div>
                <div className="wallet-modal__wallet-status">
                  {isConnectingPhantom ? (
                    <span className="wallet-modal__wallet-loading">Connecting...</span>
                  ) : (
                    'Connect using Phantom'
                  )}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
