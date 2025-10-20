/* Simplified FeeCollector contract interface */
export interface FeeCollector {
  // Main functions we need
  withdrawIntegratorFees(tokenAddress: string): Promise<unknown>;
  getTokenBalance(integratorAddress: string, tokenAddress: string): Promise<bigint>;

  // Contract interface
  interface: unknown;
  connect(signerOrProvider: unknown): FeeCollector;
  attach(address: string): FeeCollector;
  deployed(): Promise<FeeCollector>;
}

export interface FeeCollectorInterface {
  functions: {
    'withdrawIntegratorFees(address)': unknown;
    'getTokenBalance(address,address)': unknown;
  };
  getFunction(nameOrSignatureOrTopic: string): unknown;
  encodeFunctionData(functionFragment: string, values: unknown[]): string;
  decodeFunctionResult(functionFragment: string, data: unknown): unknown;
}
