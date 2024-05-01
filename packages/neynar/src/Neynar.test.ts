import { describe, it, expect, beforeEach, vi, MockedFunction } from 'vitest'
import { validateFollow, translateAddressToFID } from './Neynar'
import axios from 'axios'
import { type FollowersResponse, type Follower } from './types'

const MockedFollowerSchema: Follower = {
  fid: 1,
  username: 'actor',
  display_name: 'Actor',
  custody_address: 'actor_address',
  pfp_url: 'http://example.com/pfp.jpg',
  profile: {
    follower_count: 100,
    following_count: 100,
    verifications: ['Verification 1', 'Verification 2'],
    verified_addresses: {},
    active_status: 'active',
    power_badge: true,
  },
}

const MockedFollowersResponse: FollowersResponse = {
  users: [
    {
      ...MockedFollowerSchema,
    },
  ],
  next: { cursor: null },
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

  it('should return true if the actor is a follower of the target', async () => {
    (axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
      status: 200,
      data: MockedFollowersResponse,
    })

    const result = await validateFollow(
      { target: 'target_fid' },
      { actor: 'actor_address' },
    )
    expect(result).toBe(true)
  })

  it('should return false if the actor is not a follower of the target', async () => {
    (axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
      status: 200,
      data: {},
    })

    const result = await validateFollow(
      { target: 'target_fid' },
      { actor: 'actor_address' },
    )
    expect(result).toBe(false)
  })

  it('should handle pagination correctly', async () => {
    const firstReponse = {
      users: [
        {
          ...MockedFollowerSchema,
          custody_address: 'not_custody_address',
        },
      ],
      next: { cursor: 100 },
    };
    
    (axios.get as MockedFunction<typeof axios.get>)
      .mockResolvedValueOnce({
        status: 200,
        data: firstReponse,
      })
      .mockResolvedValueOnce({
        status: 200,
        data: MockedFollowersResponse,
      })

    const result = await validateFollow(
      { target: 'target_fid' },
      { actor: 'actor_address' },
    )
    expect(result).toBe(true)
    expect(axios.get).toHaveBeenCalledTimes(2) // Ensure pagination was handled correctly
  })

  it('should return false on API failure', async () => {
    (axios.get as MockedFunction<typeof axios.get>).mockRejectedValue(
      new Error('API failure'),
    )

    const result = await validateFollow(
      { target: 'target_fid' },
      { actor: 'actor_address' },
    )
    expect(result).toBe(false)
  })

  it('should return true if the actor is a follower of the target and the actor is an address', async () => {
    (axios.get as MockedFunction<typeof axios.get>)
      .mockResolvedValueOnce({
        status: 200,
        data: MockedFollowersResponse,
      })
      .mockResolvedValueOnce({
        status: 200,
        data: {
          data: {
            users: [{ custody_address: 'custody_address' }],
            next: { cursor: null },
          },
        },
      })

    const result = await validateFollow(
      { target: 'target_fid' },
      { actor: 'valid_address' },
    )
    expect(result).toBe(true)
  })
})

describe('translateAddressToFID function', () => {
  it('should return the custody address if the input is a valid address', async () => {
    (axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
      status: 200,
      data: [
        {
          custody_address: 'custody_address',
        },
      ],
    })

    const result = await translateAddressToFID('valid_address')
    expect(result).toBe('custody_address')
  })

  it('should return null if the input is not a valid address', async () => {
    const result = await translateAddressToFID('invalid_address')
    expect(result).toBe(null)
  })

  it('should return null if the API response does not contain a custody address', async () => {
    (axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
      status: 200,
      data: [{}],
    })

    const result = await translateAddressToFID('valid_address')
    expect(result).toBe(null)
  })
})
