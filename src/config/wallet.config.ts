import { createConfig, http } from 'wagmi';
import { arbitrum, base, bsc, mainnet, optimism, polygon } from 'wagmi/chains';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || 'your-project-id';

export const wagmiConfig = createConfig({
  chains: [mainnet, bsc, polygon, base, arbitrum, optimism],
  connectors: [
    injected(),
    walletConnect({
      projectId,
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
});
