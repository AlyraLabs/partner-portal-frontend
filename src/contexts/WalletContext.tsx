'use client';

import React, { createContext, useContext, useState } from 'react';

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
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
  connectSolana: () => void;
  disconnect: () => void;
  switchNetwork: (chainId: number) => Promise<void>;
}

const WalletContext = createContext<WalletState | undefined>(undefined);

interface WalletProviderProps {
  children: React.ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const { address: evmAddress, isConnected: isEVMConnected, chainId: evmChainId } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect: disconnectEVM } = useDisconnect();
  const { switchChain } = useSwitchChain();

  const [isSolanaConnected, setIsSolanaConnected] = useState(false);
  const [solanaAddress, setSolanaAddress] = useState<string | null>(null);

  const connectEVM = () => {
    // Try to connect with the first available connector (usually injected)
    const injectedConnector = connectors.find(connector => connector.type === 'injected');
    if (injectedConnector) {
      connect({ connector: injectedConnector });
    } else {
      console.error('No injected connector found');
    }
  };

  const connectSolana = () => {
    // Mock Solana connection for now
    setIsSolanaConnected(true);
    setSolanaAddress('mock-solana-address-123456789');
  };

  const disconnect = async () => {
    if (isEVMConnected) {
      disconnectEVM();
    }
    setIsSolanaConnected(false);
    setSolanaAddress(null);
  };

  const switchNetwork = async (chainId: number) => {
    try {
      await switchChain({ chainId });
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
    connectSolana,
    disconnect,
    switchNetwork,
  };

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
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
