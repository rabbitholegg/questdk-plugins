import { type MintActionParams } from '@rabbitholegg/questdk'
import {
  type TestParams,
  createTestCase,
} from '@rabbitholegg/questdk-plugin-utils'
import { Chains, Contracts } from './const'

// https://etherscan.io/tx/0x99cb792e3f9f82768df82a8b89061ff32121f9d22a3f13fd527fbab604a5c500
const MINTER_DA_EXP_SETTLEMENT_V3_PURCHASE: TestParams<MintActionParams> = {
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
  },
}

export const validPurchaseTxn = createTestCase(
  MINTER_DA_EXP_SETTLEMENT_V3_PURCHASE,
  'when minting via "purchase"',
)

export const invalidPurchaseTxnWrongProjectId = createTestCase(
  MINTER_DA_EXP_SETTLEMENT_V3_PURCHASE,
  'when minting via "purchase" with mismatching tokenId',
  { tokenId: 491 },
)
