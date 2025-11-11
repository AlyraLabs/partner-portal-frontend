'use client';

import React, { createContext, useContext } from 'react';

import { WalletAdapterNetwork, WalletName } from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  useWallet as useSolanaWallet,
  WalletProvider as SolanaWalletProvider,
} from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import type { Connector } from 'wagmi';
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';

// Solana wallet configuration
const network = WalletAdapterNetwork.Devnet;
const endpoint = clusterApiUrl(network);
const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

interface WalletState {
  // EVM wallet state
  isEVMConnected: boolean;
  evmAddress: string | undefined;
  evmChainId: number | undefined;

  // Solana wallet state
  isSolanaConnected: boolean;
  solanaAddress: string | null;

  // Connection methods
  connectEVM: () => void;
  connectEVMWithConnector: (connector: Connector) => void;
  connectSolana: () => Promise<void>;
  disconnect: () => Promise<void>;
  switchNetwork: (chainId: number) => Promise<void>;
}

const WalletContext = createContext<WalletState | undefined>(undefined);

interface WalletProviderProps {
  children: React.ReactNode;
}

// Inner component to use Solana wallet hooks
const WalletProviderInner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { address: evmAddress, isConnected: isEVMConnected, chainId: evmChainId, connector } = useAccount();
  const { connect } = useConnect();
  const { disconnect: disconnectEVM } = useDisconnect();
  const { switchChain } = useSwitchChain();

  // Use Solana wallet adapter hook
  const solanaWallet = useSolanaWallet();

  const connectEVM = () => {
    // This function is kept for backward compatibility
    // But should not be used directly - use WalletModal instead
    console.warn('connectEVM called without connector selection. Use WalletModal to select a wallet.');
  };

  const connectEVMWithConnector = (connectorToUse: Connector) => {
    if (connectorToUse) {
      connect({ connector: connectorToUse });
    } else {
      console.error('Connector not found');
    }
  };

  const connectSolana = async () => {
    try {
      // Find Phantom wallet adapter
      const phantomWallet = wallets.find(w => w.name === 'Phantom');
      if (!phantomWallet) {
        throw new Error('Phantom wallet adapter not found');
      }

      await solanaWallet.select(phantomWallet.name as WalletName);
      await solanaWallet.connect();
    } catch (error) {
      console.error('Failed to connect Phantom:', error);
      throw error;
    }
  };

  const isSolanaConnected = solanaWallet.connected;
  const solanaAddress = solanaWallet.publicKey?.toBase58() || null;

  const disconnect = async () => {
    if (isEVMConnected) {
      disconnectEVM();
    }
    if (isSolanaConnected) {
      await solanaWallet.disconnect();
    }
  };

  const switchNetwork = async (chainId: number) => {
    if (!isEVMConnected || !connector) {
      throw new Error('Wallet is not connected');
    }

    try {
      await switchChain({ chainId, connector });
    } catch (error) {
      console.error('Failed to switch network:', error);
      throw error;
    }
  };

  const value: WalletState = {
    isEVMConnected,
    evmAddress,
    evmChainId,
    isSolanaConnected,
    solanaAddress,
    connectEVM,
    connectEVMWithConnector,
    connectSolana,
    disconnect,
    switchNetwork,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect={false}>
        <WalletProviderInner>{children}</WalletProviderInner>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
