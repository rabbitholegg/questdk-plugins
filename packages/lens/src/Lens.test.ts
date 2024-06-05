import { client } from './graphql'
import { beforeEach, describe, expect, MockedFunction, test, vi } from 'vitest'
import { validateCollect } from './Lens'

vi.mock('@apollo/client', async () => {
  const actualApollo = await vi.importActual('@apollo/client')
  return {
    ...(actualApollo as object),
    ApolloClient: vi.fn(() => ({
      query: vi.fn(),
      InMemoryCache: vi.fn(),
    })),
  }
})

describe('Given the lens plugin', () => {
  describe('When handling the collect action', () => {
    beforeEach(() => {
      vi.resetAllMocks()
    })
    test('return true if actor has collected a specific post', async () => {
      // use mock
      ;(
        client.query as MockedFunction<typeof client.query>
      ).mockResolvedValueOnce({
        data: {
          whoActedOnPublication: {
            __typename: 'PaginatedProfileResult',
            items: [
              {
                __typename: 'Profile',
                ownedBy: {
                  __typename: 'NetworkAddress',
                  address: '0x53c64e9D4fCCaf0CF539ECFDa391c4783b5Ae335',
                },
              },
              {
                __typename: 'Profile',
                ownedBy: {
                  __typename: 'NetworkAddress',
                  address: '0xA99F898530dF1514A566f1a6562D62809e99557D',
                },
              },
            ],
            pageInfo: {
              __typename: 'PaginatedResultInfo',
              next: null,
            },
          },
        },
        loading: false,
        networkStatus: 7,
      })
      const hasCollected = await validateCollect(
        { postId: '0x5dbb-0xd5' },
        { actor: '0xA99F898530dF1514A566f1a6562D62809e99557D' },
      )
      expect(hasCollected).toBe(true)
    })

    test('return false if actor has not collected a specific post', async () => {
      // use mock
      ;(
        client.query as MockedFunction<typeof client.query>
      ).mockResolvedValueOnce({
        data: {
          whoActedOnPublication: {
            __typename: 'PaginatedProfileResult',
            items: [],
            pageInfo: {
              __typename: 'PaginatedResultInfo',
              next: null,
            },
          },
        },
        loading: false,
        networkStatus: 7,
      })
      const hasCollected = await validateCollect(
        { postId: '0x2fb0-0x69-DA-3096022f' },
        { actor: '0xA99F898530dF1514A566f1a6562D62809e99557D' },
      )
      expect(hasCollected).toBe(false)
    })
  })
})
