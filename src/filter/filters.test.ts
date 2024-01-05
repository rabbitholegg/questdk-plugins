import {
  apply,
  handleAnd,
  handleBitmask,
  handleGreaterThanOrEqual,
  handleOr,
  handleRegex,
  handleSome,
} from './filters.js'
import type { Filter, FilterObject } from './types.js'
import { assertType, describe, expect, test } from 'vitest'

describe('parser', () => {
  describe('$and', () => {
    test('should return false when all conditions are not met', () => {
      const filter = [{ value: '0xa' }, { value: '0xb' }]
      const context = { value: '0xa' }
      const result = handleAnd(context, filter)
      assertType<boolean>(result)
      expect(result).to.be.false
    })
    test('should return true when all conditions are met', () => {
      const filter: Filter = [{ a: '0xa' }, { b: '0xb' }]
      const context = { a: '0xa', b: '0xb' }
      const result = handleAnd(context, filter)
      assertType<boolean>(result)
      expect(result).to.be.true
    })
  })

  describe('$or', () => {
    test('should return true when at least one condition is met', () => {
      const filter = [{ value: '0xa' }, { value: '0xb' }]
      const context = { value: '0xa' }
      const result = handleOr(context, filter)
      assertType<boolean>(result)
      expect(result).to.be.true
    })
  })

  describe('$some', () => {
    test('should return true when at least one item in the array meets the condition', () => {
      const filter: FilterObject = { value: '0xa' }
      const context = [{ value: '0xa' }, { value: '0xb' }]
      const result = handleSome(context, filter)
      assertType<boolean>(result)
      expect(result).to.be.true
    })
  })

  describe('$gte', () => {
    test('should return true when context is greater than or equal to filter', () => {
      const filter = '0xa'
      const context = '0xb'
      const result = handleGreaterThanOrEqual(context, filter)
      assertType<boolean>(result)
      expect(result).to.be.true
    })
  })

  describe('$regex', () => {
    test('should return true when the regular expression matches the context', () => {
      const filter = '^0x[a-f0-9]*$'
      const context = '0xabcd'
      const result = handleRegex(context, filter)
      assertType<boolean>(result)
      expect(result).to.be.true
    })
  })

  describe('handleBitmask', () => {
    test('applies the bitmask and compares the result to the provided value', () => {
      const context = 0b1100;
      const filter = { bitmask: 0b1100, value: 0b0100 };
      expect(handleBitmask(context, filter)).toBe(true);
    });
  
    test('returns false when the masked context does not equal the provided value', () => {
      const context = 0b1100;
      const filter = { bitmask: 0b1100, value: 0b1000 };
      expect(handleBitmask(context, filter)).toBe(false);
    });
  
    test('correctly handles large numbers', () => {
      const context = BigInt('0x123456789abcdef0123456789abcdef0123456789abcdef');
      const filter = { bitmask: '0xffffffffffffffffffffffffffffffffffffffff', value: '0x123456789abcdef0123456789abcdef0123456789abcdef' };
      expect(handleBitmask(context, filter)).toBe(true);
    });
  
    test('correctly handles string inputs', () => {
      const context = '0b1100';
      const filter = { bitmask: '0b1100', value: '0b0100' };
      expect(handleBitmask(context, filter)).toBe(true);
    });

    test('should correctly filter the given transaction', () => {
      const transaction = {
        blockHash: '0x2ed328c196cd31a299f51b8e7dc4dffef98184a37c0d8a1f40165f3fd9c668de',
        blockNumber: '0x65715bb',
        from: '0x4e187a21d8c49a175ee6ee9f2c2f3222f43d350e',
        gas: '0x43707',
        gasPrice: '0x777',
        maxFeePerGas: '0x795',
        maxPriorityFeePerGas: '0x735',
        hash: '0xf175c933840e63013fbf77c7bab63d44f692003f5e07596e2dab8fedda55f8d3',
        input: '0xdf33dc1600018000000000000000000000000000000000000000000000000000000000000007f48928cec5cad1efeda632570843000000000000000000000000000000640000341940b709e8a6f6a2c930980000000341940b709e8a6f6a2c9309800000',
        nonce: '0xa8',
        to: '0xc4abade3a15064f9e3596943c699032748b13352',
        transactionIndex: '0x4',
        value: '0x0',
        type: '0x2',
        accessList: [],
        chainId: '0xa',
        v: '0x0',
        r: '0x1e1b9faa0b562914b5b4f58e2f4dc67115d8f036227a855bc6c5ec2c0be237f5',
        s: '0x6d4c35b77da3a0d934f2e186944820498d12546ae57f014927b2497ae367b6fe',
      }
    
      const filter = {
        chainId: '0xa',
        to: '0xc4abade3a15064f9e3596943c699032748b13352',
        input: {
          $bitmask: {
            bitmask: '0xffffffffffffffffffffffffffffffffffffffff',
            value: '0xdf33dc1600018000000000000000000000000000000000000000000000000000000000000007f48928cec5cad1efeda632570843000000000000000000000000000000640000341940b709e8a6f6a2c930980000000341940b709e8a6f6a2c9309800000'
          }
        },
      }
    
      expect(apply(transaction, filter)).to.be.true
    });
  });

  describe('handleAbstractAbiDecode', () => {
    test('should return true when the ABI is found and applies', () => {
      const transaction = {
        blockHash:
          '0x2ed328c196cd31a299f51b8e7dc4dffef98184a37c0d8a1f40165f3fd9c668de',
        blockNumber: '0x65715bb',
        from: '0xac049e3e594af0f5293be1393b053ab68bea4142',
        gas: '0x43707',
        gasPrice: '0x777',
        maxFeePerGas: '0x795',
        maxPriorityFeePerGas: '0x735',
        hash: '0x0cb83425ae1907fbfc27963c8b690dc7b435c7ed32d43a95f8e143628f6eb8e9',
        input:
          '0x3593564c000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000064a20643000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000008b587691a67824756000000000000000000000000000000000000000000000000000000000514379200000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000429e1028f5f1d5ede59748ffcee5532509976840e0000bb842000000000000000000000000000000000000060001f47f5c764cbc14f9669b88837ca1490cca17c31607000000000000000000000000000000000000000000000000000000000000',
        nonce: '0xa8',
        to: '0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad',
        transactionIndex: '0x4',
        value: '0x0',
        type: '0x2',
        accessList: [],
        chainId: '0xa',
        v: '0x0',
        r: '0x1e1b9faa0b562914b5b4f58e2f4dc67115d8f036227a855bc6c5ec2c0be237f5',
        s: '0x6d4c35b77da3a0d934f2e186944820498d12546ae57f014927b2497ae367b6fe',
      }

      const filter = {
        input: {
          $abiAbstract: [
            {
              inputs: [
                { internalType: 'bytes', name: 'commands', type: 'bytes' },
                { internalType: 'bytes[]', name: 'inputs', type: 'bytes[]' },
                { internalType: 'uint256', name: 'deadline', type: 'uint256' },
              ],
              name: 'execute',
              outputs: [],
              stateMutability: 'payable',
              type: 'function',
            },
          ],
          sighash: '0x3593564c',
          commands: '0x00',
          inputs: {
            $some: {
              $abiParams: [
                'address recipient',
                'uint256 amountIn',
                'uint256 amountOut',
                'bytes path',
                'bool payerIsUser',
              ],
              amountOut: {
                $gte: '0x4c4b400',
              },
              path: {
                $and: [
                  {
                    $regex: '^0x9e1028f5f1d5ede59748ffcee5532509976840e0',
                  },
                  {
                    $regex: '.*7f5c764cbc14f9669b88837ca1490cca17c31607$',
                  },
                ],
              },
            },
          },
        },
      }
      expect(apply(transaction, filter)).to.be.true
    })
  })

  describe('apply', () => {
    test('should correctly filter the given transaction', () => {
      const transaction = {
        blockHash:
          '0x2ed328c196cd31a299f51b8e7dc4dffef98184a37c0d8a1f40165f3fd9c668de',
        blockNumber: '0x65715bb',
        from: '0xac049e3e594af0f5293be1393b053ab68bea4142',
        gas: '0x43707',
        gasPrice: '0x777',
        maxFeePerGas: '0x795',
        maxPriorityFeePerGas: '0x735',
        hash: '0x0cb83425ae1907fbfc27963c8b690dc7b435c7ed32d43a95f8e143628f6eb8e9',
        input:
          '0x3593564c000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000064a20643000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000008b587691a67824756000000000000000000000000000000000000000000000000000000000514379200000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000429e1028f5f1d5ede59748ffcee5532509976840e0000bb842000000000000000000000000000000000000060001f47f5c764cbc14f9669b88837ca1490cca17c31607000000000000000000000000000000000000000000000000000000000000',
        nonce: '0xa8',
        to: '0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad',
        transactionIndex: '0x4',
        value: '0x0',
        type: '0x2',
        accessList: [],
        chainId: '0xa',
        v: '0x0',
        r: '0x1e1b9faa0b562914b5b4f58e2f4dc67115d8f036227a855bc6c5ec2c0be237f5',
        s: '0x6d4c35b77da3a0d934f2e186944820498d12546ae57f014927b2497ae367b6fe',
      }

      const filter = {
        chainId: '0xa',
        to: '0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad',
        input: {
          $abi: [
            {
              inputs: [
                { internalType: 'bytes', name: 'commands', type: 'bytes' },
                { internalType: 'bytes[]', name: 'inputs', type: 'bytes[]' },
                { internalType: 'uint256', name: 'deadline', type: 'uint256' },
              ],
              name: 'execute',
              outputs: [],
              stateMutability: 'payable',
              type: 'function',
            },
          ],
          sighash: '0x3593564c',
          commands: '0x00',
          inputs: {
            $some: {
              $abiParams: [
                'address recipient',
                'uint256 amountIn',
                'uint256 amountOut',
                'bytes path',
                'bool payerIsUser',
              ],
              amountOut: {
                $gte: '0x4c4b400',
              },
              path: {
                $and: [
                  {
                    $regex: '^0x9e1028f5f1d5ede59748ffcee5532509976840e0',
                  },
                  {
                    $regex: '.*7f5c764cbc14f9669b88837ca1490cca17c31607$',
                  },
                ],
              },
            },
          },
        },
      }

      expect(apply(transaction, filter)).to.be.true
    })
  })
})
