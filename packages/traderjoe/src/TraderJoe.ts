import {
  type TransactionFilter,
  type SwapActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address, Hex, zeroAddress as NATIVE_TOKEN } from 'viem'
import { DEFAULT_SWAP_TOKEN_LIST, Tokens } from './contract-addresses'
import { CHAIN_ID_ARRAY } from './chain-ids'
import { buildPathQuery, Chains } from './utils'
import {
  EXACT_NATIVE_FOR_TOKENS_ABI,
  EXACT_TOKENS_FOR_NATIVE_ABI,
  EXACT_TOKENS_FOR_TOKENS_ABI,
  LBRouterV21ABI,
  NATIVE_FOR_EXACT_TOKENS_ABI,
  TOKENS_FOR_EXACT_NATIVE_ABI,
  TOKENS_FOR_EXACT_TOKENS_ABI,
} from './abi'
import { arbitrum, arbitrumGoerli, avalanche, avalancheFuji, mantle } from 'viem/chains'

// https://github.com/traderjoe-xyz/joe-sdks/blob/458e39748c8ebc6abd1703d6f6f98372cc3c51c5/packages/v2/src/constants/v2Addrs.ts#L51
export const LB_ROUTER_V21_ADDRESS: Record<number, Hex> = {
  [avalancheFuji.id]: '0xb4315e873dBcf96Ffd0acd8EA43f689D8c20fB30',
  [avalanche.id]: '0xb4315e873dBcf96Ffd0acd8EA43f689D8c20fB30',
  [arbitrum.id]: '0xb4315e873dBcf96Ffd0acd8EA43f689D8c20fB30',
  [arbitrumGoerli.id]: '0x095EEe81B0eC73797424d67e24adab20D5A5D307',
  [56]: '0xb4315e873dBcf96Ffd0acd8EA43f689D8c20fB30',
  [97]: '0x8FABE13D95F28f7478Dc655d8D4BA99935D50e02',
  [1]: '0x9A93a421b74F1c5755b83dD2C211614dC419C44b',
  [mantle.id]: '0xAFb85a12Babfafabfe1a518594492d5a830e782a',
}

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

  const nativeIn = tokenIn === NATIVE_TOKEN
  const nativeOut = tokenOut === NATIVE_TOKEN
  const to = contractAddress ?? LB_ROUTER_V21_ADDRESS[chainId as Chains]

  const input = {
    $abi: LBRouterV21ABI,
    to: recipient,
    path: {
      tokenPath: buildPathQuery(
        nativeIn ? Tokens[chainId]?.WETH : tokenIn,
        nativeOut ? Tokens[chainId]?.WETH : tokenOut,
      ),
    },
  }

  return compressJson({
    chainId,
    to,
    value: nativeIn ? amountIn : tokenIn ? 0 : undefined,
    input: {
      $and: [
        input,
        {
          $or: [
            {
              // exactNativeforTokens
              $abi: EXACT_NATIVE_FOR_TOKENS_ABI,
              amountOutMin: amountOut,
            },
            {
              // exactNativeforTokens
              $abi: EXACT_TOKENS_FOR_TOKENS_ABI,
              amountIn,
              amountOutMin: amountOut,
            },
            { $abi: NATIVE_FOR_EXACT_TOKENS_ABI, amountOut: amountOut }, // nativeForExactTokens
            {
              $abi: TOKENS_FOR_EXACT_TOKENS_ABI,
              amountInMax: amountIn,
              amountOut: amountOut,
            }, // tokensForExactTokens
            {
              $abi: EXACT_TOKENS_FOR_NATIVE_ABI,
              amountIn: amountIn,
              amountOutMinNATIVE: amountOut,
            }, // exactTokensForNative
            {
              $abi: TOKENS_FOR_EXACT_NATIVE_ABI,
              amountInMax: amountIn,
              amountNATIVEOut: amountOut,
            }, // tokensForExactNative
          ],
        },
      ],
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return (DEFAULT_SWAP_TOKEN_LIST[_chainId] as Address[]) ?? []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return CHAIN_ID_ARRAY
}
