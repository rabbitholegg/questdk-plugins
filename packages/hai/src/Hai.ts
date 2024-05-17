import {
  BASIC_ACTIONS_CONTRACT,
  EXECUTE_ABI,
  // GENERATE_DEBT_FRAGMENT,
  LOCK_AND_GENERATE_DEBT_FRAGMENT,
  SUPPORTED_TOKEN_ARRAY,
  TOKEN_TO_COLLATERAL_JOIN_CONTRACT,
} from './constants'
import {
  type StakeActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { type Address } from 'viem'

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
          // {
          //   $abi: [GENERATE_DEBT_FRAGMENT],
          // },
        ],
      },
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return SUPPORTED_TOKEN_ARRAY
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.OPTIMISM]
}
