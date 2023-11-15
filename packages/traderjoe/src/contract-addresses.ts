import { ChainId } from '@traderjoe-xyz/sdk-core'
import { type Address } from "viem"
import { Tokens } from "./utils"

export const DEFAULT_SWAP_TOKEN_LIST: {
  [chainId: number]: readonly Address[]
} = {
  [ChainId.ARBITRUM_ONE]: [
    Tokens.ETH,
    Tokens.ARB,
    Tokens.DAI,
    Tokens.GMX,
    Tokens.JOE,
    Tokens.LINK,
    Tokens.MAGIC,
    Tokens.RDNT,
    Tokens.STG,
    Tokens.USDC,
    Tokens.USDCE,
    Tokens.USDT,
    Tokens.WBTC,
    Tokens.WETH,
  ],
} as const