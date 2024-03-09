import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import type { Address } from 'viem'

export const FIXED_PRICE_SALE_STRATS: { [chainId: number]: Address } = {
  [Chains.ETHEREUM]: '0x04E2516A2c207E84a1839755675dfd8eF6302F0a',
  [Chains.OPTIMISM]: '0x3678862f04290E565cCA2EF163BAeb92Bb76790C',
  [Chains.SEPOLIA]: '0x1Cd1C1f3b8B779B50Db23155F2Cb244FCcA06B21',
  [Chains.ZORA]: '0x04E2516A2c207E84a1839755675dfd8eF6302F0a',
  [Chains.BASE]: '0x04E2516A2c207E84a1839755675dfd8eF6302F0a',
  [Chains.ARBITRUM_ONE]: '0x1Cd1C1f3b8B779B50Db23155F2Cb244FCcA06B21',
}
