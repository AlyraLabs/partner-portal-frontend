import { useMemo } from 'react';

import { parseAbi } from 'viem';
import { useAccount, usePublicClient, useWriteContract } from 'wagmi';

import { useWallet } from '@/contexts/WalletContext';
import { CHAIN_IDS, getFeeCollectorAddress } from '@/contracts/constants';

// ABI definition for the FeeCollector contract
const FEE_COLLECTOR_ABI = parseAbi([
  'function withdrawIntegratorFees(address tokenAddress) external',
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

  // Withdraw integrator fees
  async withdrawIntegratorFees(tokenAddress: string) {
    try {
      if (!this.writeContract) {
        throw new Error('Write contract not available');
      }

      console.log('Attempting to withdraw fees for token:', tokenAddress);
      console.log('Contract address:', this.contract.address);

      // Use wagmi writeContract helper
      const hash = await (this.writeContract as (args: unknown) => Promise<`0x${string}`>)({
        address: this.contract.address,
        abi: FEE_COLLECTOR_ABI,
        functionName: 'withdrawIntegratorFees',
        args: [tokenAddress as `0x${string}`],
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

  // Get token balance for integrator
  async getTokenBalance(integratorAddress: string, tokenAddress: string) {
    try {
      if (!this.publicClient) {
        throw new Error('Public client not available');
      }

      // Read through publicClient directly
      const balance = await (this.publicClient as { readContract: (args: unknown) => Promise<bigint> }).readContract({
        address: this.contract.address,
        abi: FEE_COLLECTOR_ABI,
        functionName: 'getTokenBalance',
        args: [integratorAddress as `0x${string}`, tokenAddress as `0x${string}`],
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
  const { writeContract } = useWriteContract();

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
        writeContract: !!writeContract,
        writeContractType: typeof writeContract,
      });

      if (!publicClient || !writeContract) {
        console.error('Public client or write contract not available');
        return null;
      }

      // Create contract instance
      const contract = {
        address: contractAddress as `0x${string}`,
        abi: FEE_COLLECTOR_ABI,
      };

      return new FeeCollectorService(contract, publicClient, writeContract);
    } catch (error) {
      console.error('Error creating FeeCollector service:', error);
      return null;
    }
  }, [isEVMConnected, evmAddress, evmChainId, address, publicClient, writeContract]);

  return service;
};
