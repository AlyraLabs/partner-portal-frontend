/* Simplified FeeCollector factory */
import { Contract } from 'ethers';

import type { FeeCollector, FeeCollectorInterface } from './FeeCollector';

const _abi = [
  {
    type: 'function',
    name: 'withdrawIntegratorFees',
    inputs: [
      {
        name: 'tokenAddress',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'batchWithdrawIntegratorFees',
    inputs: [
      {
        name: 'tokenAddresses',
        type: 'address[]',
        internalType: 'address[]',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getTokenBalance',
    inputs: [
      {
        name: 'integratorAddress',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'tokenAddress',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
] as const;

export class FeeCollector__factory {
  static readonly abi = _abi;

  static createInterface(): FeeCollectorInterface {
    return {} as FeeCollectorInterface;
  }

  static connect(address: string, signerOrProvider: unknown): FeeCollector {
    return new Contract(address, _abi, signerOrProvider as never) as unknown as FeeCollector;
  }
}
