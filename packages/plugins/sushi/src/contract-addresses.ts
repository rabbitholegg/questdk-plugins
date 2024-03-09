import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import type { Address } from 'viem'

export const CHAIN_TO_CONTRACTS: { [_chainId: number]: Address[] | undefined } =
  {
    [Chains.ETHEREUM]: [
      '0xCdBCd51a5E8728E0AF4895ce5771b7d17fF71959', // RouteProcessor4
      '0x5550D13389bB70F45fCeF58f19f6b6e87F6e747d', // RouteProcessor3_2
      '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F', // V2Router02
    ],
    [Chains.OPTIMISM]: [
      '0xCdBCd51a5E8728E0AF4895ce5771b7d17fF71959', // RouteProcessor4
      '0xEb94EcA012eC0bbB254722FdDa2CE7475875A52B', // RouteProcessor3_2
    ],
    [Chains.POLYGON_POS]: [
      '0xB45e53277a7e0F1D35f2a77160e91e25507f1763', // RouteProcessor4
      '0xE7eb31f23A5BefEEFf76dbD2ED6AdC822568a5d2', // RouteProcessor3_2
      '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506', // V2Router02
    ],
    [Chains.BASE]: [
      '0x9B3336186a38E1b6c21955d112dbb0343Ee061eE', // RouteProcessor4
      '0x83eC81Ae54dD8dca17C3Dd4703141599090751D1', // RouteProcessor3_2
      '0x6BDED42c6DA8FBf0d2bA55B2fa120C5e0c8D7891', // V2Router02
    ],
    [Chains.ARBITRUM_ONE]: [
      '0xCdBCd51a5E8728E0AF4895ce5771b7d17fF71959', // RouteProcessor4
      '0x09bD2A33c47746fF03b86BCe4E885D03C74a8E8C', // RouteProcessor3_2
      '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506', // V2Router02
    ],
  }

export const INTERNAL_ETHER_ADDRESS =
  '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
