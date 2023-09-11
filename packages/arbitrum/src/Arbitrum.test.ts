import { bridge } from './Arbitrum.js'
import {GATEWAY_OUTBOUND_TRANSFER_FRAG} from './abi.js'
import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { ETH_CHAIN_ID, ARB_ONE_CHAIN_ID } from './chain-ids'
import { MAINNET_TO_ARB_ONE_GATEWAY } from './contract-addresses'
import { parseEther } from 'viem'

// Replace *project* with the name of the project
describe('Given the arbitrum plugin', () => {
  describe('When handling the bridge', () => {
    const DAI = '0x6b175474e89094c44da98b954eedeac495271d0f'
    const recipient = '0x8f7492DE823025b4CfaAB1D34c58963F2af5DEDA'

    test('should return a valid action filter', async () => {
      const filter = await bridge({
        sourceChainId: ETH_CHAIN_ID,
        destinationChainId: ARB_ONE_CHAIN_ID,
        tokenAddress: DAI,
        recipient: recipient,
        amount: GreaterThanOrEqual(100000n),
      })
      expect(filter).to.deep.equal({
        chainId: ETH_CHAIN_ID,
        to: MAINNET_TO_ARB_ONE_GATEWAY,
        input: {
          $abi: GATEWAY_OUTBOUND_TRANSFER_FRAG,
          _token: DAI,
          _to: recipient,
          _amount: {
            $gte: '100000',
          },
        },
      })
      
    })

    test('should pass filter with valid transactions',  async () => {
      const recipient = '0xf9ce182b0fbe597773ab9bb5159b7479047de8fe'

      const transaction = {
        hash: '0xcdbcb66c6a194ae2f0a58b00c1e6ec0daea08c901590ba056cc6806581bf5a94',
        type: '0x2',
        blockHash: '0x0cee2a6dc4e4031eefc6bd2368f35abd4fc1807469e7d6b176f1aad8c8cd0f8c',
        blockNumber: '0x112579F',
        transactionIndex: '0x32',
        from: '0xF9Ce182b0FBe597773AB9BB5159B7479047de8fe',
        gas: '0x73766',
        gasPrice: '0x069b348152',
        maxPriorityFeePerGas: '0x0133851a',
        maxFeePerGas: '0x07a02e5814',
        to: '0x72Ce9c846789fdB6fC1f34aC4AD25Dd9ef7031ef',
        value: '0x0282d936eced40',
        nonce: "0x41A",
        input: '0xd2ce7d65000000000000000000000000514910771af9ca656af840dff83e8264ecf986ca000000000000000000000000f9ce182b0fbe597773ab9bb5159b7479047de8fe0000000000000000000000000000000000000000000000803216cf6e916f980000000000000000000000000000000000000000000000000000000000000177ee0000000000000000000000000000000000000000000000000000000011e1a30000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000268971162634000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000',
        r: '0x39934954b9ff5b45e95f38f9388faa4c08c2c365ea1172284a1e450e402b193b',
        s: '0x0b6f23e0b3ffb31bbab4a6abb23bcb3c8f2cf8e13f88da6b9fc08476c919585b',
        v: '0x1',
        accessList: [], 
        chainId: '0x1',
      }

      const filter = await bridge({
        sourceChainId: ETH_CHAIN_ID,
        destinationChainId: ARB_ONE_CHAIN_ID, 
        tokenAddress: '0x514910771AF9Ca656af840dff83E8264EcF986CA',  // LINK
        amount: GreaterThanOrEqual(parseEther('2000')),
        recipient: recipient,
      })

      expect(apply(transaction, filter)).to.be.true
    })
    
    test('should not pass filter with invalid amount',  async () => {
      const recipient = '0xf9ce182b0fbe597773ab9bb5159b7479047de8fe'

      const transaction = {
        hash: '0xcdbcb66c6a194ae2f0a58b00c1e6ec0daea08c901590ba056cc6806581bf5a94',
        type: '0x2',
        blockHash: '0x0cee2a6dc4e4031eefc6bd2368f35abd4fc1807469e7d6b176f1aad8c8cd0f8c',
        blockNumber: '0x112579F',
        transactionIndex: '0x32',
        from: '0xF9Ce182b0FBe597773AB9BB5159B7479047de8fe',
        gas: '0x73766',
        gasPrice: '0x069b348152',
        maxPriorityFeePerGas: '0x0133851a',
        maxFeePerGas: '0x07a02e5814',
        to: '0x72Ce9c846789fdB6fC1f34aC4AD25Dd9ef7031ef',
        value: '0x0282d936eced40',
        nonce: "0x41A",
        input: '0xd2ce7d65000000000000000000000000514910771af9ca656af840dff83e8264ecf986ca000000000000000000000000f9ce182b0fbe597773ab9bb5159b7479047de8fe0000000000000000000000000000000000000000000000803216cf6e916f980000000000000000000000000000000000000000000000000000000000000177ee0000000000000000000000000000000000000000000000000000000011e1a30000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000268971162634000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000',
        r: '0x39934954b9ff5b45e95f38f9388faa4c08c2c365ea1172284a1e450e402b193b',
        s: '0x0b6f23e0b3ffb31bbab4a6abb23bcb3c8f2cf8e13f88da6b9fc08476c919585b',
        v: '0x1',
        accessList: [], 
        chainId: '0x1',
      }

      const filter = await bridge({
        sourceChainId: ETH_CHAIN_ID,
        destinationChainId: ARB_ONE_CHAIN_ID, 
        tokenAddress: '0x514910771AF9Ca656af840dff83E8264EcF986CA',  // LINK
        amount: GreaterThanOrEqual(parseEther('5000')), // 5000 LINK
        recipient: recipient,
      })

      expect(apply(transaction, filter)).to.be.false
    })
    
    test('should not pass filter with invalid token',  async () => {
      const recipient = '0xf9ce182b0fbe597773ab9bb5159b7479047de8fe'

      const transaction = {
        hash: '0xcdbcb66c6a194ae2f0a58b00c1e6ec0daea08c901590ba056cc6806581bf5a94',
        type: '0x2',
        blockHash: '0x0cee2a6dc4e4031eefc6bd2368f35abd4fc1807469e7d6b176f1aad8c8cd0f8c',
        blockNumber: '0x112579F',
        transactionIndex: '0x32',
        from: '0xF9Ce182b0FBe597773AB9BB5159B7479047de8fe',
        gas: '0x73766',
        gasPrice: '0x069b348152',
        maxPriorityFeePerGas: '0x0133851a',
        maxFeePerGas: '0x07a02e5814',
        to: '0x72Ce9c846789fdB6fC1f34aC4AD25Dd9ef7031ef',
        value: '0x0282d936eced40',
        nonce: "0x41A",
        input: '0xd2ce7d65000000000000000000000000514910771af9ca656af840dff83e8264ecf986ca000000000000000000000000f9ce182b0fbe597773ab9bb5159b7479047de8fe0000000000000000000000000000000000000000000000803216cf6e916f980000000000000000000000000000000000000000000000000000000000000177ee0000000000000000000000000000000000000000000000000000000011e1a30000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000268971162634000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000',
        r: '0x39934954b9ff5b45e95f38f9388faa4c08c2c365ea1172284a1e450e402b193b',
        s: '0x0b6f23e0b3ffb31bbab4a6abb23bcb3c8f2cf8e13f88da6b9fc08476c919585b',
        v: '0x1',
        accessList: [], 
        chainId: '0x1',
      }

      const filter = await bridge({
        sourceChainId: ETH_CHAIN_ID,
        destinationChainId: ARB_ONE_CHAIN_ID, 
        tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',  // DAI
        amount: GreaterThanOrEqual(parseEther('2000')),
        recipient: recipient,
      })

      expect(apply(transaction, filter)).to.be.false
    })
    test('should not pass filter with invalid recipient',  async () => {
      const recipient = '0x72Ce9c846789fdB6fC1f34aC4AD25Dd9ef7031ef'

      const transaction = {
        hash: '0xcdbcb66c6a194ae2f0a58b00c1e6ec0daea08c901590ba056cc6806581bf5a94',
        type: '0x2',
        blockHash: '0x0cee2a6dc4e4031eefc6bd2368f35abd4fc1807469e7d6b176f1aad8c8cd0f8c',
        blockNumber: '0x112579F',
        transactionIndex: '0x32',
        from: '0xF9Ce182b0FBe597773AB9BB5159B7479047de8fe',
        gas: '0x73766',
        gasPrice: '0x069b348152',
        maxPriorityFeePerGas: '0x0133851a',
        maxFeePerGas: '0x07a02e5814',
        to: '0x72Ce9c846789fdB6fC1f34aC4AD25Dd9ef7031ef',
        value: '0x0282d936eced40',
        nonce: "0x41A",
        input: '0xd2ce7d65000000000000000000000000514910771af9ca656af840dff83e8264ecf986ca000000000000000000000000f9ce182b0fbe597773ab9bb5159b7479047de8fe0000000000000000000000000000000000000000000000803216cf6e916f980000000000000000000000000000000000000000000000000000000000000177ee0000000000000000000000000000000000000000000000000000000011e1a30000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000268971162634000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000',
        r: '0x39934954b9ff5b45e95f38f9388faa4c08c2c365ea1172284a1e450e402b193b',
        s: '0x0b6f23e0b3ffb31bbab4a6abb23bcb3c8f2cf8e13f88da6b9fc08476c919585b',
        v: '0x1',
        accessList: [], 
        chainId: '0x1',
      }

      const filter = await bridge({
        sourceChainId: ETH_CHAIN_ID,
        destinationChainId: ARB_ONE_CHAIN_ID, 
        tokenAddress: '0x514910771AF9Ca656af840dff83E8264EcF986CA',  // LINK
        amount: GreaterThanOrEqual(parseEther('2000')),
        recipient: recipient,
      })

      expect(apply(transaction, filter)).to.be.false
    })

  })
})
