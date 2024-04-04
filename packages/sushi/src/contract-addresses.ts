import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import type { Address } from 'viem'

export const CHAIN_TO_CONTRACTS: { [_chainId: number]: Address[] | undefined } =
  {
    [Chains.ETHEREUM]: [
      '0xe43ca1dee3f0fc1e2df73a0745674545f11a59f5', // RouteProcessor4
      '0x5550D13389bB70F45fCeF58f19f6b6e87F6e747d', // RouteProcessor3_2
      '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F', // V2Router02
    ],
    [Chains.OPTIMISM]: [
      '0x1f2FCf1d036b375b384012e61D3AA33F8C256bbE', // RouteProcessor4
      '0xEb94EcA012eC0bbB254722FdDa2CE7475875A52B', // RouteProcessor3_2
      '0x4C5D5234f232BD2D76B96aA33F5AE4FCF0E4BFAb', // RouteProcessor3
    ],
    [Chains.POLYGON_POS]: [
      '0x46B3fDF7b5CDe91Ac049936bF0bDb12c5d22202e', // RouteProcessor4
      '0xE7eb31f23A5BefEEFf76dbD2ED6AdC822568a5d2', // RouteProcessor3_2
      '0x9cfEAdcC38377283aDB944205c5238d04d4dD8A1', // RouteProcessor3_1
      '0x0a6e511Fe663827b9cA7e2D2542b20B37fC217A6', // RouteProcessor3
      '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506', // V2Router02
    ],
    [Chains.BASE]: [
      '0x0389879e0156033202c44bf784ac18fc02edee4f', // RouteProcessor4
      '0x83eC81Ae54dD8dca17C3Dd4703141599090751D1', // RouteProcessor3_2
      '0x9B77032075806975B3bd3bcFc69E5DE36ee6D176', // RouteProcessor3_1
      '0x0BE808376Ecb75a5CF9bB6D237d16cd37893d904', // RouteProcessor3
      '0x6BDED42c6DA8FBf0d2bA55B2fa120C5e0c8D7891', // V2Router02
    ],
    [Chains.ARBITRUM_ONE]: [
      '0x544bA588efD839d2692Fc31EA991cD39993c135F', // RouteProcessor4
      '0x09bD2A33c47746fF03b86BCe4E885D03C74a8E8C', // RouteProcessor3_2
      '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506', // V2Router02
    ],
  }

export const INTERNAL_ETHER_ADDRESS =
  '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
