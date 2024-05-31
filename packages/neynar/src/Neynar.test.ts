import axios from 'axios'
import { beforeEach, describe, expect, it, MockedFunction, vi } from 'vitest'
import { translateAddressToFID, validateFollow, validateRecast } from './Neynar'
import {
  type User,
  ChannelsResponse,
  ConversationResponse,
  UserSearch,
} from './types'

const MockedUserSchema: User = {
  object: 'user',
  fid: 1,
  username: 'actor',
  viewer_context: {
    following: true,
  },
}

const MockedUserSearchSchema: UserSearch = {
  result: {
    users: [MockedUserSchema],
  },
}

const MockedConversationResponseSchema: ConversationResponse = {
  conversation: {
    cast: {
      reactions: {
        recasts: [],
      },
      viewer_context: {
        liked: false,
        recasted: true,
      },
    },
  },
}

const MockedConversationHasntRecastResponseSchema: ConversationResponse = {
  conversation: {
    cast: {
      reactions: {
        recasts: [],
      },
      viewer_context: {
        liked: false,
        recasted: false,
      },
    },
  },
}

vi.mock('axios', () => {
  return {
    default: {
      post: vi.fn(),
      get: vi.fn(),
      delete: vi.fn(),
      put: vi.fn(),
      create: vi.fn().mockReturnThis(),
      interceptors: {
        request: {
          use: vi.fn(),
          eject: vi.fn(),
        },
        response: {
          use: vi.fn(),
          eject: vi.fn(),
        },
      },
    },
  }
})
describe('validateFollow function', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should return true if the actor is a follower of the target user', async () => {
    (axios.get as MockedFunction<typeof axios.get>)
      .mockResolvedValueOnce({
        status: 200,
        data: MockedUserSearchSchema,
      })
      .mockResolvedValueOnce({
        status: 200,
        data: { channels: [] },
      })

    const result = await validateFollow(
      { target: 'target_fid', type: 'user' },
      { actor: '1' },
    )
    expect(result).toBe(true)
  })

  it('should return true if the actor is a follower of the target channel', async () => {
    (axios.get as MockedFunction<typeof axios.get>)
      .mockResolvedValueOnce({
        status: 200,
        data: {
          channels: [{ id: '', name: '', viewer_context: { following: true } }],
        } as ChannelsResponse,
      })

    const result = await validateFollow(
      { target: 'target_fid', type: 'channel' },
      { actor: '1' },
    )
    expect(result).toBe(true)
  })

  it('should return false if the actor is not a follower of the target', async () => {
    (axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
      status: 200,
      data: {},
    })

    const result = await validateFollow(
      { target: '3', type: 'user' },
      { actor: '0xd7053a3e7f8c02a6939377e2ca32bcc2a23023a1' },
    )
    expect(result).toBe(false)
  })

  it('should return false on API failure', async () => {
    (axios.get as MockedFunction<typeof axios.get>).mockRejectedValue(
      new Error('API failure'),
    )

    const result = await validateFollow(
      { target: 'target_fid', type: 'user' },
      { actor: 'actor_address' },
    )
    expect(result).toBe(false)
  })
})

describe('validateRecast function', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should return true if the actor has recast the target', async () => {
    (axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
      status: 200,
      data: MockedConversationResponseSchema,
    })

    const result = await validateRecast(
      { identifier: '0x9288c1e862aa72bd69d0e383a28b9a76b63cbdb4' },
      { actor: '17848' },
    )
    expect(result).toBe(true)
  })

  it('should return false if the actor has not recast the target', async () => {
    (axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
      status: 200,
      data: MockedConversationHasntRecastResponseSchema,
    })

    const result = await validateRecast(
      { identifier: '0x9288c1e862aa72bd69d0e383a28b9a76b63cbdb4' },
      { actor: '999999999999' },
    )
    expect(result).toBe(false)
  })

  it('should return false on API failure', async () => {
    (axios.get as MockedFunction<typeof axios.get>).mockRejectedValue(
      new Error('API failure'),
    )

    const result = await validateRecast(
      { identifier: '0x9288c1e862aa72bd69d0e383a28b9a76b63cbdb4' },
      { actor: '999999999999' },
    )
    expect(result).toBe(false)
  })
})

describe('translateAddressToFID function', () => {
  it('should return the custody address if the input is a valid address', async () => {
    (axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
      status: 200,
      data: {
        '0xB2f784dCC11a696D8f54dC1692fEb2b660959A6A': [
          {
            fid: 1,
          },
        ],
      },
    })

    const result = await translateAddressToFID(
      '0xB2f784dCC11a696D8f54dC1692fEb2b660959A6A',
    )
    expect(result).toBe(1)
  })

  it('should return null if the input is not a valid address', async () => {
    const result = await translateAddressToFID('junk_address')
    expect(result).toBe(null)
  })

  it('should return null if the API response does not contain a custody address', async () => {
    (axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
      status: 200,
      data: [{}],
    })

    const result = await translateAddressToFID(
      '0xB2f784dCC11a696D8f54dC1692fEb2b660959A6A',
    )
    expect(result).toBe(null)
  })
})
