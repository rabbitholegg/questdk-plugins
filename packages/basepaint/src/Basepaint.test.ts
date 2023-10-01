import { GreaterThanOrEqual, apply } from '@rabbitholegg/questdk/filter'
import { describe, expect, test } from 'vitest'
import { mint } from './Basepaint'
import { MINT_TRANSACTION } from './test-transactions'
import { CONTRACT_ADDRESS, MINT_ABI } from './constants'

// Replace *project* with the name of the project
describe('Given the basepaint plugin', () => {
  describe('When handling the mint filter', () => {

    test('should return a valid action filter', async () => {
      const filter = await mint({
         address: '0xba5e05cb26b78eda3a2f8e3b3814726305dcac83',
         tokenId: 69,
         quantity: GreaterThanOrEqual(1)
      })
      expect(filter).to.deep.equal({
         to: CONTRACT_ADDRESS,
         chainId: 8453,
         input: {
           $abi: MINT_ABI,
           day: 69,
           count: {
            $gte: "1"
           }
         },
       })
    })

    test('should pass filter with valid transactions',  async () => {
      const transaction = {
         blockHash: '0x5a41dfc5d26e20be65a7db73455e0ac617bdf864c76e1561586aeca98e7fd608',
         blockNumber: '4662683',
         chainId: 8453,
         from: '0xa337d056a88fb7f0053d49a620757e7ee1e2f213',
         gas: '102543',
         gasPrice: '101000000',
         hash: '0x356192c66fe49e9889215c5a47077b9b302c7d3a431fd463932788d9ea545fab',
         input: '0x1b2ef1ca000000000000000000000000000000000000000000000000000000000000003400000000000000000000000000000000000000000000000000000000000000010021fb3f',
         nonce: 29,
         r: '0xd5c2e549935167e2c75abcfad1b870dcb2489f3ba8ad6c80ef1dbe2406a3e68e',
         s: '0x1f9f5fe4d1adb56fd308d045059961a72ce04fa57c5898e175797d01f05f2394',
         to: '0xba5e05cb26b78eda3a2f8e3b3814726305dcac83',
         transactionIndex: 427,
         type: 'legacy',
         v: '16942',
         value: '2600000000000000',
         typeHex: '0x0'
       }
      const filter = await mint({
         address: '0xba5e05cb26b78eda3a2f8e3b3814726305dcac83',
         tokenId: 52,
         quantity: GreaterThanOrEqual(1)
      })
      expect(apply(transaction, filter)).to.be.true
    })
  })
})
