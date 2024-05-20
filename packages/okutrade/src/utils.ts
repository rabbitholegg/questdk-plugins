import { MAINNET_CHAINS } from '@gfxlabs/oku-chains'
import type { FilterOperator } from '@rabbitholegg/questdk'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { getAddress, type Address } from 'viem'

const request = async (chain: string, method: string, data: unknown) => {
  const result = await fetch(`https://omni.icarus.tools/${chain}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: '1',
      method: `cush_${method}`,
      params: data,
    }),
  })
  const resp = await result.json()
  if (resp.error) {
    throw resp.error
  }
  return resp.result.map((r: string) => getAddress(r))
}

export const buildV3PathQuery = (tokenIn?: string, tokenOut?: string) => {
  // v3 paths are formatted as 0x<token><fee><token>

  const conditions: FilterOperator[] = []

  if (tokenIn) {
    conditions.push({ $regex: `^${tokenIn.toLowerCase()}` })
  }

  if (tokenOut) {
    // Chop the 0x prefix before comparing
    conditions.push({ $regex: `${tokenOut.toLowerCase().slice(2)}$` })
  }

  return {
    $and: conditions,
  }
}

export const getPools = async (
  tokenIn: `0x${string}` | undefined,
  chainId: number,
) => {
  if (!tokenIn) {
    return undefined
  }
  const chain = getChainName(chainId)
  const resp = await request(chain, 'getTokenPools', [tokenIn])
  return resp as string[]
}

export const buildV2PathQuery = (tokenIn?: string, tokenOut?: string) => {
  // v2 paths are formatted as [<token>, <token>]
  const conditions: FilterOperator[] = []

  if (tokenIn) {
    conditions.push({ $first: getAddress(tokenIn) })
  }

  if (tokenOut) {
    conditions.push({ $last: getAddress(tokenOut) })
  }

  return {
    $and: conditions,
  }
}

export const CHAINS_LIST = Object.values(MAINNET_CHAINS)

export const CHAIN_INFO = Object.fromEntries(
  CHAINS_LIST.map((obj) => [obj.id, obj]),
)

export const CHAIN_MAP_ID = Object.fromEntries(
  Object.values(CHAIN_INFO).map((x) => {
    return [x.id, x]
  }),
)

const chainToContract: Record<number, Address> = {
  [Chains.ETHEREUM]: '0xEf1c6E67703c7BD7107eed8303Fbe6EC2554BF6B',
  [Chains.OPTIMISM]: '0xb555edF5dcF85f42cEeF1f3630a52A108E55A654',
  [Chains.POLYGON_POS]: '0x4C60051384bd2d3C01bfc845Cf5F4b44bcbE9de5',
  [Chains.ZK_SYNC_ERA]: '0x28731BCC616B5f51dD52CF2e4dF0E78dD1136C06',
  [Chains.ARBITRUM_ONE]: '0x4C60051384bd2d3C01bfc845Cf5F4b44bcbE9de5',
  [Chains.BASE]: '0xeC8B0F7Ffe3ae75d7FfAb09429e3675bb63503e4',
  [Chains.BLAST]: '0x643770E279d5D0733F21d6DC03A8efbABf3255B4',
}

const chainToWETH: Record<number, Address> = {
  [Chains.ETHEREUM]: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  [Chains.OPTIMISM]: '0x4200000000000000000000000000000000000006',
  [Chains.ARBITRUM_ONE]: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  [Chains.POLYGON_POS]: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
  [Chains.ZK_SYNC_ERA]: '0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91',
  [Chains.BASE]: '0x4200000000000000000000000000000000000006',
  [Chains.BLAST]: '0x4300000000000000000000000000000000000004',
}

const chainIdToName: Record<number, string> = {
  [Chains.ETHEREUM]: 'ethereum',
  [Chains.OPTIMISM]: 'optimism',
  [Chains.ARBITRUM_ONE]: 'arbitrum',
  [Chains.POLYGON_POS]: 'polygon',
  [Chains.ZK_SYNC_ERA]: 'zksync',
  [Chains.BASE]: 'base',
  [Chains.BLAST]: 'blast',
}

export function getUniversalRouter(chainId: number): Address {
  const address = chainToContract[chainId]
  if (!address) {
    throw new Error(`Contract address not found for chain ID ${chainId}`)
  }
  return address
}

export function getWETHAddress(chainId: number): Address {
  const address = chainToWETH[chainId]
  if (!address) {
    throw new Error(`WETH address not found for chain ID ${chainId}`)
  }
  return address
}

export function getChainName(chainId: number): string {
  const name = chainIdToName[chainId]
  if (!name) {
    throw new Error(`Chain name not found for chain ID ${chainId}`)
  }
  return name
}
