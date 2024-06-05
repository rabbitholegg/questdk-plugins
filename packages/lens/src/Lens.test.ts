import { describe, expect, test, vi } from 'vitest'
import { validateCollect } from './Lens'

vi.mock('@apollo/client', async () => {
  const actualApollo = await vi.importActual('@apollo/client')
  return {
    ...(actualApollo as object),
    ApolloClient: vi.fn(() => ({
      query: vi.fn().mockImplementation(({ variables }) => {
        if (variables.request.on === '0x5dbb-0xd5') {
          return Promise.resolve({
            data: {
              whoActedOnPublication: {
                items: [
                  {
                    ownedBy: {
                      address:
                        '0xA99F898530dF1514A566f1a6562D62809e99557D'.toLowerCase(),
                    },
                  },
                ],
                pageInfo: { next: null },
              },
            },
          })
        } else {
          return Promise.resolve({
            data: {
              whoActedOnPublication: {
                items: [],
                pageInfo: { next: null },
              },
            },
          })
        }
      }),
      InMemoryCache: vi.fn(),
    })),
  }
})

describe('Given the lens plugin', () => {
  describe('When handling the collect action', () => {
    test('return true if actor has collected a specific post', async () => {
      const hasCollected = await validateCollect(
        { postId: '0x5dbb-0xd5' },
        { actor: '0xA99F898530dF1514A566f1a6562D62809e99557D' },
      )
      expect(hasCollected).toBe(true)
    })

    test('return false if actor has not collected a specific post', async () => {
      const hasCollected = await validateCollect(
        { postId: '0x2fb0-0x69-DA-3096022f' },
        { actor: '0xA99F898530dF1514A566f1a6562D62809e99557D' },
      )
      expect(hasCollected).toBe(false)
    })
  })
})
