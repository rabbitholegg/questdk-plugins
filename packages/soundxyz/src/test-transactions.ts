import { GreaterThanOrEqual, type MintActionParams } from '@rabbitholegg/questdk'
import { Chains, createTestCase, type TestParams } from './utils'

const OP_SUPERMINTER: TestParams<MintActionParams> = {
  transaction: {
    chainId: 10,
    from: '0x6fdab5224d98f396eca460838a2ef1a219767bb7',
    to: '0x0000000000cf4558c36229ac0026ee16d3ae35cd',
    hash: '0x29635c012e7b62b918281ac6745b00055e5edc0c2a23d24589192f814a2341e0',
    input:
      '0x4a04a1c9000000000000000000000000000000000000000000000000000000000000002000000000000000000000000077570069ef75035b9d0a433c1627f7372b08939e000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000006fdab5224d98f396eca460838a2ef1a219767bb70000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ffffffff0000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000026000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    value: '777000000000000',
  },
  params: {
    chainId: Chains.OPTIMISM,
    contractAddress: '0x77570069ef75035b9d0a433c1627f7372b08939e',
    recipient: '0x6fdab5224d98f396eca460838a2ef1a219767bb7',
    amount: GreaterThanOrEqual(1),
  },
}

export const OP_SUPERMINTER_V2: TestParams<MintActionParams> = {
  transaction: {
    chainId: 10,
    from: '0xe8b8679c248307a37a2bd35dd43d2278ba346138',
    to: '0x000000000001a36777f9930aaeff623771b13e70',
    hash: '0x8700a2cd751f28f98ae62e0bceba075bc2be9353000569dadd1ff117b8575907',
    input:
      '0x4a04a1c900000000000000000000000000000000000000000000000000000000000000200000000000000000000000006112f85c9a804b3aeebb71a82040461d55b4e0e300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e8b8679c248307a37a2bd35dd43d2278ba3461380000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ffffffff0000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000026000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    value: '777000000000000',
  },
  params: {
    chainId: Chains.OPTIMISM,
    contractAddress: '0x6112f85c9a804b3aeebb71a82040461d55b4e0e3',
    recipient: '0xe8b8679c248307a37a2bd35dd43d2278ba346138',
    amount: GreaterThanOrEqual(1),
  },
}

export const passingTestCases = [
  createTestCase(OP_SUPERMINTER, 'when mint uses superminter v1 contract'),
  createTestCase(OP_SUPERMINTER_V2, 'when mint uses superminter v2 contract'),
]

export const failingTestCases = [
  createTestCase(OP_SUPERMINTER, 'when chainId is incorrect', {
    chainId: Chains.ARBITRUM_ONE,
  }),
  createTestCase(OP_SUPERMINTER_V2, 'when contractAddress is not correct', {
    contractAddress: '0x6806411765Af15Bddd26f8f544A34cC40cb9838B',
  }),
  createTestCase(OP_SUPERMINTER_V2, 'when amount is insufficient', {
    amount: GreaterThanOrEqual(10),
  }),
]
