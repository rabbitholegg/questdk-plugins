import {
  ActionType,
  compressJson,
  type OptionsActionParams,
  type StakeActionParams,
  type SwapActionParams,
  type TransactionFilter,
} from '@rabbitholegg/questdk'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { zeroAddress as ETH_ADDRESS, zeroAddress } from 'viem'
import { NFT_POSITION_MANAGER_ABI } from './abi'
import {
  CHAIN_ID_ARRAY,
  EXECUTE_ABI_FRAGMENTS,
  LIMIT_ORDER_REGISTRY_ABI,
  LIMIT_ORDER_REGISTRY_CONTRACT,
  V2_SWAP_EXACT_TYPES,
  V3_SWAP_EXACT_TYPES,
} from './constants'
import { CHAIN_TO_TOKENS } from './token-addresses'
import {
  buildV2PathQuery,
  buildV3PathQuery,
  CHAIN_MAP_ID,
  getPools,
  getUniversalRouter,
  getWETHAddress,
} from './utils'

export const swap = async (
  swap: SwapActionParams,
): Promise<TransactionFilter> => {
  const {
    chainId,
    contractAddress,
    tokenIn,
    tokenOut,
    amountIn,
    amountOut,
    recipient,
  } = swap

  const inputToken =
    tokenIn === ETH_ADDRESS ? getWETHAddress(chainId).toLowerCase() : tokenIn
  const outputToken =
    tokenOut === ETH_ADDRESS ? getWETHAddress(chainId).toLowerCase() : tokenOut

  return compressJson({
    chainId,
    to: contractAddress || getUniversalRouter(chainId),
    from: recipient,
    input: {
      $abi: EXECUTE_ABI_FRAGMENTS,
      inputs: {
        $some: {
          $or: [
            {
              $abiParams: V3_SWAP_EXACT_TYPES,
              path: buildV3PathQuery(inputToken, outputToken),
              amountIn,
              amountOut,
            },
            {
              $abiParams: V2_SWAP_EXACT_TYPES,
              path: buildV2PathQuery(inputToken, outputToken),
              amountIn,
              amountOut,
            },
          ],
        },
      },
    },
  })
}

export const stake = async (stake: StakeActionParams) => {
  const { chainId, tokenOne, amountOne, tokenTwo, amountTwo } = stake
  return compressJson({
    chainId: chainId,
    to: CHAIN_MAP_ID[chainId].contracts.nftManager.address,
    input: {
      $abi: NFT_POSITION_MANAGER_ABI,
      inputs: {
        token0: tokenOne,
        token1: tokenTwo,
      },
      outputs: {
        amount0: amountOne,
        amount1: amountTwo,
      },
    },
  })
}

export const options = async (
  trade: OptionsActionParams,
): Promise<TransactionFilter> => {
  const { chainId, token, amount, recipient } = trade
  const pools = await getPools(token, chainId)
  return compressJson({
    chainId,
    to: LIMIT_ORDER_REGISTRY_CONTRACT[chainId],
    from: recipient,
    input: {
      $abi: LIMIT_ORDER_REGISTRY_ABI,
      pool: pools ? { $or: pools } : undefined,
      amount,
    },
  })
}

export const getSupportedChainIds = async (actionType?: ActionType) => {
  if (actionType === 'swap') {
    return [Chains.BLAST]
  }
  return CHAIN_ID_ARRAY as number[]
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
  actionType?: ActionType,
) => {
  if (actionType === 'options') {
    return (
      CHAIN_TO_TOKENS[_chainId]?.filter((token) => token !== zeroAddress) ?? []
    )
  }
  return CHAIN_TO_TOKENS[_chainId] ?? []
}
