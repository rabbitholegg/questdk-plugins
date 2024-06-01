import { type MintActionParams } from '@rabbitholegg/questdk'
import {
  createTestCase,
  type TestParams,
} from '@rabbitholegg/questdk-plugin-utils'

const MINT_BASE: TestParams<MintActionParams> = {
  transaction: {
    chainId: 8453,
    from: '0x22cf7cb48c74b07e1c0dcab5c047c5ed73292805',
    hash: '0x97c0c0a5e8551e6f0b8eea7006122e978c9624c6d68480c63745d60ecf9af3e2',
    input:
      '0x0cafb113000000000000000000000000ead6dca70b0465725a57eb81f7d3ab8b5e0b81b4000000000000000000000000000000000000000000000000000000000000000100000000000000000000000022cf7cb48c74b07e1c0dcab5c047c5ed73292805000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000',
    to: '0x62037b26fff91929655aa3a060f327b47d1e2b3e',
    value: '5800000000000000',
  },
  params: {
    chainId: 8453,
    contractAddress: '0xead6dca70b0465725a57eb81f7d3ab8b5e0b81b4',
    recipient: '0x22cf7cb48c74b07e1c0dcab5c047c5ed73292805',
  },
}

const MINT_ETHEREUM: TestParams<MintActionParams> = {
  transaction: {
    chainId: 1,
    from: '0xd76dfe29f0371fb0640906c699165b6bab33c522',
    hash: '0x4c6abcca8097cab9be494cca2ab2e9003e63cbbace1287f04edea46970b57314',
    input:
      '0x0cafb11300000000000000000000000042cfdea063311dfe9bbb3d7b598fea24067909b40000000000000000000000000000000000000000000000000000000000000001000000000000000000000000d76dfe29f0371fb0640906c699165b6bab33c522000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000',
    to: '0x53f451165ba6fdbe39a134673d13948261b2334a',
    value: '10800000000000000',
  },
  params: {
    chainId: 1,
    contractAddress: '0x42cfdea063311dfe9bbb3d7b598fea24067909b4',
    recipient: '0xd76dfe29f0371fb0640906c699165b6bab33c522',
  },
}

const MINT_DUTCH_AUCTION: TestParams<MintActionParams> = {
  transaction: {
    chainId: 1,
    from: '0x2A44195b273dA05b0071D801C996B83E7FB460cA',
    hash: '0xde69746ceb05818f7394aaeeb33abea5a5710417b4d700c2c4ef6506c96c904f',
    input:
      '0x16da9864000000000000000000000000ed3b072d1f2f8fbd42a13fdc02c6e9f7fab29d7100000000000000000000000000000000000000000000000000000000000000030000000000000000000000002a44195b273da05b0071d801c996b83e7fb460ca',
    to: '0x53F451165Ba6fdbe39A134673d13948261B2334A',
    value: '2400000000000001',
  },
  params: {
    chainId: 1,
    contractAddress: '0xed3b072d1f2f8fbd42a13fdc02c6e9f7fab29d71',
    recipient: '0x2a44195b273da05b0071d801c996b83e7fb460ca',
    amount: '3',
  },
}

export const passingTestCases = [
  createTestCase(MINT_BASE, 'when when minting a drop on base'),
  createTestCase(MINT_ETHEREUM, 'when when minting a drop on ethereum'),
  createTestCase(
    MINT_DUTCH_AUCTION,
    'when when minting a drop on dutch auction',
  ),
]

export const failingTestCases = [
  createTestCase(MINT_BASE, 'when chainId is not correct', { chainId: 10 }),
  createTestCase(MINT_ETHEREUM, 'when contract is not correct', {
    contractAddress: '0x62037b26fff91929655aa3a060f327b47d1e2b3e',
  }),
  createTestCase(MINT_BASE, 'when amount is not sufficient', { amount: '99' }),
]
