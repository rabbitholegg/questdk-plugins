import { type Address } from 'viem'

// https://docs.arbitrum.io/for-devs/useful-addresses
export const MAINNET_TO_ARB_NOVA_GATEWAY =
  '0xC840838Bc438d73C16c2f8b22D2Ce3669963cD48'
export const MAINNET_TO_ARB_ONE_GATEWAY =
  '0x72Ce9c846789fdB6fC1f34aC4AD25Dd9ef7031ef'
export const ARB_NOVA_TO_MAINNET_GATEWAY =
  '0x21903d3F8176b1a0c17E953Cd896610Be9fFDFa8'
export const ARB_ONE_TO_MAINNET_GATEWAY =
  '0x5288c571Fd7aD117beA99bF60FE0846C4E84F933'
export const ARB_ONE_DELAYED_INBOX =
  '0x4Dbd4fc535Ac27206064B68FfCf827b0A60BAB3f'
export const ARB_NOVA_DELAYED_INBOX =
  '0xc4448b71118c9071Bcb9734A0EAc55D18A153949'
export const UNIVERSAL_ARBSYS_PRECOMPILE =
  '0x0000000000000000000000000000000000000064'
export const L2_TO_L1_GATEWAYS = [
  ARB_ONE_TO_MAINNET_GATEWAY,
  ARB_NOVA_TO_MAINNET_GATEWAY,
]

const l1ToL2Map: [string, Address][] = [
  [
    // USDC
    JSON.stringify([
      '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
      '0x750ba8b76187092B0D1E87E28daaf484d1b5273b',
    ]),
    '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  ],
  [
    // WBTC
    JSON.stringify([
      '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
      '0x1d05e4e72cD994cdF976181CfB0707345763564d',
    ]),
    '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  ],
  [
    // WETH
    JSON.stringify([
      '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
      '0x722E8BdD2ce80A4422E880164f2079488e115365',
    ]),
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  ],
  [
    // DAI
    JSON.stringify(['0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1']),
    '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  ],
]

const l1TokenFromL2Tokens = new Map<string, Address>(l1ToL2Map)

export function findL1TokenForL2Token(
  l2TokenAddress: Address | undefined,
): Address | undefined {
  if (l2TokenAddress) {
    for (const [key, value] of l1TokenFromL2Tokens) {
      const pair: Address[] = JSON.parse(key)
      if (pair.includes(l2TokenAddress)) {
        return value
      }
    }
  }
  return undefined
}
