// Chain IDs enum
export enum CHAIN_IDS {
  ARBITRUM = 42161,
  BASE = 8453,
  ETHEREUM = 1,
  BSC = 56,
  POLYGON = 137,
  MANTLE = 5000,
  METIS = 1088,
  SEI = 1329,
  LINEA = 59144,
  OPTIMISM = 10,
}

// USDC token address on Arbitrum
export const USDC_ARBITRUM = '0xaf88d065e77c8cC2239327C5EDb3A432268e5831';

export const getFeeCollectorAddress = (chainId: CHAIN_IDS) => {
  switch (chainId) {
    case CHAIN_IDS.ARBITRUM:
      return '0xb6555859c0730d039487a15961a390438493cA67';
    case CHAIN_IDS.BSC:
      return '0xb6555859c0730d039487a15961a390438493cA67';
    case CHAIN_IDS.POLYGON:
      return '0xb6555859c0730d039487a15961a390438493cA67';
    case CHAIN_IDS.OPTIMISM:
      return '0xb6555859c0730d039487a15961a390438493cA67';
    default:
      throw new Error(
        `FeeCollector contract not deployed on chainId: ${chainId}. Please switch to Arbitrum, BSC, Polygon, Optimism, or Polygon zkEVM.`
      );
  }
};
