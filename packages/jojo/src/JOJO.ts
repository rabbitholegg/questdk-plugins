import { FUNDING_RATE_ARBITRAGE_ABI } from './abi'
import { FUNDING_RATE_ARBITRAGE, STATE_TOKENS } from './contract-addresses'
import { compressJson } from '@rabbitholegg/questdk'
import {
  Chains,
  type StakeActionParams,
} from '@rabbitholegg/questdk-plugin-utils'
import { type Address } from 'viem'

export const stake = async (stake: StakeActionParams) => {
  const { chainId, amountOne } = stake

  return compressJson({
    chainId,
    to: FUNDING_RATE_ARBITRAGE.toLowerCase(),
    input: {
      $abi: FUNDING_RATE_ARBITRAGE_ABI,
      amount: amountOne,
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  // Given a specific chain we would expect this function to return a list of supported token addresses
  return _chainId === Chains.ARBITRUM_ONE ? STATE_TOKENS : []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  // This should return all of the ChainIds that are supported by the Project we're integrating
  return [Chains.ARBITRUM_ONE]
}
