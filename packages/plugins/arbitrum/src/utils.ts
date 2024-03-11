import { type Address } from 'viem'
import { ARB_NOVA_CHAIN_ID, ARB_ONE_CHAIN_ID, ETH_CHAIN_ID } from './chain-ids'
import {
  ARB_NOVA_TO_MAINNET_GATEWAY,
  ARB_ONE_TO_MAINNET_GATEWAY,
  MAINNET_TO_ARB_NOVA_GATEWAY,
  MAINNET_TO_ARB_ONE_GATEWAY,
} from './contract-addresses'

const l1ToL2Map: [string, Address][] = [
  [
    // USDC
    JSON.stringify([
      '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8', // one
      '0x750ba8b76187092b0d1e87e28daaf484d1b5273b', // nova
    ]),
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // ethereum
  ],
  [
    // ARB
    JSON.stringify([
      '0x912CE59144191C1204E64559FE8253a0e49E6548', // one
      '0xf823C3cD3CeBE0a1fA952ba88Dc9EEf8e0Bf46AD', // nova
    ]),
    '0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1', // ethereum
  ],
  [
    // WBTC
    JSON.stringify([
      '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f', // one
      '0x1d05e4e72cd994cdf976181cfb0707345763564d', // nova
    ]),
    '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', // ethereum
  ],
  [
    // WETH
    JSON.stringify([
      '0x82af49447d8a07e3bd95bd0d56f35241523fbab1', // one
      '0x722e8bdd2ce80a4422e880164f2079488e115365', // nova
    ]),
    '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // ethereum
  ],
  [
    // DAI
    JSON.stringify(['0xda10009cbd5d07dd0cecc66161fc93d7c9000da1']), // one/nova
    '0x6b175474e89094c44da98b954eedeac495271d0f', // ethereum
  ],
]

const l1TokenFromL2Tokens = new Map<string, Address>(l1ToL2Map)

export function findL1TokenForL2Token(
  l2TokenAddress: Address | undefined,
): Address | undefined {
  if (l2TokenAddress) {
    for (const [key, value] of l1TokenFromL2Tokens) {
      const pair: Address[] = JSON.parse(key.toLowerCase())
      if (pair.includes(l2TokenAddress.toLowerCase() as Address)) {
        return value
      }
    }
  }
  return undefined
}

export const getContractAddressFromChainId = (
  sourceChainId: number,
  destinationChainId: number | undefined,
): Address | undefined => {
  // This is klunky but the alternative is some sort of convoluted 2D mapping
  if (destinationChainId === undefined) return undefined
  if (sourceChainId === ARB_NOVA_CHAIN_ID) return ARB_NOVA_TO_MAINNET_GATEWAY
  if (sourceChainId === ARB_ONE_CHAIN_ID) return ARB_ONE_TO_MAINNET_GATEWAY
  if (sourceChainId === ETH_CHAIN_ID) {
    if (destinationChainId === ARB_NOVA_CHAIN_ID)
      return MAINNET_TO_ARB_NOVA_GATEWAY
    if (destinationChainId === ARB_ONE_CHAIN_ID)
      return MAINNET_TO_ARB_ONE_GATEWAY
  }
  return '0x0'
}
