import { type MintActionParams } from '@rabbitholegg/questdk'
import { Chains, type TestParams } from '@rabbitholegg/questdk-plugin-utils'

export const COOP_MINT: TestParams<MintActionParams> = {
  transaction: {
    chainId: 8453, // BASE
    from: '0x865c301c46d64de5c9b124ec1a97ef1efc1bcbd1',
    hash: '',
    input:
      '',
    to: '',
    value: '4000000000000000', // 0.004 ETH
  },
  params: {
    chainId: Chains.BASE,
    contractAddress: '',
    recipient: '0x865c301c46d64de5c9b124ec1a97ef1efc1bcbd1',
  },
}

export const ZERO_QUANTITY: TestParams<MintActionParams> = {
  transaction: {
    chainId: 8453, // BASE
    from: '',
    hash: '',
    input:
      '',
    to: '',
    value: '0',
  },
  params: {
    chainId: Chains.BASE,
    contractAddress: '',
    tokenId: ,
    recipient: '',
  },
}

export const MINT_REFERRAL: TestParams<MintActionParams> = {
  transaction: {
    chainId: 8453,
    from: '',
    to: '',
    hash: '',
    input:
      '',
    value: '4000000000000000',
  },
  params: {
    chainId: Chains.BASE,
    contractAddress: '',
    tokenId: ,
    recipient: '',
    referral: '',
  },
}

export const EXPECTED_ENCODED_DATA_1155 =
  ''
