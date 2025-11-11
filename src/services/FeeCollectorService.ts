import { useMemo } from 'react';

import { getAddress, parseAbi } from 'viem';
import { useAccount, usePublicClient, useWriteContract } from 'wagmi';

import { useWallet } from '@/contexts/WalletContext';
import { CHAIN_IDS, getFeeCollectorAddress } from '@/contracts/constants';

// ABI definition for the FeeCollector contract
const FEE_COLLECTOR_ABI = parseAbi([
  'function withdrawIntegratorFees(address tokenAddress) external',
  'function batchWithdrawIntegratorFees(address[] tokenAddresses) external',
  'function getTokenBalance(address integratorAddress, address tokenAddress) external view returns (uint256)',
]);

export class FeeCollectorService {
  private contract: { address: `0x${string}`; abi: readonly unknown[] };
  private publicClient: unknown;
  private writeContract: unknown;

  constructor(
    contract: { address: `0x${string}`; abi: readonly unknown[] },
    publicClient: unknown,
    writeContract: unknown
  ) {
    this.contract = contract;
    this.publicClient = publicClient;
    this.writeContract = writeContract;
  }

  async withdrawIntegratorFees(tokenAddress: string) {
    try {
      if (!this.writeContract) {
        throw new Error('Write contract not available');
      }

      console.log('Attempting to withdraw fees for token:', tokenAddress);
      console.log('Contract address:', this.contract.address);

      const normalizedAddress = getAddress(tokenAddress) as `0x${string}`;

      const hash = await (
        this.writeContract as (args: {
          address: `0x${string}`;
          abi: readonly unknown[];
          functionName: string;
          args: unknown[];
        }) => Promise<`0x${string}`>
      )({
        address: this.contract.address,
        abi: FEE_COLLECTOR_ABI,
        functionName: 'withdrawIntegratorFees',
        args: [normalizedAddress],
      });

      console.log('Withdraw transaction hash:', hash);
      return { hash };
    } catch (error) {
      console.error('Error withdrawing integrator fees:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        writeContract: this.writeContract,
        contractAddress: this.contract.address,
        tokenAddress,
      });
      throw error;
    }
  }

  async batchWithdrawIntegratorFees(tokenAddresses: string[]) {
    try {
      if (!this.writeContract) {
        throw new Error('Write contract not available');
      }

      if (!tokenAddresses || tokenAddresses.length === 0) {
        throw new Error('Token addresses array cannot be empty');
      }

      console.log('Attempting to batch withdraw fees for tokens:', tokenAddresses);
      console.log('Contract address:', this.contract.address);
      console.log('Number of tokens:', tokenAddresses.length);

      const tokenAddressesTyped = tokenAddresses.map(addr => {
        try {
          return getAddress(addr) as `0x${string}`;
        } catch (error) {
          console.error(`Invalid address: ${addr}`, error);
          throw new Error(`Invalid token address: ${addr}. Address must be a valid Ethereum address.`);
        }
      });

      console.log('Normalized token addresses:', tokenAddressesTyped);

      const hash = await (
        this.writeContract as (args: {
          address: `0x${string}`;
          abi: readonly unknown[];
          functionName: string;
          args: unknown[];
        }) => Promise<`0x${string}`>
      )({
        address: this.contract.address,
        abi: FEE_COLLECTOR_ABI,
        functionName: 'batchWithdrawIntegratorFees',
        args: [tokenAddressesTyped],
      });

      console.log('Batch withdraw transaction hash:', hash);
      return { hash };
    } catch (error) {
      console.error('Error batch withdrawing integrator fees:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        writeContract: this.writeContract,
        contractAddress: this.contract.address,
        tokenAddresses,
      });
      throw error;
    }
  }

  // Get token balance for integrator
  async getTokenBalance(integratorAddress: string, tokenAddress: string) {
    try {
      if (!this.publicClient) {
        throw new Error('Public client not available');
      }

      // Normalize addresses to checksum format
      const normalizedIntegratorAddress = getAddress(integratorAddress) as `0x${string}`;
      const normalizedTokenAddress = getAddress(tokenAddress) as `0x${string}`;

      // Read through publicClient directly
      const balance = await (this.publicClient as { readContract: (args: unknown) => Promise<bigint> }).readContract({
        address: this.contract.address,
        abi: FEE_COLLECTOR_ABI,
        functionName: 'getTokenBalance',
        args: [normalizedIntegratorAddress, normalizedTokenAddress],
      });

      console.log('Token balance:', balance.toString());
      return BigInt(balance.toString());
    } catch (error) {
      console.error('Error getting token balance:', error);
      throw error;
    }
  }
}

// Hook for using FeeCollector service
export const useFeeCollectorService = () => {
  const { isEVMConnected, evmAddress, evmChainId } = useWallet();
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();

  const service = useMemo(() => {
    if (!isEVMConnected || !evmAddress || !evmChainId || !address) {
      console.log('Missing required data:', { isEVMConnected, evmAddress, evmChainId, address });
      return null;
    }

    try {
      // Get contract address for current chain
      const contractAddress = getFeeCollectorAddress(evmChainId as CHAIN_IDS);

      console.log('Creating FeeCollector service with:', {
        contractAddress,
        publicClient: !!publicClient,
        writeContractAsync: !!writeContractAsync,
        writeContractAsyncType: typeof writeContractAsync,
      });

      if (!publicClient || !writeContractAsync) {
        console.error('Public client or write contract not available');
        return null;
      }

      // Create contract instance
      const contract = {
        address: contractAddress as `0x${string}`,
        abi: FEE_COLLECTOR_ABI,
      };

      return new FeeCollectorService(contract, publicClient, writeContractAsync);
    } catch (error) {
      console.error('Error creating FeeCollector service:', error);
      return null;
    }
  }, [isEVMConnected, evmAddress, evmChainId, address, publicClient, writeContractAsync]);

  return service;
};
