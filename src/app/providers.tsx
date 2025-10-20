'use client';

import { AuthProvider } from '@context/AuthContext';
import { IntegrationProvider } from '@context/IntegrationContext';
import { WalletProvider } from '@context/WalletContext';
import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

import { wagmiConfig } from '@/config/wallet.config';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 2,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <IntegrationProvider>
            <WalletProvider>{children}</WalletProvider>
          </IntegrationProvider>
        </AuthProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
