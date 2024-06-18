import { validateCollect } from './Lens'
import { describe, expect, test} from 'vitest'

describe('Given the lens plugin', () => {
  describe('When handling the collect action', () => {

    test('return true if actor has collected a specific post', async () => {
      const hasCollected = await validateCollect(
        { identifier: '0x020b69-0x01' },
        { actor: '0x8cD578c6637fEEEA0Ced78B2f804c53215AEa9F3' },
      )
      expect(hasCollected).toBe(true)
    })

    test('return false if actor has not collected a specific post', async () => {
      const hasCollected = await validateCollect(
        { identifier: '0x2fb0-0x69-DA-3096022f' },
        { actor: '0xA99F898530dF1514A566f1a6562D62809e99557D' },
      )
      expect(hasCollected).toBe(false)
    })
  })
})
