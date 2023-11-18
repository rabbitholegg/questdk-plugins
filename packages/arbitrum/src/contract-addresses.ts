import { type Address } from 'viem'

// https://docs.arbitrum.io/for-devs/useful-addresses
export const MAINNET_TO_ARB_NOVA_GATEWAY =
  '0xc840838bc438d73c16c2f8b22d2ce3669963cd48'
export const MAINNET_TO_ARB_ONE_GATEWAY =
  '0x72ce9c846789fdb6fc1f34ac4ad25dd9ef7031ef'
export const ARB_NOVA_TO_MAINNET_GATEWAY =
  '0x21903d3f8176b1a0c17e953cd896610be9ffdfa8'
export const ARB_ONE_TO_MAINNET_GATEWAY =
  '0x5288c571fd7ad117bea99bf60fe0846c4e84f933'
export const ARB_ONE_DELAYED_INBOX =
  '0x4dbd4fc535ac27206064b68ffcf827b0a60bab3f'
export const ARB_NOVA_DELAYED_INBOX =
  '0xc4448b71118c9071bcb9734a0eac55d18a153949'
export const UNIVERSAL_ARBSYS_PRECOMPILE =
  '0x0000000000000000000000000000000000000064'

export const L2_TO_L1_GATEWAYS = [
  ARB_ONE_TO_MAINNET_GATEWAY,
  ARB_NOVA_TO_MAINNET_GATEWAY,
].map((address) => address.toLowerCase())

const l1ToL2Map: [string, Address][] = [
  [
    // USDC
    JSON.stringify([
      '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
      '0x750ba8b76187092b0d1e87e28daaf484d1b5273b',
    ]),
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  ],
  [
    // WBTC
    JSON.stringify([
      '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
      '0x1d05e4e72cd994cdf976181cfb0707345763564d',
    ]),
    '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
  ],
  [
    // WETH
    JSON.stringify([
      '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
      '0x722e8bdd2ce80a4422e880164f2079488e115365',
    ]),
    '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  ],
  [
    // DAI
    JSON.stringify(['0xda10009cbd5d07dd0cecc66161fc93d7c9000da1']),
    '0x6b175474e89094c44da98b954eedeac495271d0f',
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
