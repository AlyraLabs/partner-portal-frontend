import type { EIP1193Provider } from 'viem';
import { createConfig, http } from 'wagmi';
import { createStorage } from 'wagmi';
import { arbitrum, base, bsc, mainnet, optimism, polygon } from 'wagmi/chains';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';

// Extended type for window.ethereum with MetaMask-specific properties
interface WindowEthereum extends EIP1193Provider {
  isMetaMask?: boolean;
  providers?: WindowEthereum[];
}

// Helper to get MetaMask provider
const getMetaMaskProvider = (): EIP1193Provider | null => {
  if (typeof window === 'undefined') return null;

  const ethereum = (window as { ethereum?: WindowEthereum }).ethereum;
  if (!ethereum) return null;

  // If main provider is MetaMask
  if (ethereum.isMetaMask && !Array.isArray(ethereum.providers)) {
    return ethereum as EIP1193Provider;
  }

  // If multiple providers, find MetaMask
  if (Array.isArray(ethereum.providers)) {
    const metamaskProvider = ethereum.providers.find((p: WindowEthereum) => p.isMetaMask);
    return (metamaskProvider as EIP1193Provider) || null;
  }

  return null;
};

const createMetaMaskConnector = () => {
  if (typeof window === 'undefined') {
    return injected({
      shimDisconnect: true,
    });
  }

  const provider = getMetaMaskProvider();
  if (!provider) {
    return injected({
      shimDisconnect: true,
    });
  }

  return injected({
    // Type assertion: EIP1193Provider is compatible at runtime with wagmi's expected type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    target: provider as any,
    shimDisconnect: true,
  });
};

const metamaskConnector = createMetaMaskConnector();

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || 'your-project-id';

const customStorage = createStorage({
  storage:
    typeof window !== 'undefined'
      ? {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        }
      : undefined,
  key: 'wagmi',
});

if (typeof window !== 'undefined') {
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key && (key.startsWith('wagmi') || key.startsWith('wc@'))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => window.localStorage.removeItem(key));
  } catch {
    // Ignore localStorage errors
  }
}

export const wagmiConfig = createConfig({
  chains: [mainnet, bsc, polygon, base, arbitrum, optimism],
  connectors: [
    // MetaMask connector first (prioritized)
    metamaskConnector,
    // Generic injected connector as fallback
    injected({
      shimDisconnect: true,
    }),
    walletConnect({
      projectId,
      showQrModal: false,
    }),
    coinbaseWallet({
      appName: 'Partner Portal',
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [polygon.id]: http(),
    [base.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
  },
  ssr: false,
  storage: customStorage,
});
