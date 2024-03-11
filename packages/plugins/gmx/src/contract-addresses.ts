import { type Address } from 'viem'
import { Tokens } from './utils'
import type { FilterOperator } from '@rabbitholegg/questdk'
export const GMX_ROUTERV1_ADDRESS = '0xabbc5f99639c9b6bcb58544ddf04efa6802f4064'
export const GMX_ROUTERV2_ADDRESS = '0x7C68C7866A64FA2160F78EEaE12217FFbf871fa8'
export const ETH_ADDRESS = '0x0000000000000000000000000000000000000000'
export const DEFAULT_TOKEN_LIST: Address[] = [
  Tokens.DAI,
  Tokens.LINK,
  Tokens.UNI,
  Tokens.USDC,
  Tokens.USDCe,
  Tokens.USDT,
  Tokens.WBTC,
  Tokens.WETH,
  ETH_ADDRESS,
]

export const MARKET_TOKENS: {
  [tokenAddress: Address]: Address | FilterOperator
} = {
  [Tokens.DAI]: '0xe2fEDb9e6139a182B98e7C2688ccFa3e9A53c665',
  [Tokens.LINK]: '0x7f1fa204bb700853D36994DA19F830b6Ad18455C',
  [Tokens.UNI]: '0xc7Abb2C5f3BF3CEB389dF0Eecd6120D451170B50',
  [Tokens.USDCe]: '0x9C2433dFD71096C435Be9465220BB2B189375eA7',
  [Tokens.USDT]: '0xB686BcB112660343E6d15BDb65297e110C8311c4',
  [Tokens.WBTC]: '0x47c031236e19d024b42f8AE6780E44A573170703',
  [Tokens.WETH]: {
    $or: [
      '0x0CCB4fAa6f1F1B30911619f1184082aB4E25813c',
      '0x6853EA96FF216fAb11D2d930CE3C508556A4bdc4',
      '0x70d95587d40A2caf56bd97485aB3Eec10Bee6336',
    ],
  },
}
