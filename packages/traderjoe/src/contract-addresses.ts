import { type Address } from "viem"
import { ARB_CHAIN_ID } from "./chain-ids"
import { Tokens } from "./utils"

export const LB_ROUTER = '0xb4315e873dbcf96ffd0acd8ea43f689d8c20fb30'

export const DEFAULT_SWAP_TOKEN_LIST: {
  [chainId: number]: readonly Address[]
} = {
  [ARB_CHAIN_ID]: [
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