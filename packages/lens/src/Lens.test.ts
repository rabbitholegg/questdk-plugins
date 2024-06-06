import { validateCollect, validateRecast } from './Lens'
import { client } from './graphql'
import { MockedFunction, beforeEach, describe, expect, test, vi } from 'vitest'

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
      // eslint-disable-next-line
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
      // eslint-disable-next-line
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

  describe('When handling the repost action', () => {
    beforeEach(() => {
      vi.resetAllMocks()
    })
    test('return true if actor has reposted a specific post', async () => {
      // use mock
      // eslint-disable-next-line
      ;(
        client.query as MockedFunction<typeof client.query>
      ).mockResolvedValueOnce({
        data: {
          profiles: {
            __typename: 'PaginatedProfileResult',
            items: [
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
      const hasRepost = await validateRecast(
        { identifier: '0x015f34-0x1ce3' },
        { actor: '0xA99F898530dF1514A566f1a6562D62809e99557D' },
      )
      expect(hasRepost).toBe(true)
    })

    test('return true if actor has quote reposted a specific post', async () => {
      // use mock
      // eslint-disable-next-line
      ;(
        client.query as MockedFunction<typeof client.query>
      ).mockResolvedValueOnce({
        data: {
          profiles: {
            __typename: 'PaginatedProfileResult',
            items: [
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
      const hasRepost = await validateRecast(
        { identifier: '0xa68c-0x0712' },
        { actor: '0xA99F898530dF1514A566f1a6562D62809e99557D' },
      )
      expect(hasRepost).toBe(true)
    })

    test('return false if actor has not reposted a specific post', async () => {
      // use mock
      // eslint-disable-next-line
      ;(
        client.query as MockedFunction<typeof client.query>
      ).mockResolvedValueOnce({
        data: {
          profiles: {
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
      const hasRepost = await validateRecast(
        { identifier: '0x01bc6f-0x04b7' },
        { actor: '0xA99F898530dF1514A566f1a6562D62809e99557D' },
      )
      expect(hasRepost).toBe(false)
    })
  })
})
