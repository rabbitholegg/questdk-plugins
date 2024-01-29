import { type MintActionParams } from '@rabbitholegg/questdk'

import {
  type TestCase,
  type TestParams,
  createTestCase,
} from '@rabbitholegg/questdk-plugin-utils'

import { Chains, NULL_ADDRESS } from './const'
import { Contracts } from './contracts'

// https://etherscan.io/tx/0x99cb792e3f9f82768df82a8b89061ff32121f9d22a3f13fd527fbab604a5c500
export const PURCHASE_TRANSACTION: TestParams<MintActionParams> = {
  transaction: {
    chainId: Chains.ETHEREUM,
    from: '0xd8AA1a0A09392d03C8829784075edc0dfd17771C',
    to: Contracts.MINTER_DA_EXP_SETTLEMENT_V3,
    hash: '0x99cb792e3f9f82768df82a8b89061ff32121f9d22a3f13fd527fbab604a5c500',
    input:
      '0xae77c23700000000000000000000000000000000000000000000000000000000000001ea00000000000000000000000099a9b7c1116f9ceeb1652de04d5969cce509b069',
    value: '50000000000000000',
  },
  params: {
    chainId: Chains.ETHEREUM,
    contractAddress: Contracts.MINTER_DA_EXP_SETTLEMENT_V3,
    tokenId: 490,
    recipient: '0xd8AA1a0A09392d03C8829784075edc0dfd17771C',
  },
}

// https://etherscan.io/tx/0x727a87f5366671787387accc85d47a0290d9b43bd2374fd7b321bf51335d38e2
export const PURCHASE_TO_TRANSACTION: TestParams<MintActionParams> = {
  transaction: {
    chainId: Chains.ETHEREUM,
    from: '0xff1e8f16a59d77c8c70a13fa183040fb1e2fb2f6',
    hash: '0x727a87f5366671787387accc85d47a0290d9b43bd2374fd7b321bf51335d38e2',
    input:
      '0x4e8d87870000000000000000000000008b97f27090681ef6aed10de6f986e51b9eac152600000000000000000000000000000000000000000000000000000000000001e800000000000000000000000099a9b7c1116f9ceeb1652de04d5969cce509b069',
    to: Contracts.MINTER_DA_EXP_SETTLEMENT_V3,
    value: '190000000000000000',
  },
  params: {
    chainId: Chains.ETHEREUM,
    contractAddress: Contracts.MINTER_DA_EXP_SETTLEMENT_V3,
    tokenId: 488,
    recipient: '0x8B97F27090681EF6aEd10de6F986E51B9eaC1526',
  },
}

// https://etherscan.io/tx/0xf3af8296d43e81e452ccae605978d9550409113b78f9ae448a2fa6ef6ef3a307
export const INCOMPATIBLE_CONTRACT_PURCHASE: TestParams<MintActionParams> = {
  transaction: {
    chainId: Chains.ETHEREUM,
    from: '0x457ee5f723c7606c12a7264b52e285906f91eea6',
    hash: '0xf3af8296d43e81e452ccae605978d9550409113b78f9ae448a2fa6ef6ef3a307',
    input:
      '0xefef39a10000000000000000000000000000000000000000000000000000000000000171',
    to: '0x0bbb93c5d118d1dee49e96bcadc161403f4f8612',
    value: '0',
  },
  params: {
    chainId: Chains.ETHEREUM,
    contractAddress: '0x0bbb93c5d118d1dee49e96bcadc161403f4f8612',
  },
}

export const ARBITRUM_PURCHASE_TRANSACTION: TestParams<MintActionParams> = {
  transaction: {
    from: '0x5fe5f06e3471a1af24f9e8a1e866e16205d5df1a',
    hash: '0x085e59f8523be5da763dc44e9b7a13b4200dae9b846cbba559e4a1c033238287',
    input:
      '0xae77c2370000000000000000000000000000000000000000000000000000000000000001000000000000000000000000d1d1222f6d3e4f64db1c025ecd0b314db8449ac4',
    to: Contracts.ARBITRUM_MINTER_SET_PRICE_V5,
    value: '2673000000000000',
    chainId: Chains.ARBITRUM,
  },
  params: {
    chainId: Chains.ARBITRUM,
    contractAddress: Contracts.ARBITRUM_MINTER_SET_PRICE_V5,
    tokenId: 1,
    recipient: '0x5fe5f06e3471a1af24f9e8a1e866e16205d5df1a',
  },
}

const chainTxnMap = {
  mainnet: {
    purchase: PURCHASE_TRANSACTION,
    purchaseTo: PURCHASE_TO_TRANSACTION,
  },
  Arbitrum: {
    purchase: ARBITRUM_PURCHASE_TRANSACTION,
    // Unable to locate purchaseTo test txn
  },
}

const validTxnCases: TestCase<MintActionParams>[] = []
const invalidTxnCases: TestCase<MintActionParams>[] = []

Object.entries(chainTxnMap).forEach(([chain, txnMap]) => {
  Object.entries(txnMap).forEach(([chainFn, testTxn]) => {
    validTxnCases.push(
      createTestCase(testTxn, `when minting via "${chainFn}" on ${chain}`, {
        tokenId: undefined,
        recipient: undefined,
      }),
    )

    validTxnCases.push(
      createTestCase(
        testTxn,
        `when minting via "${chainFn}" with tokenId on ${chain}`,
        {
          recipient: undefined,
        },
      ),
    )

    validTxnCases.push(
      createTestCase(
        testTxn,
        `when minting via "${chainFn}" with recipient on ${chain}`,
        {
          tokenId: undefined,
        },
      ),
    )

    invalidTxnCases.push(
      createTestCase(
        testTxn,
        `when minting via "${chainFn}" when tokenId doesn\'t match on ${chain}`,
        {
          tokenId: -1,
        },
      ),
    )

    invalidTxnCases.push(
      createTestCase(
        testTxn,
        `when minting via "${chainFn}" when recipient doesn\'t match on ${chain}`,
        {
          recipient: NULL_ADDRESS,
        },
      ),
    )
  })
})

invalidTxnCases.push(
  createTestCase(
    INCOMPATIBLE_CONTRACT_PURCHASE,
    'when handling mint using V3 incompatible minter',
  ),
)

export const validTransactionTestCases = validTxnCases
export const invalidTransactionCases = invalidTxnCases
