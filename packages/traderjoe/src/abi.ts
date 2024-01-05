import { LBRouterV21ABI } from '@traderjoe-xyz/sdk-v2'

export const EXACT_TOKENS_FOR_TOKENS_ABI = LBRouterV21ABI.filter(
  (abi) =>
    abi.type === 'function' && abi.name.startsWith('swapExactTokensForTokens'),
)
export const EXACT_TOKENS_FOR_NATIVE_ABI = LBRouterV21ABI.filter(
  (abi) =>
    abi.type === 'function' && abi.name.startsWith('swapExactTokensForNATIVE'),
)
export const TOKENS_FOR_EXACT_TOKENS_ABI = LBRouterV21ABI.filter(
  (abi) => abi.type === 'function' && abi.name === 'swapTokensForExactTokens',
)
export const EXACT_NATIVE_FOR_TOKENS_ABI = LBRouterV21ABI.filter(
  (abi) =>
    abi.type === 'function' && abi.name.startsWith('swapExactNATIVEForTokens'),
)
export const NATIVE_FOR_EXACT_TOKENS_ABI = LBRouterV21ABI.filter(
  (abi) => abi.type === 'function' && abi.name === 'swapNATIVEForExactTokens',
)
export const TOKENS_FOR_EXACT_NATIVE_ABI = LBRouterV21ABI.filter(
  (abi) => abi.type === 'function' && abi.name === 'swapTokensForExactNATIVE',
)
