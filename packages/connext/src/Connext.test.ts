import { getDeployedMultisendContract } from '@connext/nxtp-txservice'
import { MultisendAbi } from '@connext/nxtp-utils'
import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { bridge } from './Connext.js'
import { XCALL_ABI_FRAGMENTS } from './abi.js'

describe('Connext', () => {
  const ETH = '0x0000000000000000000000000000000000000000'
  const OP_WETH = '0x4200000000000000000000000000000000000006'

  describe('Bridge', () => {
    const USDC = '0x7F5c764cBc14f9669B88837ca1490cCa17c31607'

    test('should return a valid bridge action filter', async () => {
      const filter = await bridge({
        sourceChainId: 10,
        destinationChainId: 137,
        tokenAddress: USDC,
        amount: GreaterThanOrEqual(100000n),
      })

      expect(filter).to.deep.equal({
        chainId: '0xa',
        to: '0x8f7492DE823025b4CfaAB1D34c58963F2af5DEDA',
        input: {
          $abi: XCALL_ABI_FRAGMENTS,
          _destination: 1886350457,
          _asset: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
          _amount: {
            $gte: '100000',
          },
        },
      })
    })
  })

  test('should use the WETH wrapper multisend contract when bridging ETH', async () => {
    const filter = await bridge({
      sourceChainId: 10,
      destinationChainId: 137,
      tokenAddress: ETH,
      amount: GreaterThanOrEqual(100000n),
    })

    const multiSendContract = getDeployedMultisendContract(10)

    expect(filter).to.deep.equal({
      chainId: '0xa',
      to: multiSendContract?.address,
      value: {
        $gte: '100000',
      },
      input: {
        $abi: MultisendAbi,
        transactions: {
          $regex: OP_WETH.slice(2),
        },
      },
    })
  })

  describe('Apply filter', () => {
    test('transaction should pass filter', async () => {
      const transaction = {
        blockHash:
          '0x80ca121924779dc65f575409be05e7c2cbaf718858e6e20d66d130cf1acec4f3',
        blockNumber: '0x6606396',
        from: '0xd59a74e615c9d55422ed8c5ce64cb50fda0bb58d',
        gas: '0x73766',
        gasPrice: '0xc9',
        maxFeePerGas: '0x17a',
        maxPriorityFeePerGas: '0x71',
        hash: '0x22d3715ca5ae0bd0d87f9341fafc7a330fd6962e13bf318a6a541c93e4e6bc04',
        input:
          '0x93f18ac50000000000000000000000000000000000000000000000000000000000676e6f000000000000000000000000642c27a96dffb6f21443a89b789a3194ff8399fa000000000000000000000000da10009cbd5d07dd0cecc66161fc93d7c9000da1000000000000000000000000d59a74e615c9d55422ed8c5ce64cb50fda0bb58d000000000000000000000000000000000000000000000000204d764a78eac238000000000000000000000000000000000000000000000000000000000000012c000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000050b91c62117dc0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000d59a74e615c9d55422ed8c5ce64cb50fda0bb58d',
        nonce: '0x3',
        to: '0x8f7492de823025b4cfaab1d34c58963f2af5deda',
        transactionIndex: '0x3',
        value: '0x0',
        type: '0x2',
        accessList: [],
        chainId: '0xa',
        v: '0x0',
        r: '0x4fcc9247c0b29a50b9db146191e93fbd503be520998f62c9445aa2eeb944d613',
        s: '0x78e1ace158ae1166687db900743fc7db36cc80e42a43a800577895c5cb2b95b3',
      }

      const filter = await bridge({
        sourceChainId: 10,
        destinationChainId: 100, // xDAI Chain
        tokenAddress: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
        amount: GreaterThanOrEqual(2000000000000000000n),
      })

      expect(apply(transaction, filter)).to.be.true
    })

    test('ETH bridge should pass filter', async () => {
      const transaction = {
        blockHash:
          '0xfdb722e4a99e3422490bc12d15fafab54ebb7e2e83ff08e9fe20d70045e94889',
        blockNumber: '0x67812f1',
        from: '0xa4c8bb4658bc44bac430699c8b7b13dab28e0f4e',
        gas: '0x8820a',
        gasPrice: '0x1167',
        maxFeePerGas: '0x11e2',
        maxPriorityFeePerGas: '0x112d',
        hash: '0xb8e2c0baf137b64553c91f286bde62cc37275d0b9f9d3e6c0041c6be79de45af',
        input:
          '0x8d80ff0a0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000026b004200000000000000000000000000000000000006000000000000000000000000000000000000000000000000008af8a1fa5fcc180000000000000000000000000000000000000000000000000000000000000004d0e30db000420000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000044095ea7b30000000000000000000000008f7492de823025b4cfaab1d34c58963f2af5deda000000000000000000000000000000000000000000000000008af8a1fa5fcc18008f7492de823025b4cfaab1d34c58963f2af5deda0000000000000000000000000000000000000000000000000026aa1a3465338400000000000000000000000000000000000000000000000000000000000001248aac16ba0000000000000000000000000000000000000000000000000000000000657468000000000000000000000000268682b7d9992ae7e2ca4a8bcc9d9655fb06056f0000000000000000000000004200000000000000000000000000000000000006000000000000000000000000a4c8bb4658bc44bac430699c8b7b13dab28e0f4e000000000000000000000000000000000000000000000000008af8a1fa5fcc18000000000000000000000000000000000000000000000000000000000000012c00000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000a4c8bb4658bc44bac430699c8b7b13dab28e0f4e000000000000000000000000000000000000000000',
        nonce: '0x45',
        to: '0xb0eef3e1de973d045c3858e072c540299585252d',
        transactionIndex: '0x6',
        value: '0xb1a2bc2ec4ff9c',
        type: '0x2',
        accessList: [],
        chainId: '0xa',
        v: '0x1',
        r: '0x11d6fd962cf4090c1464404492a36ef7323c6173908883c87fbc695219e6d026',
        s: '0x739b7240f8dd466881a66971b476f07c2fcce9a6f519d3c06f95133ad983092e',
      }

      const filter = await bridge({
        sourceChainId: 10,
        destinationChainId: 137,
        tokenAddress: ETH,
        amount: GreaterThanOrEqual(1000000000000000n),
      })

      expect(apply(transaction, filter)).to.be.true
    })
  })
})
