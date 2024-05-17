import {
  LOCK_AND_GENERATE_DEBT_FRAGMENT,
  EXECUTE_ABI,
  BASIC_ACTIONS_CONTRACT,
  TOKEN_TO_COLLATERAL_JOIN_CONTRACT,
  GENERATE_DEBT_FRAGMENT,
} from './constants'
import {
  type TransactionFilter,
  type StakeActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'

export const stake = async (
  stake: StakeActionParams,
): Promise<TransactionFilter> => {
  const { chainId, tokenOne: token, amountOne: amount } = stake

  return compressJson({
    chainId,
    input: {
      $abi: EXECUTE_ABI,
      _target: BASIC_ACTIONS_CONTRACT,
      _data: {
        $or: [
          {
            $abi: [LOCK_AND_GENERATE_DEBT_FRAGMENT],
            _collateralJoin: token
              ? TOKEN_TO_COLLATERAL_JOIN_CONTRACT[token]
              : undefined,
            _collateralAmount: amount,
          },
          {
            $abi: [GENERATE_DEBT_FRAGMENT],
          },
        ],
      },
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  // Given a specific chain we would expect this function to return a list of supported token addresses
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  // This should return all of the ChainIds that are supported by the Project we're integrating
  return [Chains.OPTIMISM]
}
