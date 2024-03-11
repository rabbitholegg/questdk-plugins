import { type Address, zeroAddress as ETH_ADDRESS } from 'viem'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'

const ethereumTokenAddresses: Address[] = [
  ETH_ADDRESS, // ETH
  '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
  '0xdAC17F958D2ee523a2206206994597C13D831ec7', // USDT
  '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', // WBTC
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
  '0x514910771AF9Ca656af840dff83E8264EcF986CA', // LINK
  '0xc00e94Cb662C3520282E6f5717214004A7f26888', // COMP
  '0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72', // ENS
  '0x6810e776880C02933D47DB1b9fc05908e5386b96', // GNO
  '0x6De037ef9aD2725EB40118Bb1702EBb27e4Aeb24', // RNDR
  '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', // UNI
]

const optimismTokenAddresses: Address[] = [
  ETH_ADDRESS, // ETH
  '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1', // DAI
  '0x9560e827aF36c94D2Ac33a39bCE1Fe78631088Db', // VELO
  '0xFf733b2A3557a7ed6697007ab5D11B79FdD1b76B', // ACX
  '0xFdb794692724153d1488CcdBE0C56c252596735F', // LIDO
  '0x350a791Bfc2C21F9Ed5d10980Dad2e2638ffa7f6', // LINK
  '0x4200000000000000000000000000000000000042', // OP
  '0x9e1028F5F1D5eDE59748FFceE5532509976840E0', // PERP
  '0x6fd9d7AD17242c41f7131d257212c54A0e816691', // UNI
  '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85', // USDC
  '0x7F5c764cBc14f9669B88837ca1490cCa17c31607', // USDCE
  '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58', // USDT
  '0x68f180fcCe6836688e9084f035309E29Bf0A2095', // WBTC
  '0x4200000000000000000000000000000000000006', // WETH
]

const polygonTokenAddresses: Address[] = [
  ETH_ADDRESS, // MATIC
  '0x9a71012B13CA4d3D0Cdc72A177DF3ef03b0E76A3', // BAL
  '0x8505b9d2254A7Ae468c0E9dd10Ccea3A837aef5c', // COMP
  '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', // DAI
  '0xC3C7d422809852031b44ab29EEC9F1EfF2A58756', // LIDO
  '0xb33EaAd8d922B1083446DC23f610c2567fB5180f', // UNI
  '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359', // USDC
  '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // USDCE
  '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', // USDT
  '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6', // WBTC
  '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', // WETH
  '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', // WMATIC
]

const arbitrumTokenAddresses: Address[] = [
  ETH_ADDRESS, // ETH
  '0x912CE59144191C1204E64559FE8253a0e49E6548', // ARB
  '0x23ee2343B892b1BB63503a4FAbc840E0e2C6810f', // AXL
  '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1', // DAI
  '0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F', // FRAX
  '0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a', // GMX
  '0x539bdE0d7Dbd336b79148AA742883198BBF60342', // MAGIC
  '0x088cd8f5eF3652623c22D48b1605DCfE860Cd704', // VELA
  '0x3d9907F9a368ad0a51Be60f7Da3b97cf940982D8', // GRAIL
  '0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0', // UNI
  '0xaf88d065e77c8cC2239327C5EDb3A432268e5831', // USDC
  '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8', // USDCE
  '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', // USDT
  '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f', // WBTC
  '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', // WETH
]

const zkSyncEraTokenAddresses: Address[] = [
  ETH_ADDRESS, // ETH
  '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4', // USDC
  '0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91', // WETH
]

const baseTokenAddresses: Address[] = [
  ETH_ADDRESS, // ETH
  '0x4200000000000000000000000000000000000006', // WETH
  '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA', // USDbC
  '0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22', // cbETH
  '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb', // DAI
  '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // USDC
  '0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed', // DEGEN
]

export const CHAIN_TO_TOKENS: { [chainId: number]: Address[] | undefined } = {
  [Chains.ETHEREUM]: ethereumTokenAddresses,
  [Chains.OPTIMISM]: optimismTokenAddresses,
  [Chains.ARBITRUM_ONE]: arbitrumTokenAddresses,
  [Chains.POLYGON_POS]: polygonTokenAddresses,
  [Chains.ZK_SYNC_ERA]: zkSyncEraTokenAddresses,
  [Chains.BASE]: baseTokenAddresses,
}