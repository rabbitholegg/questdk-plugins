import { GreaterThanOrEqual } from '@rabbitholegg/questdk/filter'
import { bridge } from './Connext.js'
import { describe, expect, test } from 'vitest'

describe('Connext', () => {
  describe('Bridge', () => {
    const USDC = '0x7F5c764cBc14f9669B88837ca1490cCa17c31607';

    test('should return a valid bridge action filter', async () => {
      // sourceChainId: number;
      // destinationChainId?: number | undefined;
      // contractAddress?: `0x${string}` | undefined;
      // tokenAddress?: `0x${string}` | undefined;
      // amount?: bigint | undefined;
      // amountOperator: AmountOperator;
      // recipient?: `0x${string}` | undefined;

      const filter = await bridge({
        sourceChainId: 10,
        destinationChainId: 137,
        tokenAddress: USDC,
        amount: GreaterThanOrEqual(100000n),
      });

      console.log('bridge', JSON.stringify(filter, null, 2));

      // expect(swap).to.deep.equal({
      //   chainId: '0x0a',
      //   to: '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD',
      //   input: {
      //     $interface: EXECUTE_ABI_FRAGMENTS,
      //     inputs: {
      //       $some: {
      //         $or: [
      //           {
      //             $decoder: V3_SWAP_EXACT_TYPES,
      //             path: {
      //               $and: [
      //                 {
      //                   $regex: 'C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2$',
      //                 },
      //               ],
      //             },
      //             amountOut: {
      //               $gte: '10000',
      //             },
      //           },
      //           {
      //             $decoder: V2_SWAP_EXACT_TYPES,
      //             path: {
      //               $and: [
      //                 {
      //                   $last: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      //                 },
      //               ],
      //             },
      //             amountOut: {
      //               $gte: '10000',
      //             },
      //           },
      //         ],
      //       },
      //     },
      //   },
      // });
    });
  });
});
